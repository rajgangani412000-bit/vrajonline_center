"use server";

import { PvcStatus, ReminderType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { pvcSchema, reminderSchema } from "@/lib/validation";
import { requireUser } from "@/lib/security/permissions";
import { writeAuditLog } from "@/lib/actions/audit";

async function nextPvcCode() {
  let count = await prisma.pvcOrder.count();
  for (;;) {
    count += 1;
    const orderNo = `PVC-${String(count).padStart(4, "0")}`;
    const existing = await prisma.pvcOrder.findUnique({ where: { orderNo }, select: { id: true } });
    if (!existing) return orderNo;
  }
}

export async function createPvcOrderAction(formData: FormData) {
  const user = await requireUser();
  const parsed = pvcSchema.parse({
    customerId: formData.get("customerId"),
    cardType: formData.get("cardType"),
    quantity: formData.get("quantity"),
    status: formData.get("status") || "PRINT_QUEUE",
    notes: formData.get("notes")
  });

  const pvcOrder = await prisma.pvcOrder.create({
    data: {
      orderNo: await nextPvcCode(),
      customerId: parsed.customerId,
      cardType: parsed.cardType,
      quantity: parsed.quantity,
      status: parsed.status as PvcStatus,
      notes: parsed.notes,
      printedAt: parsed.status === "PRINTED" ? new Date() : null,
      deliveredAt: parsed.status === "DELIVERED" ? new Date() : null
    }
  });

  await writeAuditLog({
    actorId: user.id,
    action: "PVC_ORDER_CREATED",
    entity: "PvcOrder",
    entityId: pvcOrder.id
  });
  revalidatePath("/dashboard/pvc-cards");
}

export async function updatePvcStatusAction(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "PRINT_QUEUE") as PvcStatus;

  await prisma.pvcOrder.update({
    where: { id },
    data: {
      status,
      printedAt: status === "PRINTED" ? new Date() : undefined,
      deliveredAt: status === "DELIVERED" ? new Date() : undefined
    }
  });

  await writeAuditLog({
    actorId: user.id,
    action: "PVC_STATUS_UPDATED",
    entity: "PvcOrder",
    entityId: id,
    metadata: { status }
  });
  revalidatePath("/dashboard/pvc-cards");
}

export async function createReminderAction(formData: FormData) {
  const user = await requireUser();
  const parsed = reminderSchema.parse({
    customerId: formData.get("customerId") || undefined,
    type: formData.get("type"),
    title: formData.get("title"),
    dueAt: formData.get("dueAt"),
    notes: formData.get("notes")
  });

  const reminder = await prisma.reminder.create({
    data: {
      customerId: parsed.customerId || null,
      type: parsed.type as ReminderType,
      title: parsed.title,
      dueAt: new Date(parsed.dueAt),
      notes: parsed.notes
    }
  });

  await writeAuditLog({
    actorId: user.id,
    action: "REMINDER_CREATED",
    entity: "Reminder",
    entityId: reminder.id
  });
  revalidatePath("/dashboard/reminders");
  revalidatePath("/dashboard");
}

export async function completeReminderAction(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") || "");
  await prisma.reminder.update({
    where: { id },
    data: { isCompleted: true }
  });
  await writeAuditLog({
    actorId: user.id,
    action: "REMINDER_COMPLETED",
    entity: "Reminder",
    entityId: id
  });
  revalidatePath("/dashboard/reminders");
  revalidatePath("/dashboard");
}
