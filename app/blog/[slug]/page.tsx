import { getAllSlugs, getDetailPost } from "@/lib/markdown";
import { Metadata } from "next";
import path from "path";

export async function generateMetadata(): Promise<Metadata> {
  const filePath = process.cwd() + "/content/blog";
  const postData = await getDetailPost("example", filePath);

  return {
    title: postData.title ?? "Post",
  };
}

interface Params {
  slug: string
}
export default async function PostPage({ params }: { params: Params}) {
  const { slug } = params
  const filePath = process.cwd() + "/content/blog";
  const post = await getDetailPost(slug, filePath);
  if (!post) {
    return null;
  }
  return (
    <section className="max-w-screen-lg px-8 lg:px-24 py-4 lg:py-8" id="docs_main">
      <h1>{post.title}</h1>
      <div className="main-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
    </section>
  );
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "content/blog");
  
  const slugs = await getAllSlugs(filePath);

  return slugs.map((slug: string) => ({
    slug,
  }));
}
