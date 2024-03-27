// import imagesLoaded from 'imagesloaded.js';

// const imagesLoaded = require('imagesloaded');

// Preload images
const preloadImages = (selector = "img") => {
  return new Promise((resolve) => {
    imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
  });
};

// Preload images
const preloadFonts = (id) => {
  return new Promise((resolve) => {
    WebFont.load({
      typekit: {
        id: id,
      },
      active: resolve,
    });
  });
};

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const calcWinsize = () => {
  return { width: window.innerWidth, height: window.innerHeight };
};

// Gets the mouse position
const getMousePos = (e) => {
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

const distance = (x1, y1, x2, y2) => {
  var a = x1 - x2;
  var b = y1 - y2;

  return Math.hypot(a, b);
};

// Generate a random float.
const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

const wrapElements = (elems, wrapType, wrapClass) => {
  elems.forEach((char) => {
    // add a wrap for every char (overflow hidden)
    const wrapEl = document.createElement(wrapType);
    wrapEl.classList = wrapClass;
    char.parentNode.appendChild(wrapEl);
    wrapEl.appendChild(char);
  });
};

const abibae = () => {
  let mainDivs = document.querySelectorAll(".content-works");
  mainDivs.forEach((mainDiv) => {
    let newDiv = document.createElement("div");
    newDiv.classList = "field-year-abibae";
    mainDiv.appendChild(newDiv);

    let paragraph = document.createElement("p");
    paragraph.textContent = "Copyright uzitrake @2024";
    newDiv.appendChild(paragraph);
  });
};

export { preloadImages, preloadFonts, lerp, calcWinsize, getMousePos, distance, getRandomFloat, wrapElements, abibae };
