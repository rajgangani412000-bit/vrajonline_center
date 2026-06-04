import { changePasswordAction } from "@/lib/actions/auth-actions";

export default function ChangePasswordPage() {
  return (
    <section className="mx-auto max-w-xl rounded-lg border bg-white p-6">
      <p className="text-sm font-bold uppercase text-accent">Required</p>
      <h1 className="mt-2 text-3xl font-black">Change default password</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        The default owner password must be replaced before using the admin panel.
      </p>
      <form action={changePasswordAction} className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold">
          New password
          <input name="password" type="password" required minLength={12} autoComplete="new-password" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Confirm password
          <input name="confirmPassword" type="password" required minLength={12} autoComplete="new-password" />
        </label>
        <button className="focus-ring bg-primary px-5 py-3 font-semibold text-primary-foreground">
          Update password
        </button>
      </form>
    </section>
  );
}
