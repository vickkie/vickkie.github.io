import { Cursor } from "./cursor.js";
import { MenuItem } from "./menuItem.js";

// initialize Splitting
const splitting = Splitting();

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
