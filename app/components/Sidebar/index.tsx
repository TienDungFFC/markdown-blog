import { Avatar } from "../Avatar";
import { getAllPosts } from "@/lib/markdown";
import ActiveLink from "../ActiveLink";

export default function Sidebar() {
  const posts = getAllPosts();

  return (
    <>
      <aside className="hidden fixed top-0 bottom-0 left-0 z-20 w-16 bg-gradient-to-b from-gray-200 to-white transition-all duration-300 lg:sticky lg:w-80 lg:shrink-0 lg:flex lg:flex-col lg:justify-end lg:items-end 2xl:max-w-[20rem] 2xl:w-full dark:from-dark-800 dark:to-dark-700 h-[100vh]">
        <div className="relative max-h-screen overflow-auto flex-1 flex flex-col xl:w-80">
          <div className="flex items-center py-8 px-4 lg:px-8 xl:px-16 overflow-hidden rounded-full">
            <Avatar />
          </div>
          <div className="pb-10">
            <nav className="hidden lg:block lg:mt-4">
              {posts.map((post, idx) => (
                <div key={idx}>
                  <h2 className="px-4 text-xl font-bold">{post.title}</h2>
                  {post.childPost && post.childPost.length > 0 && (
                    <ul className="">
                      {post.childPost.map((cPost, i) => (
                        <li
                          key={i}
                          className="list-none hover:bg-gray-300 hover:font-semibold"
                        >
                          <ActiveLink
                            href={`/${cPost.nameFile}`}
                            className="px-8 py-[0.5rem] inline-block w-full"
                          >
                            {cPost.title}
                          </ActiveLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
