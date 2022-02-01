import "./style.css";
import { POP } from "./content";

// Avoid people opening devtools because I'm a bitch
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("keydown", (event) => {
  if (
    event.keyCode === 123 ||
    (event.ctrlKey && event.shiftKey && event.keyCode === 73)
  )
    event.preventDefault();
});

// Wait for DOM to load because it actually matters here, I believe
document.addEventListener("DOMContentLoaded", async () => {
  await POP.play();

  document.addEventListener("click", () => POP.play());
  document
    .querySelectorAll("#card")
    .forEach((card) => card.addEventListener("mouseenter", () => POP.play()));
});
