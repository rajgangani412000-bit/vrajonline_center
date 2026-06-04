# Production Setup Guide

## Database

Use PostgreSQL on a managed provider such as Vercel Postgres, Neon, Supabase, or Railway.

Required connection string:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Run:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

For the first launch without migration files, run:

```bash
npm run db:push
npm run db:seed
```

## Vercel

Set these environment variables:

```bash
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
APP_BASE_URL
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
CLOUDINARY_UPLOAD_FOLDER
```

Build command:

```bash
npm run build
```

Install command:

```bash
npm install
```

## Launch Checklist

- Confirm `/` loads public website.
- Confirm no public navigation exposes admin routes.
- Confirm `/secure-admin-login` accepts seeded owner account.
- Confirm forced password change opens before dashboard access.
- Confirm Owner can access finance, users, reports, and settings.
- Confirm Staff cannot access finance, users, reports, or settings.
- Create one customer, payment, expense, PVC order, reminder, enquiry, and blog post.
- Download PDF and CSV reports.
- Check `/sitemap.xml` and `/robots.txt`.
- Run Lighthouse and verify performance, accessibility, SEO, and best practices.
