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

document.addEventListener("DOMContentLoaded", async () => {
  await POP.play();

  document.addEventListener("click", () => POP.play());
});

document.querySelectorAll("[data-include]").forEach(async (element) => {
  const url = `/views/${element.getAttribute("data-include")}.html`;

  await fetch(url)
    .catch(() => null)
    .then(async (response) => {
      element.innerHTML = await response!.text();
    });
});

document.onmousemove = (event) => {
  document.body.style.setProperty("--x", event.clientX + "px");
  document.body.style.setProperty("--y", event.clientY + "px");
};
