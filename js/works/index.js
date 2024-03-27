import { preloadImages, abibae } from "./utils.js";
import { Item } from "./item.js";

// Preload images and fonts
Promise.all([preloadImages(".item__img, .content__img")]).then(() => {
  abibae();
  document.body.classList.remove("loading");

  let itemsArr = [];
  [...document.querySelectorAll(".items > .item")].forEach((item) => itemsArr.push(new Item(item, itemsArr)));

  // mouse effects on all links and others
  [...document.querySelectorAll("a, .unbutton")].forEach((link) => {
    // link.addEventListener('mouseenter', () => cursor.enter());
    // link.addEventListener('mouseleave', () => cursor.leave());
  });
});
