import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  name: text('name'),
  role: text('role').default('employee'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const amcInquiries = pgTable('amc_inquiries', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  planName: text('plan_name').notNull(),
  customerName: text('customer_name').notNull(),
  phone: text('phone').notNull(),
  city: text('city'),
  systemsCount: text('systems_count'),
  amount: text('amount'),
  paymentMethod: text('payment_method').default('UPI QR'),
  utrNumber: text('utr_number'),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  inquiries: many(amcInquiries),
}));

export const amcInquiriesRelations = relations(amcInquiries, ({ one }) => ({
  user: one(users, {
    fields: [amcInquiries.userId],
    references: [users.id],
  }),
}));
