#! /usr/bin/env node
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import { success, warn, info } from "./utils.mjs";
import { default as parseFrontMatter } from "gray-matter";
import { marked } from "marked";

const ensureDirectoryExists = (path) => {
  if (!existsSync(path)) {
    warn(`Directory "${path}" does not exist, creating.`);
    mkdirSync(path);
  }

  success(`Directory "${path}" found.`);
};

const fileExistsAndIsNotTheSame = (filePath, content) => {
  if (existsSync(filePath) && readFileSync(filePath, "utf8") === content) {
    warn(
      `File "${filePath}" already exists, and no changes were made, skipping.`
    );

    return true;
  }

  return false;
};

const generateHtml = (path, post) => {
  const filePath = resolve(path, post.slug);
  const html = marked(post.frontmatter.content);

  if (fileExistsAndIsNotTheSame(`${filePath}.html`, html)) return;

  info(`Generating "${filePath}.html".`);
  writeFileSync(`${filePath}.html`, html);
};

const generateIndex = (path, posts) => {
  const filePath = resolve(path, "index.html");
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

  <title>Posts</title>
</head>
<body>
  <h1>Posts</h1>
  <ul>
    ${posts
      .map(
        (post) =>
          `<li><a href="/posts/${post.slug}.html">${post.frontmatter.data.title}</a></li>`
      )
      .join("\n")}
  </ul>
</body>
</html>`;

  if (fileExistsAndIsNotTheSame(filePath, html)) return;

  info(`Generating "${filePath}".`);
  writeFileSync(filePath, html);
};

const path = resolve(process.cwd(), "posts");
ensureDirectoryExists(path);

const posts = readdirSync(path)
  .filter((file) => file.endsWith(".md"))
  .map((file) => ({
    slug: file.replace(".md", ""),
    frontmatter: parseFrontMatter(readFileSync(resolve(path, file), "utf8")),
  }));

for (const post of posts) generateHtml(path, post);
success(`Generated ${posts.length}~ posts.`);

generateIndex(path, posts);
success(`Generated index.html.`);
