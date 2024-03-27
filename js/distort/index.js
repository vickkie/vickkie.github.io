import { Cursor } from "./cursor.js";
import { MenuItem } from "./menuItem.js";

gsap.registerPlugin(SplitText);
document.addEventListener("DOMContentLoaded", () => {
  const splitchars = document.querySelectorAll(".split-char");

  splitchars.forEach((splitchar) => {
    new SplitText(splitchar, {
      type: "chars",
      charsClass: "char",
    });
  });
});

// initialize custom cursor
const cursor = new Cursor(document.querySelector(".cursor"));

// Menu Items
[...document.querySelectorAll(".menu > a")].forEach((el) => new MenuItem(el));

let togglePathx = document.querySelector(".dark-toggle");

togglePathx.addEventListener("click", () => {
  [...document.querySelectorAll("a")].forEach((link) => {
    cursor.enter();
    cursor.leave();
  });
});

// mouse effects on all links
[...document.querySelectorAll("a")].forEach((link) => {
  link.addEventListener("mouseenter", () => cursor.enter());
  link.addEventListener("mouseleave", () => cursor.leave());
});
