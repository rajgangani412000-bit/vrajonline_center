"use server";

import { BlogStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { blogPostSchema } from "@/lib/validation";
import { requireOwner } from "@/lib/security/permissions";
import { writeAuditLog } from "@/lib/actions/audit";

function tagsFromText(value?: string) {
  return (value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export async function createBlogPostAction(formData: FormData) {
  const user = await requireOwner();
  const featuredImage = formData.get("featuredImage");

  const parsed = blogPostSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    category: formData.get("category"),
    tags: formData.get("tags"),
    featuredImage: featuredImage ? String(featuredImage) : undefined,
    metaTitle: formData.get("metaTitle"),
    metaDescription: formData.get("metaDescription"),
    status: formData.get("status"),
    scheduledAt: formData.get("scheduledAt")
  });

  const post = await prisma.blogPost.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      excerpt: parsed.excerpt,
      content: parsed.content,
      category: parsed.category,
      tags: tagsFromText(parsed.tags),
      featuredImage: parsed.featuredImage || null,
      metaTitle: parsed.metaTitle,
      metaDescription: parsed.metaDescription,
      status: parsed.status as BlogStatus,
      scheduledAt: parsed.scheduledAt ? new Date(parsed.scheduledAt) : null,
      publishedAt: parsed.status === "PUBLISHED" ? new Date() : null,
      authorId: user.id
    }
  });

  await writeAuditLog({
    actorId: user.id,
    action: "BLOG_POST_CREATED",
    entity: "BlogPost",
    entityId: post.id
  });
  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
}
