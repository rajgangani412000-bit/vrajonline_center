"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/security/permissions";
import { writeAuditLog } from "@/lib/actions/audit";

export async function loginAction(formData: FormData) {
  await signIn("credentials", {
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
    redirectTo: "/dashboard"
  });
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

export async function changePasswordAction(formData: FormData) {
  const user = await requireUser();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (password.length < 12) {
    throw new Error("Password must be at least 12 characters.");
  }
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await bcrypt.hash(password, 12),
      forcePasswordChange: false
    }
  });
  await writeAuditLog({
    actorId: user.id,
    action: "PASSWORD_CHANGED",
    entity: "User",
    entityId: user.id
  });
  revalidatePath("/dashboard");
  await signOut({ redirectTo: "/secure-admin-login" });
}
