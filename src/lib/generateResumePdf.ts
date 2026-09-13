import { jsPDF } from "jspdf";

export function generateResumePdf(): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  // --- Page 1 ---
  // Header Banner Background
  doc.setFillColor(15, 23, 42); // slate-900 / dark sophisticated navy
  doc.rect(0, 0, pageWidth, 48, "F");

  // Accent line
  doc.setFillColor(124, 58, 237); // violet-600
  doc.rect(0, 48, pageWidth, 1.5, "F");

  // Name & Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("SUNDARAM KUMAR", margin, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(196, 181, 253); // violet-300
  doc.text("| Software & Data Science", margin, 25);

  // Contact Info
  doc.setFontSize(8);
  doc.setTextColor(226, 232, 240); // slate-200
  doc.text("Phone: +91 7061523829   |   Email: sundaramprincekumar@gmail.com", margin, 31.5);
  doc.text("LinkedIn: linkedin.com/in/sundaram-prince-kumar   |   Instagram: @sundaramprincekumar", margin, 36.5);
  doc.text("Website: sundaramprince.weebly.com   |   Location: Bhopal, India", margin, 41.5);

  // Two-column layout settings
  const leftColX = margin;
  const leftColWidth = 110;
  const rightColX = margin + leftColWidth + 6;
  const rightColWidth = pageWidth - rightColX - margin;

  let yLeft = 56;
  let yRight = 56;

  // Helper for section headers
  const drawSectionHeader = (x: number, y: number, width: number, title: string, color: [number, number, number] = [15, 23, 42]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(title.toUpperCase(), x, y);
    doc.setDrawColor(124, 58, 237);
    doc.setLineWidth(0.6);
    doc.line(x, y + 2, x + width, y + 2);
    return y + 7;
  };

  // --- LEFT COLUMN ---
  // 1. Summary
  yLeft = drawSectionHeader(leftColX, yLeft, leftColWidth, "Summary");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const summaryText =
    "Dedicated B.Tech student specializing in Computer Science with a focus on Data Science and Machine Learning at NRI Group of Research & Technology College Bhopal. Passionate about technology, system design, and data-driven insights with strong foundations in software engineering and predictive AI/ML models.";
  const summaryLines = doc.splitTextToSize(summaryText, leftColWidth);
  doc.text(summaryLines, leftColX, yLeft);
  yLeft += summaryLines.length * 4.2 + 6;

  // 2. Experience
  yLeft = drawSectionHeader(leftColX, yLeft, leftColWidth, "Experience");

  // Experience 1: Software Developer
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("Software Developer", leftColX, yLeft);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(109, 40, 217);
  doc.text("2026 – Present", leftColX + leftColWidth, yLeft, { align: "right" });
  yLeft += 4.5;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text("VedTech Service Group (Gurgaon)", leftColX, yLeft);
  yLeft += 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const devBullets = [
    "Engineered robust web services and REST APIs utilizing Python, Django, and FastAPI.",
    "Managed database schemas, indexing, and query optimization using MongoDB and SQL.",
    "Conducted rigorous testing and debugging, improving data retrieval efficiency by 35%."
  ];
  devBullets.forEach((bullet) => {
    const lines = doc.splitTextToSize(`• ${bullet}`, leftColWidth - 2);
    doc.text(lines, leftColX + 2, yLeft);
    yLeft += lines.length * 3.8;
  });
  yLeft += 3;

  // Experience 2: CBSL Group
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("Database Admin", leftColX, yLeft);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(109, 40, 217);
  doc.text("06/2025 – 2026", leftColX + leftColWidth, yLeft, { align: "right" });
  yLeft += 4.5;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text("CBSL Group (Capital Business Systems Pvt. Ltd.)", leftColX, yLeft);
  yLeft += 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const cbslBullets = [
    "Supervised data entry workflows and integrity validation for IT enterprise software datasets.",
    "Oversaw Excel and database management systems, improving data retrieval efficiency and compliance."
  ];
  cbslBullets.forEach((bullet) => {
    const lines = doc.splitTextToSize(`• ${bullet}`, leftColWidth - 2);
    doc.text(lines, leftColX + 2, yLeft);
    yLeft += lines.length * 3.8;
  });
  yLeft += 3;

  // Experience 3: Zidio Development
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("Data Analysis Intern", leftColX, yLeft);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(109, 40, 217);
  doc.text("11/2025 – 02/2026", leftColX + leftColWidth, yLeft, { align: "right" });
  yLeft += 4.5;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text("Zidio Development – Bangalore, India", leftColX, yLeft);
  yLeft += 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const zidioBullets = [
    "Contributed to 3 key data science projects focusing on banking transaction analytics.",
    "Formulated machine learning and descriptive analysis models to support financial decision making."
  ];
  zidioBullets.forEach((bullet) => {
    const lines = doc.splitTextToSize(`• ${bullet}`, leftColWidth - 2);
    doc.text(lines, leftColX + 2, yLeft);
    yLeft += lines.length * 3.8;
  });
  yLeft += 4;

  // 3. Featured Project on Page 1
  yLeft = drawSectionHeader(leftColX, yLeft, leftColWidth, "Featured Project");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text("Stock Market Analysis & Forecasting", leftColX, yLeft);
  yLeft += 4.2;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const proj1Text =
    "Analyzed and predicted stock trends with time series modeling. Built interactive dashboards using Python, Pandas, Plotly, Scikit-learn, Facebook Prophet, and TensorFlow/Keras.";
  const proj1Lines = doc.splitTextToSize(proj1Text, leftColWidth);
  doc.text(proj1Lines, leftColX, yLeft);

  // --- RIGHT COLUMN ---
  // 1. Skills
  yRight = drawSectionHeader(rightColX, yRight, rightColWidth, "Skills");
  const skillsCategories = [
    { title: "Languages", items: "Python, JavaScript, SQL, HTML/CSS, Java" },
    { title: "Data Science & AI", items: "NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, TensorFlow, Prophet, Plotly" },
    { title: "Backend & Systems", items: "Django, FastAPI, REST APIs, MongoDB, SQL" },
    { title: "Tools & Dev", items: "Git, GitHub, VS Code, Streamlit, Jupyter" },
  ];

  skillsCategories.forEach((sc) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(sc.title, rightColX, yRight);
    yRight += 3.8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const lines = doc.splitTextToSize(sc.items, rightColWidth);
    doc.text(lines, rightColX, yRight);
    yRight += lines.length * 3.8 + 2;
  });
  yRight += 2;

  // 2. Strengths
  yRight = drawSectionHeader(rightColX, yRight, rightColWidth, "Strengths");
  const strengths = [
    { name: "Analytical Problem Solving", desc: "Resolved complex hardware/software integration and algorithm bottlenecks." },
    { name: "Proactive Collaboration", desc: "Collaborated across cross-functional engineering teams with clear cohesion." },
    { name: "Technical Documentation", desc: "Documented engineering architectures, pipelines, and APIs with precision." }
  ];

  strengths.forEach((st) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`• ${st.name}`, rightColX, yRight);
    yRight += 3.8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(71, 85, 105);
    const lines = doc.splitTextToSize(st.desc, rightColWidth - 4);
    doc.text(lines, rightColX + 4, yRight);
    yRight += lines.length * 3.6 + 2.5;
  });
  yRight += 2;

  // 3. Education
  yRight = drawSectionHeader(rightColX, yRight, rightColWidth, "Education");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text("Bachelor of Technology (B.Tech)", rightColX, yRight);
  yRight += 4.2;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.2);
  doc.setTextColor(109, 40, 217);
  doc.text("Computer Science & Engineering (Data Science)", rightColX, yRight);
  yRight += 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("NRI Group / RGPV University", rightColX, yRight);
  yRight += 3.8;
  doc.text("2022 – 2027  |  Bhopal, India", rightColX, yRight);
  yRight += 6;

  // 4. Interests
  yRight = drawSectionHeader(rightColX, yRight, rightColWidth, "Interests");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  const intLines = doc.splitTextToSize("Robotics, AIML, Autonomous Systems, and Financial Data Science Modeling.", rightColWidth);
  doc.text(intLines, rightColX, yRight);

  // Footer Page 1
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text("Page 1 of 2  •  Sundaram Kumar Resume  •  Bhopal, India", pageWidth / 2, pageHeight - 8, { align: "center" });

  // --- Page 2: Expanded Projects & Technical Case Studies ---
  doc.addPage("a4", "portrait");

  // Page 2 Header
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 24, "F");
  doc.setFillColor(124, 58, 237);
  doc.rect(0, 24, pageWidth, 1, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text("SUNDARAM KUMAR — PROJECTS & TECHNICAL WORK", margin, 15);

  let yP2 = 35;

  yP2 = drawSectionHeader(margin, yP2, pageWidth - margin * 2, "Technical Projects & Implementations");

  const fullProjects = [
    {
      name: "1. Stock Market Analysis & Forecasting (Zidio Project)",
      meta: "Time Series Modeling | Python, Prophet, TensorFlow/Keras, Scikit-learn, Plotly",
      bullets: [
        "Analyzed multi-year historical stock market trends using statistical and deep learning time series techniques.",
        "Built predictive models using Facebook Prophet and LSTM neural networks for short-term and long-term trend forecasting.",
        "Created an interactive visualization dashboard using Plotly and Streamlit for real-time financial reporting."
      ]
    },
    {
      name: "2. POWERGRID Stock Analysis",
      meta: "Financial Data Analytics | Python, Pandas, Statsmodels, Scikit-learn",
      bullets: [
        "Associated with Zidio Development: evaluated market trends and transmission system sector performance for PowerGrid Corp.",
        "Modeled price fluctuations, moving averages, volatility indicators, and correlation coefficients against market benchmarks.",
        "Delivered analytical reports that enhanced understanding of utility stock risk factors and future outlooks."
      ]
    },
    {
      name: "3. Cryptocurrency Market Year Analysis",
      meta: "Cryptocurrency Volatility & Pattern Discovery | Python, Plotly, Pandas",
      bullets: [
        "Engineered real-time data ingestion pipelines for volatile crypto asset market prices.",
        "Executed outlier detection, seasonal volatility breakdowns, and clustering algorithms to isolate trading volume surges.",
        "Built interactive visual dashboards to translate complex price fluctuations into accessible trader insights."
      ]
    },
    {
      name: "4. Banking Customer Data Analysis",
      meta: "Classification & Customer Segmentation | Python, Seaborn, Matplotlib, Scikit-learn",
      bullets: [
        "Executed exploratory data analysis on substantial banking transaction records to identify spending behaviors.",
        "Built customer segmentation models enabling personalized product recommendations and risk tiering.",
        "Constructed intuitive heatmaps and statistical distributions aiding managerial decision-making."
      ]
    }
  ];

  fullProjects.forEach((proj) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(proj.name, margin, yP2);
    yP2 += 4.5;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(109, 40, 217);
    doc.text(proj.meta, margin, yP2);
    yP2 += 4.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.2);
    doc.setTextColor(51, 65, 85);
    proj.bullets.forEach((b) => {
      const bLines = doc.splitTextToSize(`• ${b}`, pageWidth - margin * 2 - 4);
      doc.text(bLines, margin + 4, yP2);
      yP2 += bLines.length * 3.8;
    });

    yP2 += 5;
  });

  // Additional Certifications & Key Competencies on Page 2
  yP2 = drawSectionHeader(margin, yP2, pageWidth - margin * 2, "Certifications & Core Competencies");

  const certs = [
    "Certified Ethical Hacker (CEH) Fundamentals — Secure Coding & Infrastructure Awareness",
    "Data Science & Machine Learning Specialization — Python, NumPy, Pandas, Scikit-learn",
    "Full-Stack Software Development — Python, Django, FastAPI, REST APIs, MongoDB & SQL"
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  certs.forEach((cert) => {
    doc.text(`✓  ${cert}`, margin + 2, yP2);
    yP2 += 5;
  });

  // Declaration
  yP2 += 8;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("I hereby declare that the details furnished above are true and correct to the best of my knowledge.", margin, yP2);

  yP2 += 6;
  doc.setFont("helvetica", "bold");
  doc.text("Sundaram Kumar", margin, yP2);

  // Footer Page 2
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text("Page 2 of 2  •  Sundaram Kumar Resume  •  sundaramprincekumar@gmail.com", pageWidth / 2, pageHeight - 8, { align: "center" });

  // Save the PDF
  doc.save("Sundaram_Kumar_Resume.pdf");
}
