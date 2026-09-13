import { db } from './index.ts';
import { users, amcInquiries } from './schema.ts';
import { eq, desc } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, name?: string) {
  try {
    const result = await db.insert(users)
      .values({
        uid,
        email,
        name: name || '',
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          ...(name ? { name } : {}),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database query failed in getOrCreateUser:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function createAMCInquiry(data: {
  userId?: number;
  planName: string;
  customerName: string;
  phone: string;
  city?: string;
  systemsCount?: string;
  amount?: string;
  paymentMethod?: string;
  utrNumber?: string;
  status?: string;
}) {
  try {
    const result = await db.insert(amcInquiries)
      .values(data)
      .returning();
    return result[0];
  } catch (error) {
    console.error("Database query failed in createAMCInquiry:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function getAMCInquiries() {
  try {
    return await db.select().from(amcInquiries).orderBy(desc(amcInquiries.createdAt));
  } catch (error) {
    console.error("Database query failed in getAMCInquiries:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}
