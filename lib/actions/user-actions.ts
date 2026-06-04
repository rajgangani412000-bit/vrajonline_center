"use server";

import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireOwner } from "@/lib/security/permissions";
import { writeAuditLog } from "@/lib/actions/audit";

export async function createUserAction(formData: FormData) {
  const owner = await requireOwner();
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "").toLowerCase();
  const password = String(formData.get("password") || "");
  const role = String(formData.get("role") || "STAFF") as Role;

  if (name.length < 2 || !email.includes("@") || password.length < 12) {
    throw new Error("Enter a valid name, email, and 12 character password.");
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role,
      forcePasswordChange: true
    }
  });

  await writeAuditLog({
    actorId: owner.id,
    action: "USER_CREATED",
    entity: "User",
    entityId: user.id,
    metadata: { role }
  });
  revalidatePath("/dashboard/users");
}
