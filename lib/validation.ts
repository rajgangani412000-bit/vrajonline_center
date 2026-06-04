import { z } from "zod";

const phone = z
  .string()
  .min(10)
  .max(15)
  .regex(/^[0-9+\-\s]+$/, "Enter a valid mobile number.");

export const customerSchema = z.object({
  name: z.string().min(2).max(120),
  mobile: phone,
  address: z.string().min(5).max(300),
  serviceId: z.string().min(1),
  documents: z.string().optional(),
  notes: z.string().max(1000).optional(),
  followUpDate: z.string().optional(),
  status: z.enum(["NEW", "PENDING", "IN_PROCESS", "APPROVED", "DELIVERED", "REJECTED"])
});

export const paymentSchema = z.object({
  customerId: z.string().min(1),
  serviceId: z.string().min(1),
  amount: z.coerce.number().positive(),
  method: z.enum(["CASH", "UPI", "BANK"]),
  paidAt: z.string().min(1),
  notes: z.string().max(500).optional()
});

export const expenseSchema = z.object({
  category: z.enum(["RENT", "ELECTRICITY", "INTERNET", "PVC_MATERIAL", "PRINTING_COST", "SALARY", "MISCELLANEOUS"]),
  amount: z.coerce.number().positive(),
  spentAt: z.string().min(1),
  vendor: z.string().max(160).optional(),
  notes: z.string().max(500).optional()
});

export const pvcSchema = z.object({
  customerId: z.string().min(1),
  cardType: z.string().min(2).max(120),
  quantity: z.coerce.number().int().min(1).max(100),
  status: z.enum(["PRINT_QUEUE", "PRINTED", "DELIVERED"]),
  notes: z.string().max(500).optional()
});

export const reminderSchema = z.object({
  customerId: z.string().optional(),
  type: z.enum(["PENDING_CUSTOMER", "PENDING_PAYMENT", "ADMISSION_DEADLINE", "DOCUMENT_COLLECTION"]),
  title: z.string().min(2).max(160),
  dueAt: z.string().min(1),
  notes: z.string().max(500).optional()
});

export const blogPostSchema = z.object({
  title: z.string().min(4).max(180),
  slug: z.string().min(4).max(220).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(20).max(300),
  content: z.string().min(60),
  category: z.string().min(2).max(80),
  tags: z.string().optional(),
  featuredImage: z.string().url().or(z.string().startsWith("/")).optional(),
  metaTitle: z.string().min(10).max(70),
  metaDescription: z.string().min(30).max(160),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED"]),
  scheduledAt: z.string().optional()
});

export const enquirySchema = z.object({
  name: z.string().min(2).max(120),
  mobile: phone,
  question: z.string().min(5).max(1000),
  service: z.string().max(120).optional()
});
