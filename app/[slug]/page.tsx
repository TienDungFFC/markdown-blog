import { getAllSlugs, getDetailPost } from "@/lib/markdown";
import { Metadata } from "next";
import path from "path";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = params;

  const filePath = process.cwd() + "/content/";
  const postData = await getDetailPost(slug, filePath);

  return {
    title: postData.title ?? "Post",
  };
}

interface Params {
  slug: string;
}
export default async function PostPage({ params }: { params: Params }) {
  const { slug } = params;
  const filePath = process.cwd() + "/content/";
  const post = await getDetailPost(slug, filePath);
  if (!post) {
    return null;
  }
  return (
    <section
      className="max-w-screen-lg px-8 lg:px-24 py-4 lg:py-8 2xl:px-32"
      id="docs_main"
    >
      <h1>{post.title}</h1>
      <div
        className="main-content"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      ></div>
    </section>
  );
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "content/");

  const slugs = await getAllSlugs(filePath);

  return slugs.map((slug: string) => ({
    slug,
  }));
}
