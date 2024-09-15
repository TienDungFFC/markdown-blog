import { Avatar } from "../Avatar";
import { getAllPosts } from "@/lib/markdown";
export default function Sidebar({ children }: { children: React.ReactNode }) {
  const posts = getAllPosts();
  console.log("posts: ", posts[0].childPost);
  return (
    <>
      <aside className="hidden fixed top-0 bottom-0 left-0 z-20 w-16 bg-gradient-to-b from-gray-100 to-white transition-all duration-300 lg:sticky lg:w-80 lg:shrink-0 lg:flex lg:flex-col lg:justify-end lg:items-end 2xl:max-w-[30rem] 2xl:w-full dark:from-dark-800 dark:to-dark-700">
        <div className="relative max-h-screen overflow-auto flex-1 flex flex-col xl:w-80">
          <div className="flex items-center py-8 px-4 lg:px-8 xl:px-16">
            <Avatar />
          </div>
          <div className="px-4 pb-10 lg:px-8 xl:px-16">
            <nav className="hidden lg:block lg:mt-4">
              {posts.map((post, idx) => (
                <>
                  <h2 key={idx}>{post.name}</h2>
                  {post.childPost && <ul></ul>}
                  {post.childPost.map((cPost, i) => (
                    <li key={i}>{cPost.name}</li>
                  ))}
                </>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
