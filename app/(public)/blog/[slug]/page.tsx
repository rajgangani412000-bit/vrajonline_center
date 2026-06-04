import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogSeed, business } from "@/lib/seed-data";

export function generateStaticParams() {
  return blogSeed.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogSeed.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${business.baseUrl}/blog/${post.slug}`
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogSeed.find((item) => item.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: business.name },
    publisher: { "@type": "Organization", name: business.name },
    mainEntityOfPage: `${business.baseUrl}/blog/${post.slug}`
  };

  return (
    <article className="section bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="container max-w-3xl">
        <p className="text-sm font-bold uppercase text-accent">{post.category}</p>
        <h1 className="mt-2 text-4xl font-black">{post.title}</h1>
        <p className="mt-5 text-xl leading-8 text-slate-700">{post.excerpt}</p>
        <div className="mt-8 rounded-lg border bg-slate-50 p-6 text-lg leading-8 text-slate-800">
          {post.content}
        </div>
      </div>
    </article>
  );
}
