#! /usr/bin/env node
import { default as parseFrontMatter } from 'gray-matter';
import { marked } from 'marked';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { info, success, warn } from './utils.mjs';

const ensureDirectoryExists = (path) => {
	if (!existsSync(path)) {
		warn(`Directory "${path}" does not exist, creating.`);
		mkdirSync(path);
	}

	success(`Directory "${path}" found.`);
};

const fileExistsAndIsNotTheSame = (filePath, content) => {
	if (existsSync(filePath) && readFileSync(filePath, 'utf8') === content) {
		warn(`File "${filePath}" already exists, and no changes were made, skipping.`);

		return true;
	}

	return false;
};

const generateHtml = (path, post) => {
	const filePath = resolve(path, post.slug);
	let html = marked(post.frontmatter.content);

	html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />


  <title>${post.frontmatter.data.title}</title>
  <meta name="description" content="${post.frontmatter.data.description}" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://pinkcig.xyz" />
  <meta property="og:title" content="Faye Keller" />
  <meta property="og:description" content="${post.frontmatter.data.description}" />
  <meta property="og:image" content="/logo.png" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="250" />
  <meta property="og:image:height" content="250" />

  <meta name="theme-color" content="#c4a7e7">
  </head>
<body style="overflow-x: hidden;">
  <nav data-include="sidebar" class="navbar"></nav>

  <div id="app">
    <article class="post card">
      <section class="container">
        <section>
          <h1>${post.frontmatter.data.title}</h1>
          <div>${html}</div>
        </section>
      </section>
    </article>
  </div>

  <script type="module" src="/src/main.ts"></script>
</body>
</html>`;

	if (fileExistsAndIsNotTheSame(`${filePath}.html`, html)) return;

	info(`Generating "${filePath}.html".`);
	writeFileSync(`${filePath}.html`, html);
};

const generateIndex = (path, posts) => {
	const filePath = resolve(path, 'index.html');
	const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" href="favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />


  <title>Faye's Blog Posts</title>
  <meta name="description" content="These are my blog posts" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://pinkcig.xyz" />
  <meta property="og:title" content="Faye Keller" />
  <meta property="og:description" content="These are my blog posts" />
	<meta property="og:image" content="/logo.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="250" />
	<meta property="og:image:height" content="250" />

  <meta name="theme-color" content="#c4a7e7">
  </head>
<body class="no-overflow">
  <nav data-include="sidebar" class="navbar"></nav>

  <div id="app">
    <article class="card">
      <section class="container">
        <section>
          <h1>Faye's blog posts</h1>
          <ul class="posts">
          ${posts.map((post) => `<li><a href="/posts/${post.slug}.html">${post.frontmatter.data.title}</a></li>`).join('\n')}
          </ul>
        </section>
      </section>
    </article>
  </div>

  <script type="module" src="/src/main.ts"></script>
</body>
</html>`;

	if (fileExistsAndIsNotTheSame(filePath, html)) return;

	info(`Generating "${filePath}".`);
	writeFileSync(filePath, html);
};

const path = resolve(process.cwd(), 'posts');
ensureDirectoryExists(path);

const posts = readdirSync(path)
	.filter((file) => file.endsWith('.md'))
	.map((file) => ({
		slug: file.replace('.md', ''),
		frontmatter: parseFrontMatter(readFileSync(resolve(path, file), 'utf8')),
	}));

for (const post of posts) generateHtml(path, post);
success(`Generated ${posts.length}~ posts.`);

generateIndex(path, posts);
success(`Generated index.html.`);
