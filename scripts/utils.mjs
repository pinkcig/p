import { EOL } from "node:os";

// const fatal = (...args) => {
//   log(icons[fatal], "\x1b[31m", ...args);
//   process.exit(1);
// };

const info = (...args) => {
  log(icons[info], "\x1b[34m", ...args);
};

const success = (...args) => {
  log(icons[success], "\x1b[32m", ...args);
};

const warn = (...args) => {
  log(icons[warn], "\x1b[33m", ...args);
};

const icons = {
  [success]: "✔",
  // [fatal]: "✘",
  [warn]: "⚠",
  [info]: "ℹ️",
};

const log = (icon, colour, ...args) => {
  process.stdout.write(`${colour}\x1b[1m${icon} ${args.join("")}${EOL}\x1b[0m`);
};

export { info, success, warn };
