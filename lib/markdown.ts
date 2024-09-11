import MarkdownIt from "markdown-it";
import Shikiji from "markdown-it-shikiji";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
const md = new MarkdownIt({
  html: true,
  linkify: true,
  xhtmlOut: true,
});

export async function getContentDetail() {
  md.use(
    await Shikiji({
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
    })
  );
}

export function getAllPosts(folder: string) {
  const contentPath = process.cwd() + "/" + folder;
  const folders = fs.readdirSync(contentPath);
  const posts = [];

  for (const fd of folders) {
    const ext = fd.split(".").pop();
    const post = {
      name: "",
      slug: "",
      type: "",
      childPost: [],
    };
    if (!ext || ext != "md") {
      const nameFolder = fd
        .split("-")
        .map((name) => {
          return name[0].toUpperCase() + name.substring(1);
        })
        .join(" ");

      post.name = nameFolder;
      post.type = "folder";
      post.childPost = getAllPosts(folder + "/" + fd);
    } else {
      const file = path.join(contentPath, fd);
      const fileContents = fs.readFileSync(file, "utf8");
      const result = matter(fileContents);
      post.name = result.data.title;
      post.slug = result.data.slug;
      post.type = "file";
    }
    posts.push(post);
  }
  return posts;
}
