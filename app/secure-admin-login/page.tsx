import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { auth } from "@/auth";
import { loginAction } from "@/lib/actions/auth-actions";

export const metadata = {
  title: "Secure Admin Login | Vraj Online Center",
  robots: { index: false, follow: false }
};

export default async function SecureAdminLoginPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-white/10 bg-white p-6 shadow-soft">
        <div className="grid size-12 place-items-center rounded-md bg-primary text-primary-foreground">
          <LockKeyhole className="size-6" aria-hidden />
        </div>
        <h1 className="mt-5 text-2xl font-black">Secure Admin Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">Private access for Vraj Online Center owner and staff.</p>
        <form action={loginAction} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold">
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Password
            <input name="password" type="password" autoComplete="current-password" required minLength={8} />
          </label>
          <button className="focus-ring bg-primary px-5 py-3 font-semibold text-primary-foreground">
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
