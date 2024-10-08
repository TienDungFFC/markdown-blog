// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import MarkdownIt from "markdown-it";
import Shikiji from "markdown-it-shikiji";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import MarkdownItAbbr from "markdown-it-abbr";
import MarkdownItDeflist from "markdown-it-deflist";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItIns from "markdown-it-ins";
import MarkdownItMark from "markdown-it-mark";
import markdownItShikiji from "@shikijs/markdown-it";
import mila from "markdown-it-link-attributes";
import {
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  transformerNotationDiff,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import readingTime from "reading-time";
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

export interface Post {
  title: string;
  nameFile: string;
  type: "file" | "folder";
  childPost: Post[];
}

export function getAllPosts(folder: string = "content"): Post[] {
  const contentPath = path.join(process.cwd(), folder);
  const folders = fs.readdirSync(contentPath);
  const posts: Post[] = [];

  for (const fd of folders) {
    const ext = path.extname(fd);
    const post: Post = {
      title: "",
      nameFile: "",
      type: "",
      childPost: [],
    };

    if (!ext || ext !== ".md") {
      const nameFolder = fd
        .split("-")
        .map((name) => {
          return name[0].toUpperCase() + name.slice(1);
        })
        .join(" ");

      post.title = nameFolder;
      post.type = "folder";
      post.nameFile = fd;
      post.childPost = getAllPosts(path.join(folder, fd));
    } else {
      const file = path.join(contentPath, fd);
      const fileContents = fs.readFileSync(file, "utf8");
      const result = matter(fileContents);

      post.title = result.data.title || "Untitled";
      post.nameFile = fd.replace(/\.md$/, "");
      post.type = "file";
    }

    posts.push(post);
  }

  return posts;
}

md.use(MarkdownItAbbr);
md.use(MarkdownItDeflist);
md.use(MarkdownItFootnote);
md.use(MarkdownItIns);
md.use(MarkdownItMark);

md.use(mila, {
  attrs: {
    target: "_blank",
    rel: "noopener",
  },
});
function findMdFileRecursively(dir: string, slug: string): string | null {
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const result = findMdFileRecursively(fullPath, slug);
      if (result) {
        return result;
      }
    } else if (stat.isFile() && entry === `${slug}.md`) {
      return fullPath;
    }
  }

  return null; 
}

export async function getDetailPost(slug: string, dir: string) {
  const file = findMdFileRecursively(dir, slug);

  if (!file) {
    throw new Error(`File ${slug}.md not found in directory ${dir}`);
  }
  const fileContents = fs.readFileSync(file, "utf8");

  md.use(
    await markdownItShikiji({
      langs: ["javascript", "php", 'yaml', 'bash', 'dockerfile', 'css'],
      themes: {
        light: "dark-plus",
        dark: "dark-plus",
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
        transformerNotationWordHighlight(),
      ],
    })
  );

  const matterResult = matter(fileContents);

  const contentHtml = [md.render(matterResult.content)]
    .join("\n")
    .trim()
    .replaceAll("\r\n", "\n");

  const time = readingTime(matterResult.content);

  return {
    slug,
    contentHtml,
    time,
    ...(matterResult.data as { data: string; title: string }),
  };
}


export async function getAllSlugs(directory: string): Promise<string[]> {
  const getFilesRecursively = (dir: string): string[] => {
    const entries = fs.readdirSync(dir);
    const files: string[] = [];

    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath); 

      if (stat.isDirectory()) {
        files.push(...getFilesRecursively(fullPath));
      } else if (stat.isFile() && path.extname(entry) === ".md") {
        files.push(fullPath);
      }
    });

    return files;
  };

  const mdFiles = getFilesRecursively(directory);

  return mdFiles.map((file) => path.relative(directory, file).replace(/\.md$/, "").split("/").pop());
}
