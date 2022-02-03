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
const addToConfig = (dir) =>
  readdirSync(resolve(__dirname, dir))
    .map((file) => resolve(__dirname, dir, file))
    .filter((file) => file.endsWith(".html"))
    .forEach((file) => {
      config.build.rollupOptions.input[`${dir}.${file.split(".").shift()}`] =
        file;
    });

addToConfig("posts");
addToConfig("views");

module.exports = config;
