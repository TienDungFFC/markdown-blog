"use client";
import { useState } from "react";
import ActiveLink from "../ActiveLink";
import { Post } from "@/lib/markdown";

export default function MobileHeader({ posts }: { posts: Post[] }) {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const toggleNav = () => setNavIsOpen(!navIsOpen);

  return (
    <header className="lg:hidden">
      <div className="relative mx-auto w-full py-10 bg-white transition duration-200 dark:bg-dark-700">
        <div className="mx-auto px-8 sm:px-16 flex items-center justify-between">
          <div className="flex-1 flex items-center justify-end">
            <button
              className="ml-2 relative w-10 h-10 p-2 text-red-600 focus:outline-none"
              aria-label="Menu"
              onClick={toggleNav}
            >
              {!navIsOpen ? (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {navIsOpen && (
          <span className="absolute inset-0 z-20 pointer-events-none shadow-sm"></span>
        )}
      </div>

      {navIsOpen && (
        <div className="absolute w-full transform origin-top shadow-sm z-10">
          <nav className="bg-white dark:bg-dark-600 p-8">
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
                          href={`/${post.nameFile}/${cPost.nameFile}`}
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
            {/* <ul>
              <li>
                <h2>Prologue</h2>
                <ul>
                  <li>
                    <Link href="/docs/11.x/releases">Release Notes</Link>
                  </li>
                  <li>
                    <Link href="/docs/11.x/upgrade">Upgrade Guide</Link>
                  </li>
                  <li>
                    <Link href="/docs/11.x/contributions">
                      Contribution Guide
                    </Link>
                  </li>
                </ul>
              </li>
            </ul> */}
          </nav>
        </div>
      )}
    </header>
  );
}
