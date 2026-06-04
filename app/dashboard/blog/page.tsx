import { createBlogPostAction } from "@/lib/actions/blog-actions";
import { prisma } from "@/lib/prisma";
import { requireOwner } from "@/lib/security/permissions";
import { formatDate } from "@/lib/utils";

const statuses = ["DRAFT", "SCHEDULED", "PUBLISHED"];

export default async function AdminBlogPage() {
  await requireOwner();
  const posts = await prisma.blogPost.findMany({ include: { author: true }, orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black">Blog System</h1>
        <p className="mt-2 text-muted-foreground">Create, schedule, and publish SEO-ready posts.</p>
      </div>
      <section className="rounded-lg border bg-white p-5">
        <h2 className="text-xl font-black">Create post</h2>
        <form action={createBlogPostAction} className="mt-4 grid gap-3">
          <div className="grid gap-3 md:grid-cols-2">
            <input name="title" placeholder="Title" required />
            <input name="slug" placeholder="slug-example" required pattern="[a-z0-9-]+" />
            <input name="category" placeholder="Category" required />
            <input name="tags" placeholder="Tags comma separated" />
            <input name="featuredImage" placeholder="/images/office-work.svg" />
            <select name="status" defaultValue="DRAFT">{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select>
            <input name="scheduledAt" type="datetime-local" />
            <input name="metaTitle" placeholder="Meta title" required />
          </div>
          <input name="metaDescription" placeholder="Meta description" required />
          <textarea name="excerpt" placeholder="Excerpt" required rows={3} />
          <textarea name="content" placeholder="Article content" required rows={8} />
          <button className="focus-ring bg-primary px-4 py-2 font-semibold text-primary-foreground">Save post</button>
        </form>
      </section>
      <div className="table-scroll rounded-lg">
        <table>
          <thead><tr><th>Title</th><th>Status</th><th>Category</th><th>Author</th><th>Published</th></tr></thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.status}</td>
                <td>{post.category}</td>
                <td>{post.author.name}</td>
                <td>{formatDate(post.publishedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
