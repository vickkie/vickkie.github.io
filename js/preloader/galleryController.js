
import { calcWinsize, getRandomInteger } from './utils.js';
import GalleryItem from './galleryItem.js';


// Call the splittingjs to transform the data-splitting texts to spans of chars 
Splitting();

const lenis = new Lenis({

      duration: 3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,

    });


    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);


// Calculate the viewport size
let winsize = calcWinsize();
window.addEventListener('resize', () => winsize = calcWinsize());
const overlayRows = [...document.querySelectorAll('.overlay__row')];

export default class GalleryController {
    constructor(galleryEl) {
        this.DOM = {
            galleryEl: galleryEl,
            title: document.querySelector('.title-uzi')
        };
        this.DOM.titleChars = this.DOM.title.querySelectorAll('.char');
        this.titleCharsTotal = this.DOM.titleChars.length;
        this.DOM.galleryItemElems = [...this.DOM.galleryEl.querySelectorAll('.gallery__item')];
        this.galleryItems = [];
        this.DOM.galleryItemElems.forEach(el => this.galleryItems.push(new GalleryItem(el)));
        this.itemsTotal = this.galleryItems.length;
        

        this.intro();
    }
    intro() {
        // create the timeline
        // let's start by animating the main intro text
        const timeline = gsap.timeline().to(this.DOM.title, {
            duration: 1,
            ease: 'expo',
            startAt: {y: '10%'},
            y: '0%',
            opacity: 1,
       
        }, 0);

        // now let's center the images (stack)
        for (const [pos, item] of this.galleryItems.entries()) {
            timeline.set(item.DOM.img, {
                x: winsize.width/2 - item.imgRect.left - item.imgRect.width/2,
                y:  winsize.height/2 - item.imgRect.top - item.imgRect.height/2,
                scale: 1.6,
                rotation: getRandomInteger(-10,10),
                opacity: 1,
                delay: 0.2*pos,
               
            }, 0);

            // for the first image, we set a high scale for the inner image element
            // later we will animate this scale value together with the scale value of the outer image
            if ( pos === 0 ) {
                timeline.set(item.DOM.imgInner, {
                    scale: 1.8
                }, 0);
            }
        }

        // access the first and other images in the stack
        const [firstImage, ...otherImages] = this.galleryItems.map(el => el.DOM.img);

        timeline
        .addLabel('startAnimation', '+=0')
        // allow scroll and update the locomotive scroll
        .add(() => {
            document.body.classList.remove('noscroll');
            // scroll.update();
        }, 'startAnimation')
        
        // animate the main title characters out and fade them out too
        .to(this.DOM.titleChars, {
            duration: 1,
            ease: 'expo',
            x: (pos, target) => {
                return -40*(Math.floor(this.titleCharsTotal/2)-pos);
            },
            opacity: 0,
            stagger: {from: 'center'}
        }, 'startAnimation')

        // the other images in the stack will animate its translation values randomly
        .to(otherImages, {
            duration: 1, 
            ease: 'power3',
            x: () => '+='+getRandomInteger(-200,200)+'%',
            y: () => '+='+getRandomInteger(-200,200)+'%',
            opacity: 0,
            rotation: () => getRandomInteger(-20,20)
        }, 'startAnimation')
        // and then we make them appear in their final position in the grid
        .to(otherImages, {
            duration: 0.5,
            ease: 'expo',
            startAt: {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 0.8
            },
            scale: 1,
            opacity: 1
        })

        // the first image will now animate to it's final position
        .to(firstImage, {
            duration: 1.2,
            ease: 'expo',
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1
        }, 'startAnimation+=0.2')
        // both the image and inner image animate the scale value to achieve the "reveal effect"
        .to(this.galleryItems[0].DOM.imgInner, {
            duration: 1.2,
            ease: 'expo',
            scale: 1
        }, 'startAnimation')

       .addLabel('grid', 'start+=0.1')
        .to(overlayRows, {
             ease: 'expo3.in',
             duration: 1,
             scaleX: 0,
         }, 'grid')
        
        .to(otherImages, {
            duration: 0.5,
            ease: 'expo2',
            opacity: 0
        },'grid+=0.51')

        // the first image will now disappear
        .to(firstImage, {
            duration: 0.5,
            ease: 'expo2',
            opacity: 0
        },'grid+=0.51')
        .to('.preloader',{
            // scaleX: "0" ,
            // transformOrigin: '0% 0%',
            opacity: 0,
            zIndex: -1,
            display: 'none',
            duration: 0.1,
            ease: "power1"
        });

        // finally, animate the gallery item's content elements (title, number and texts)
        // for (const [pos, item] of this.galleryItems.entries()) {
        //     timeline
        //     .add( () => item.inStack = false, 'startAnimation+=1' )
        //     .to(item.DOM.captionChars, {
        //         duration: 2,
        //         ease: 'expo',
        //         startAt: {
        //             opacity: 0,
        //             x: pos => -40*(Math.floor(item.captionCharsTotal/2)-pos)
        //         },
        //         x: 0,
        //         opacity: 1,
        //         stagger: {from: 'center'}
        //     }, 'startAnimation')
        //     .to([item.DOM.caption.number,item.DOM.caption.texts], {
        //         duration: 1,
        //         ease: 'power1',
        //         startAt: {opacity: 0},
        //         opacity: 1,
        //         stagger: 0.04
        //     }, 'startAnimation+=0.3')
        // }
    }
}