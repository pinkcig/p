#! /usr/bin/env node
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { success, warn, info } from './utils.mjs';
import { default as parseFrontMatter } from 'gray-matter';
import { marked } from 'marked';

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

  <title>${post.frontmatter.data.title}</title>
  <meta name="description" content="${post.frontmatter.data.description}" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://pinkcig.xyz" />
  <meta property="og:title" content="Faye Keller" />
  <meta property="og:description" content="${post.frontmatter.data.description}" />
  <meta property="og:image" content="https://avatars.githubusercontent.com/u/62260409?v=4" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://pinkcig.xyz" />
  <meta property="twitter:title" content="Faye Keller" />
  <meta property="twitter:description" content="${post.frontmatter.data.description}" />
  <meta property="twitter:image" content="https://avatars.githubusercontent.com/u/62260409?v=4" width="64" />
</head>
<body style="overflow-x: hidden;">
  <div class="cursor"></div>
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

  <title>Faye's Blog Posts</title>
  <meta name="description" content="These are my blog posts" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://pinkcig.xyz" />
  <meta property="og:title" content="Faye Keller" />
  <meta property="og:description" content="These are my blog posts" />
  <meta property="og:image" content="https://avatars.githubusercontent.com/u/62260409?v=4" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://pinkcig.xyz" />
  <meta property="twitter:title" content="Faye Keller" />
  <meta property="twitter:description" content="These are my blog posts" />
  <meta property="twitter:image" content="https://avatars.githubusercontent.com/u/62260409?v=4" width="64" />
</head>
<body class="no-overflow">
  <div class="cursor"></div>
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
