"use server";

import { ExpenseCategory, PaymentMethod } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { expenseSchema, paymentSchema } from "@/lib/validation";
import { requireOwner } from "@/lib/security/permissions";
import { writeAuditLog } from "@/lib/actions/audit";

export async function createPaymentAction(formData: FormData) {
  const user = await requireOwner();
  const parsed = paymentSchema.parse({
    customerId: formData.get("customerId"),
    serviceId: formData.get("serviceId"),
    amount: formData.get("amount"),
    method: formData.get("method"),
    paidAt: formData.get("paidAt"),
    notes: formData.get("notes")
  });

  const payment = await prisma.payment.create({
    data: {
      customerId: parsed.customerId,
      serviceId: parsed.serviceId,
      amount: parsed.amount,
      method: parsed.method as PaymentMethod,
      paidAt: new Date(parsed.paidAt),
      notes: parsed.notes
    }
  });

  await writeAuditLog({
    actorId: user.id,
    action: "PAYMENT_CREATED",
    entity: "Payment",
    entityId: payment.id
  });
  revalidatePath("/dashboard/income");
  revalidatePath("/dashboard");
}

export async function createExpenseAction(formData: FormData) {
  const user = await requireOwner();
  const parsed = expenseSchema.parse({
    category: formData.get("category"),
    amount: formData.get("amount"),
    spentAt: formData.get("spentAt"),
    vendor: formData.get("vendor"),
    notes: formData.get("notes")
  });

  const expense = await prisma.expense.create({
    data: {
      category: parsed.category as ExpenseCategory,
      amount: parsed.amount,
      spentAt: new Date(parsed.spentAt),
      vendor: parsed.vendor,
      notes: parsed.notes
    }
  });

  await writeAuditLog({
    actorId: user.id,
    action: "EXPENSE_CREATED",
    entity: "Expense",
    entityId: expense.id
  });
  revalidatePath("/dashboard/expenses");
  revalidatePath("/dashboard");
}
