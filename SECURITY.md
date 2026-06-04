# Security Review

Implemented controls:

- Hidden admin entry path at `/secure-admin-login`
- Protected dashboard layout and middleware guard
- JWT session strategy through Auth.js
- Bcrypt password hashing
- Forced default password change
- Owner and Staff role boundaries
- Owner-only financial data, deletes, user management, reports, and settings
- Server-side input validation with Zod
- Prisma ORM query parameterization for SQL injection protection
- Security headers from `next.config.ts`
- Chat rate limiting
- Audit logs for sensitive actions
- Admin routes excluded from robots indexing

Operational requirements:

- Replace the seeded password immediately.
- Set a strong `NEXTAUTH_SECRET`.
- Use HTTPS-only production URLs.
- Keep database credentials out of source control.
- Review audit logs regularly.
- Limit production database access by IP or provider controls when available.
