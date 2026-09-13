import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { getOrCreateUser, createAMCInquiry, getAMCInquiries } from "./src/db/users.ts";

let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in server environment.");
    }
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "25mb" }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Sync / Register authenticated user to Cloud SQL
  app.post("/api/users/sync", requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const user = await getOrCreateUser(req.user.uid, req.user.email || "", (req.user as any).name || "");
      res.json({ user });
    } catch (error: any) {
      console.error("Failed to sync user:", error);
      res.status(500).json({ error: error.message || "Failed to sync user" });
    }
  });

  // Submit AMC Inquiry to Cloud SQL
  app.post("/api/amc/inquiry", async (req, res) => {
    try {
      const { planName, customerName, phone, city, systemsCount, amount, paymentMethod, utrNumber, status } = req.body;
      if (!planName || !customerName || !phone) {
        return res.status(400).json({ error: "planName, customerName and phone are required" });
      }
      const inquiry = await createAMCInquiry({
        planName,
        customerName,
        phone,
        city,
        systemsCount,
        amount,
        paymentMethod: paymentMethod || "UPI QR",
        utrNumber,
        status: status || "pending",
      });
      res.json({ success: true, inquiry });
    } catch (error: any) {
      console.error("Failed to save AMC inquiry:", error);
      res.status(500).json({ error: error.message || "Failed to save inquiry" });
    }
  });

  // Fetch inquiries (Protected for authorized employees)
  app.get("/api/amc/inquiries", requireAuth, async (req: AuthRequest, res) => {
    try {
      const inquiries = await getAMCInquiries();
      res.json({ inquiries });
    } catch (error: any) {
      console.error("Failed to fetch AMC inquiries:", error);
      res.status(500).json({ error: error.message || "Failed to fetch inquiries" });
    }
  });

  // Gemini Chatbot Endpoint (Multi-turn chat with conversation history, roles, Search & Maps grounding)
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { messages, groundingMode, modelSpeed, customSystemRole } = req.body;
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "messages array is required" });
      }

      const ai = getGenAI();

      // Model selection based on requirements
      let model = "gemini-3.5-flash";
      if (modelSpeed === "fast") {
        model = "gemini-3.1-flash-lite";
      } else if (modelSpeed === "pro") {
        model = "gemini-3.1-pro-preview";
      }

      // Format messages into Gemini contents structure
      const contents = messages.map((m: { role: string; text: string }) => ({
        role: m.role === "assistant" || m.role === "model" ? "model" : "user",
        parts: [{ text: m.text }],
      }));

      const defaultSystemInstruction =
        "You are the official Senior AI Consultant & IT Engineer for Sundaram Tech Solutions (founded by Sundaram Kumar), based in Bhopal, MP and Bihar. " +
        "You specialize in IT Hardware & Software repair, AMC (Annual Maintenance Contracts) for PCs and institutions, CCTV Surveillance, Cloud Infrastructure, and IT consulting. " +
        "When advising on AMC plans, recommend the Single PC plan (₹3,999/yr), Small Business plan (₹7,999/yr), or Enterprise plan (₹14,999/yr), and explain payments via UPI (Sundaram.1@ptaxis). " +
        "Provide direct, helpful, technically sound, and polite answers with structured formatting.";

      const systemInstruction = customSystemRole || defaultSystemInstruction;

      const config: any = {
        systemInstruction,
      };

      // Add grounding if selected
      if (groundingMode === "search") {
        config.tools = [{ googleSearch: {} }];
      } else if (groundingMode === "maps") {
        config.tools = [{ googleMaps: {} }];
      }

      const response = await ai.models.generateContent({
        model,
        contents,
        config,
      });

      const responseText = response.text || "I apologize, I could not generate a response.";
      const candidate = response.candidates?.[0];
      const groundingMetadata = candidate?.groundingMetadata || null;

      res.json({
        reply: responseText,
        modelUsed: model,
        groundingMetadata,
      });
    } catch (error: any) {
      console.error("Gemini chat error:", error);
      res.status(500).json({
        error: error.message || "Failed to process chat request",
      });
    }
  });

  // Audio Transcription Endpoint using gemini-3.5-transcribe
  app.post("/api/gemini/transcribe", async (req, res) => {
    try {
      const { audioBase64, mimeType } = req.body;
      if (!audioBase64) {
        return res.status(400).json({ error: "audioBase64 is required" });
      }

      const ai = getGenAI();

      const audioPart = {
        inlineData: {
          mimeType: mimeType || "audio/webm",
          data: audioBase64,
        },
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.5-transcribe",
        contents: {
          parts: [
            audioPart,
            { text: "Transcribe this spoken audio verbatim. Output only the transcribed text without commentary." },
          ],
        },
      });

      res.json({
        transcription: response.text?.trim() || "",
      });
    } catch (error: any) {
      console.error("Audio transcription error:", error);
      res.status(500).json({
        error: error.message || "Failed to transcribe audio",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
