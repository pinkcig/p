#! /usr/bin/env node

import { minify } from 'html-minifier-terser';
import { readdir, stat, mkdir, cp, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const BASE_PATH = resolve(process.cwd(), 'public');
const DEST_PATH = resolve(process.cwd(), 'dist');

for await (const file of recursiveReaddir(BASE_PATH)) {
	await stat(DEST_PATH).catch(() => mkdir(DEST_PATH));

	const ext = file.split('.').pop();

	if (ext !== 'html') await cp(file, `${DEST_PATH}/${file.split('/').pop()}`);
	else {
		const html = await readFile(file, 'utf8');
		const minified = await minify(html, {
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
			removeComments: true,
			removeEmptyAttributes: true,
			removeRedundantAttributes: true,
		});

		await writeFile(`${DEST_PATH}/${file.split('/').pop()}`, minified);
	}
}

async function* recursiveReaddir(dir) {
	const path = resolve(dir);

	for (const file of await readdir(path, { withFileTypes: true })) {
		if (file.isDirectory()) yield* recursiveReaddir(`${path}/${file.name}`);
		else yield `${path}/${file.name}`;
	}
}
