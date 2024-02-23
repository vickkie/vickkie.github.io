import { preloadImages, preloadFonts } from './utils.js';
// import { Cursor } from './cursor.js';
import { Item }  from './item.js';

// Preload images and fonts
Promise.all([preloadImages('.item__img, .content__img')]).then(() => {
    // remove loader (loading class) 
    document.body.classList.remove('loading');
    
    // initialize custom cursor
    // const cursor = (document.querySelector('.cursor-round'));

    let itemsArr = [];
    [...document.querySelectorAll('.items > .item')].forEach(item => itemsArr.push(new Item(item, itemsArr)));

    // mouse effects on all links and others
    [...document.querySelectorAll('a, .unbutton')].forEach(link => {
        // link.addEventListener('mouseenter', () => cursor.enter());
        // link.addEventListener('mouseleave', () => cursor.leave());
    });
});