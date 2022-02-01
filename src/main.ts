import "./style.css";
import { POP } from "./content";

document.addEventListener("DOMContentLoaded", async () => {
  await POP.play();

  document.addEventListener("click", () => POP.play());
  document
    .querySelectorAll(".card")
    .forEach((card) => card.addEventListener("mouseenter", () => POP.play()));
});
