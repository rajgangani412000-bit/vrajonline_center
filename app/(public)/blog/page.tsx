import type { Metadata } from "next";
import Link from "next/link";
import { blogSeed } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Local guides for PAN card, Aadhaar update, Ayushman card, PVC printing, and government form filling in Kosamba.",
  alternates: { canonical: "/blog" }
};

export default function BlogPage() {
  return (
    <section className="section bg-white">
      <div className="container">
        <p className="text-sm font-bold uppercase text-accent">Blog</p>
        <h1 className="mt-2 text-4xl font-black">Service guides and local updates</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {blogSeed.map((post) => (
            <article key={post.slug} className="rounded-lg border bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase text-accent">{post.category}</p>
              <h2 className="mt-2 text-2xl font-black">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
