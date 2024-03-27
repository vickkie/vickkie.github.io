import { preloadImages } from "./utils.js";
import GalleryController from "./galleryController.js";

// Preload images and fonts
Promise.all([preloadImages(".gallery__item-imginner")]).then(() => {
  document.body.classList.remove("loading");
  // Initialize the GalleryController
  new GalleryController(document.querySelector(".gallery"));
});
