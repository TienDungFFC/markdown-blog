import { getAllPosts } from "@/lib/markdown";

export default function Blog() {
  const allPost = getAllPosts("content");
  for (const post of allPost) {
    console.log("content:", post);
  }
  return allPost.map((post, i) => (
    <>
      {post.name}
      <ul key={i} className="ml-4">
        {post.childPost.length > 0 &&
          post.childPost.map((p, idx) => <li key={idx}>{p.name}</li>)}
      </ul>
    </>
  ));
}
