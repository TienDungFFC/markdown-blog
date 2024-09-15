import { getDetailPost } from "@/lib/markdown";
import { Metadata } from "next";

// Hàm `generateMetadata` để cung cấp các thẻ meta (SEO) cho trang
export async function generateMetadata(): Promise<Metadata> {
  const filePath = process.cwd() + "/content/blog";
  const postData = await getDetailPost("example", filePath);

  return {
    title: postData.title ?? "Post",
  };
}

// Server component để hiển thị nội dung bài viết
export default async function PostPage() {
  const filePath = process.cwd() + "/content/blog";
  const post = await getDetailPost("example", filePath);
  if (!post) {
    return null;
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
    </div>
  );
}
