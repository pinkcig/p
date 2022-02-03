const { readdirSync } = require("fs");
const { resolve } = require("path");

const config = {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
};

// feels like a hack, but rollup docs suck
readdirSync(resolve(__dirname, "posts"))
  .map((file) => resolve(__dirname, "posts", file))
  .filter((file) => !file.endsWith(".md"))
  .forEach((file) => {
    config.build.rollupOptions.input[`posts.${file.split(".").shift()}`] = file;
  });

module.exports = config;
