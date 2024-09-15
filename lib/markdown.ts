//@ts-nocheck
import MarkdownIt from "markdown-it";
import Shikiji from "markdown-it-shikiji";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import MarkdownItAbbr from "markdown-it-abbr";
// import MarkdownItContainer from "markdown-it-container";
import MarkdownItDeflist from "markdown-it-deflist";
// import MarkdownItEmoji from "markdown-it-emoji";
import MarkdownItFootnote from "markdown-it-footnote";
// import MarkdownItCodeGroup from "markdown-it-code-group";
import MarkdownItIns from "markdown-it-ins";
import MarkdownItMark from "markdown-it-mark";
// import MarkdownItTable from "markdown-it-multimd-table";
import markdownItShikiji from "@shikijs/markdown-it";
import mila from "markdown-it-link-attributes";
import theme from "./theme.json";
import { rendererRich, transformerTwoslash } from "@shikijs/twoslash";
import { codeToHtml } from "shiki";
import {
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  transformerNotationDiff,
  transformerRenderWhitespace,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import readingTime from "reading-time";
import { stringToSlug } from "./utils";
import { cwd } from "process";
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

export function getAllPosts(folder: string = "content") {
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
const mdDocs = new MarkdownIt({
  html: true,
  linkify: true,
  xhtmlOut: true,
});
// mdDocs.use(MarkdownItEmoji);
mdDocs.use(MarkdownItAbbr);
mdDocs.use(MarkdownItDeflist);
mdDocs.use(MarkdownItFootnote);
mdDocs.use(MarkdownItIns);
mdDocs.use(MarkdownItMark);

mdDocs.use(mila, {
  attrs: {
    target: "_blank",
    rel: "noopener",
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderMarkdownInline(this: any, md: string, context?: string): any[] {
  if (context === "tag:param") {
    md = md.replace(/^([\w$-]+)/, "`$1` ");
  }

  const children = renderMarkdown.call(this, md);
  if (
    children.length === 1 &&
    children[0].type === "element" &&
    children[0].tagName === "p"
  ) {
    return children[0].children;
  }
  return children;
}

export async function getDetailPost(slug: string, dir: string) {
  const file = path.join(dir, `${slug}.md`);
  const fileContents = fs.readFileSync(file, "utf8");

  mdDocs.use(
    await Shikiji({
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
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
