"use server";

import { ApplicationStep, CustomerStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { customerSchema } from "@/lib/validation";
import { requireOwner, requireUser } from "@/lib/security/permissions";
import { writeAuditLog } from "@/lib/actions/audit";

function listFromText(value?: string) {
  return (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function nextCode(prefix: string, model: "customer" | "serviceApplication") {
  let count =
    model === "customer"
      ? await prisma.customer.count()
      : await prisma.serviceApplication.count();
  for (;;) {
    count += 1;
    const code = `${prefix}-${String(count).padStart(4, "0")}`;
    const existing =
      model === "customer"
        ? await prisma.customer.findUnique({ where: { customerCode: code }, select: { id: true } })
        : await prisma.serviceApplication.findUnique({ where: { applicationNo: code }, select: { id: true } });
    if (!existing) return code;
  }
}

export async function createCustomerAction(formData: FormData) {
  const user = await requireUser();
  const parsed = customerSchema.parse({
    name: formData.get("name"),
    mobile: formData.get("mobile"),
    address: formData.get("address"),
    serviceId: formData.get("serviceId"),
    documents: formData.get("documents"),
    notes: formData.get("notes"),
    followUpDate: formData.get("followUpDate"),
    status: formData.get("status") || "NEW"
  });

  const customer = await prisma.customer.create({
    data: {
      customerCode: await nextCode("VOC", "customer"),
      name: parsed.name,
      mobile: parsed.mobile,
      address: parsed.address,
      serviceId: parsed.serviceId,
      documents: listFromText(parsed.documents),
      notes: parsed.notes,
      followUpDate: parsed.followUpDate ? new Date(parsed.followUpDate) : null,
      status: parsed.status as CustomerStatus,
      createdById: user.id,
      applications: {
        create: {
          applicationNo: await nextCode("APP", "serviceApplication"),
          serviceId: parsed.serviceId,
          status: parsed.status as CustomerStatus,
          currentStep: ApplicationStep.SUBMITTED,
          timeline: {
            create: {
              step: ApplicationStep.SUBMITTED,
              note: "Application created in CRM."
            }
          }
        }
      }
    }
  });

  await writeAuditLog({
    actorId: user.id,
    action: "CUSTOMER_CREATED",
    entity: "Customer",
    entityId: customer.id
  });
  revalidatePath("/dashboard/customers");
  revalidatePath("/dashboard");
}

export async function updateCustomerStatusAction(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "PENDING") as CustomerStatus;

  const customer = await prisma.customer.update({
    where: { id },
    data: { status }
  });

  await prisma.serviceApplication.updateMany({
    where: { customerId: id },
    data: { status }
  });

  await writeAuditLog({
    actorId: user.id,
    action: "CUSTOMER_STATUS_UPDATED",
    entity: "Customer",
    entityId: customer.id,
    metadata: { status }
  });
  revalidatePath("/dashboard/customers");
  revalidatePath("/dashboard");
}

export async function deleteCustomerAction(formData: FormData) {
  const user = await requireOwner();
  const id = String(formData.get("id") || "");
  await prisma.customer.delete({ where: { id } });
  await writeAuditLog({
    actorId: user.id,
    action: "CUSTOMER_DELETED",
    entity: "Customer",
    entityId: id
  });
  revalidatePath("/dashboard/customers");
}
