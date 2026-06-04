import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { auth } from "@/auth";

export async function requireUser() {
  const session = await auth();
  if (!session?.user) redirect("/secure-admin-login");
  return session.user;
}

export async function requireOwner() {
  const user = await requireUser();
  if (user.role !== Role.OWNER) {
    redirect("/dashboard");
  }
  return user;
}

export function canViewFinancials(role: Role) {
  return role === Role.OWNER;
}

export function canDeleteRecords(role: Role) {
  return role === Role.OWNER;
}
