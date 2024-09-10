import MarkdownIt from "markdown-it";
import Shikiji from "markdown-it-shikiji";

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
  console.log("getContent");
}
