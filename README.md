# Vraj Online Center

Complete public website and private operating system for Vraj Online Center in Tarsadi, Kosamba, Gujarat.

## Included

- Public business website with local SEO, Open Graph, Twitter cards, schema, sitemap, and robots rules
- Hidden admin login at `/secure-admin-login`
- Protected admin dashboard at `/dashboard`
- Role-based Owner and Staff access
- Customer CRM with search, filter, sort, and export
- Service application tracking with timeline data model
- PVC card print queue
- Income, expense, and profit analytics
- PDF and Excel-compatible CSV reports
- Reminder and follow-up system
- Blog publishing system with SEO fields
- Floating Vraj Online Assistant with enquiry capture
- Prisma PostgreSQL schema and production seed data
- Security headers, password hashing, JWT sessions, rate limiting, validation, and audit logs

## Default Owner

Email: `admin@vrajonlinecenter.in`

Password: `Admin@123456`

The owner is forced to change this password on first login.

## Environment

Copy `.env.example` to `.env` and set:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
NEXTAUTH_SECRET="use-a-long-random-secret"
NEXTAUTH_URL="https://your-production-domain"
APP_BASE_URL="https://www.vrajonlinecenter.in"
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
CLOUDINARY_UPLOAD_FOLDER="vraj-online-center"
```

## Local Setup

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run typecheck
npm run lint
npm run build
```

`npm run qa` runs all three.

## Production Deployment

1. Create a PostgreSQL database.
2. Add all environment variables in Vercel.
3. Deploy the repository to Vercel.
4. Run Prisma migration or `npm run db:push` for the first deployment.
5. Run `npm run db:seed` once to create services and the owner account.
6. Login through `/secure-admin-login` and change the default owner password.

## Security Notes

- Do not expose `/dashboard` links publicly.
- Keep `NEXTAUTH_SECRET` strong and private.
- Use production PostgreSQL with SSL.
- Rotate the default password immediately after seeding.
- Restrict Cloudinary credentials to the production project.
- Review audit logs from `/dashboard/settings`.
