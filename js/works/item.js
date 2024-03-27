import { MagneticFx } from "./magneticFx.js";
import { calcWinsize, wrapElements } from "./utils.js";

Splitting();

// Calculate the viewport size
let winsize = calcWinsize();
window.addEventListener("resize", () => (winsize = calcWinsize()));

const frameEl = document.querySelectorAll(".frame");

let viewcaseChars = document.querySelectorAll(".viewcase .char");

export class Item {
  constructor(el, itemsArr) {
    this.DOM = { el: el };
    this.DOM.html = document.querySelector("html");
    this.itemsArr = itemsArr;
    // left/right(invert) align
    this.invert = this.DOM.el.classList.contains("item--invert");

    // image
    this.DOM.imgWrap = this.DOM.el.querySelector(".item__imgwrap");
    this.DOM.img = this.DOM.imgWrap.querySelector(".item__img");

    //main image in case study

    // circle hover effect
    this.DOM.enterAction = this.DOM.el.querySelector(".item__enter");
    this.DOM.enterActionSVGCircle = this.DOM.enterAction.querySelector("circle");
    // need to set the circle transform origin
    gsap.set(this.DOM.enterActionSVGCircle, { transformOrigin: "50% 50%" });
    // the circle magnetic functionality
    this.magneticFx = new MagneticFx(this.DOM.enterAction);

    // create the heading texts structure for the characters sliding animation (split the text into characters)
    this.editHeadingLayout();

    // excerpt element
    this.DOM.excerpt = this.DOM.el.querySelector(".item__excerpt");
    // excerpt link ("Read more")
    this.DOM.excerptLink = this.DOM.excerpt.querySelector(".item__excerpt-link");
    // excerpt link href contains the content element's id
    this.contentId = this.DOM.excerptLink.href.substring(this.DOM.excerptLink.href.lastIndexOf("#"));

    // meta texts under each image
    this.DOM.metaContent = [...this.DOM.el.querySelectorAll(".item__meta > .item__meta-row")];

    // content element and split the texts into chars/lines
    this.editContentLayout();

    // back arrow button

    this.DOM.backCtrl = document.querySelector(".content__back");

    this.initEvents();
  }
  editHeadingLayout() {
    this.DOM.heading = this.DOM.el.querySelector(".heading--item");

    this.DOM.itemHeadingChars = [...this.DOM.heading.querySelectorAll(".char")];

    wrapElements(this.DOM.itemHeadingChars, "span", "char-wrap");
  }
  editContentLayout() {
    this.DOM.contentEl = document.querySelector(this.contentId);

    this.DOM.contentElHeading = this.DOM.contentEl.querySelector(".heading");
    this.DOM.contentHeadingChars = [...this.DOM.contentElHeading.querySelectorAll(".char")];
    wrapElements(this.DOM.contentHeadingChars, "span", "char-wrap");

    this.DOM.contentElText = [...this.DOM.contentEl.querySelectorAll(".content__detail > *")];
    this.DOM.imageMain = this.DOM.contentEl.querySelector(".project-image");
    this.DOM.marquee = this.DOM.contentEl.querySelector(".design-marquee");
    this.DOM.projeimage1 = this.DOM.contentEl.querySelector(".product-image1");
    this.DOM.projeimage2 = this.DOM.contentEl.querySelector(".product-image2");
    this.DOM.projeimage3 = this.DOM.contentEl.querySelector(".product-image3");
  }
  initEvents() {
    this.DOM.enterAction.addEventListener("mouseenter", () => this.onMouseEnter());
    this.DOM.enterAction.addEventListener("mouseleave", () => this.onMouseLeave());
    this.DOM.enterAction.addEventListener("click", () => this.open());
    // same for the "read more" link
    this.DOM.excerptLink.addEventListener("mouseenter", () => this.onMouseEnter());
    this.DOM.excerptLink.addEventListener("mouseleave", () => this.onMouseLeave());
    this.DOM.excerptLink.addEventListener("click", () => this.open());

    this.DOM.backCtrl.addEventListener("click", () => this.close());
  }
  onMouseEnter() {
    if (this.timelineHoverOut) this.timelineHoverOut.kill();
    this.timelineHoverIn = gsap
      .timeline()
      .addLabel("start", 0)

      .to(
        this.DOM.enterActionSVGCircle,
        {
          duration: 0.8,
          ease: "power3",
          scale: 1.1,
        },
        "start"
      )
      .to(
        this.DOM.imgWrap,
        {
          duration: 0.8,
          ease: "power3",
          scale: 0.95,
        },
        "start"
      )
      .to(
        this.DOM.img,
        {
          duration: 0.8,
          ease: "power3",
          scale: 1.1,
        },
        "start"
      )

      .set(viewcaseChars, {
        opacity: 0,
      })
      .to(
        this.DOM.itemHeadingChars,
        {
          duration: 0.2,
          ease: "quad.in",
          x: this.invert ? "103%" : "-103%",
        },
        "start"
      )
      .set(
        this.DOM.heading,
        {
          x: this.invert ? "20%" : "-20%",
        },
        "start+=0"
      )
      .to(
        this.DOM.itemHeadingChars,
        {
          duration: 0.7,
          ease: "expo",
          startAt: { x: this.invert ? "-103%" : "103%" },
          x: "0%",
        },
        "start+=0.2"
      )
      .to(viewcaseChars, {
        duration: 0.1,
        ease: "expo",
        opacity: 1,
        stagger: {
          amount: 0.5,
          grid: "auto",
          from: "random",
        },
      });
  }
  onMouseLeave() {
    if (this.isContentOpen) return;

    if (this.timelineHoverIn) this.timelineHoverIn.kill();

    this.timelineHoverOut = gsap
      .timeline()
      .addLabel("start", 0)
      .to(
        this.DOM.enterAction,
        {
          duration: 0.8,
          ease: "power3",
          x: 0,
          y: 0,
        },
        "start"
      )
      .to(
        this.DOM.enterActionSVGCircle,
        {
          duration: 0.8,
          ease: "power3",
          scale: 1,
        },
        "start"
      )
      .to(
        [this.DOM.imgWrap, this.DOM.img],
        {
          duration: 0.8,
          ease: "power3",
          scale: 1,
        },
        "start"
      )
      .to(
        this.DOM.itemHeadingChars,
        {
          duration: 0.2,
          ease: "quad.in",
          x: this.invert ? "-103%" : "103%",
        },
        "start"
      )
      .set(
        this.DOM.heading,
        {
          x: "0%",
        },
        "start+=0.2"
      )
      .to(
        this.DOM.itemHeadingChars,
        {
          duration: 0.7,
          ease: "expo",
          startAt: { x: this.invert ? "103%" : "-103%" },
          x: "0%",
        },
        "start+=0.2"
      )
      .set(viewcaseChars, {
        opacity: 1,
      });
  }
  open() {
    // stop the magnetic effect
    this.magneticFx.stopRendering();

    if (this.timelineHoverIn) this.timelineHoverIn.kill();
    if (this.timelineHoverClose) this.timelineHoverClose.kill();

    this.isContentOpen = true;

    // scroll related
    this.DOM.html.classList.add("oh");

    // added lenis to counter anti scroll behavior

    this.DOM.contentEl.classList.add("content__article--open");
    this.DOM.contentEl.classList.add("lenis");

    // circle element size and position
    const enterActionRect = this.DOM.enterAction.getBoundingClientRect();

    this.timelineHoverOpen = gsap
      .timeline()
      .addLabel("start", 0)
      // set up some content elements before the animation starts
      // the content heading chars will translate on the x-axis so we set the initial position to the right/left depending on the item's position in the grid
      .set(
        this.DOM.contentHeadingChars,
        {
          x: this.invert ? "-103%" : "103%",
        },
        "start"
      )

      .to(".free-time", {
        zIndex: 2,
      })
      // same for the content text. These will translate on the y-axis and also fade in
      .set(
        this.DOM.contentElText,
        {
          opacity: 0,
          y: "20%",
        },
        "start"
      )
      .set(
        this.DOM.imageMain,
        {
          opacity: 0,
          y: "20%",
        },
        "start"
      )
      // also set up the initial style for the back button
      .set(
        this.DOM.backCtrl,
        {
          scale: 0.8,
          opacity: 0,
        },
        "start"
      )
      // hide all other items
      .to(
        [frameEl, this.itemsArr.filter((item) => item != this).map((item) => item.DOM.el)],
        {
          duration: 0.6,
          ease: "power3",
          opacity: 0,
        },
        "start"
      )
      // animate circle button position
      .to(
        this.DOM.enterAction,
        {
          duration: 0.8,
          ease: "power2",
          x: winsize.width / 2 - enterActionRect.left - enterActionRect.width / 2,
          y: -enterActionRect.top - enterActionRect.height / 2,
        },
        "start"
      )
      // and also its scale and opacity
      .to(
        this.DOM.enterActionSVGCircle,
        {
          duration: 2,
          ease: "power2",
          scale: 2.3,
          opacity: 0,
          onComplete: () =>
            gsap.set(this.DOM.enterAction, {
              x: 0,
              y: 0,
            }),
        },
        "start"
      )
      // excerpt text moves up and fades out
      .to(
        [this.DOM.excerpt, this.DOM.metaContent],
        {
          duration: 0.5,
          ease: "power4.in",
          y: (i) => (i ? "-100%" : "-8%"),
          opacity: 0,
          stagger: {
            from: "center",
            amount: 0.06,
          },
        },
        "start"
      )
      // image scales down and fades out
      .to(
        this.DOM.imgWrap,
        {
          duration: 0.5,
          ease: "power3.inOut",
          scale: 0.9,
          opacity: 0,
        },
        "start"
      )
      // animate out the heading chars
      .to(
        this.DOM.itemHeadingChars,
        {
          duration: 0.3,
          ease: "quad.in",
          x: this.invert ? "103%" : "-103%",
        },
        "start"
      )
      // animate in the content chars
      .to(
        this.DOM.contentHeadingChars,
        {
          duration: 1.3,
          ease: "expo",
          x: "0%",
          stagger: this.invert ? -0.03 : 0.03,
        },
        "start+=0.4"
      )
      // content text moves up and fades in
      .to(
        this.DOM.contentElText,
        {
          duration: 1.3,
          ease: "expo",
          y: "0%",
          opacity: 1,
          stagger: 0.03,
        },
        "start+=0.7"
      )

      .to(
        this.DOM.imageMain,
        {
          duration: 1.3,
          ease: "expo",
          y: "0%",
          opacity: 1,
          stagger: 0.03,
        },
        "start+=0.7"
      )
      // animate back button in
      .to(
        this.DOM.backCtrl,
        {
          duration: 1.3,
          ease: "expo",
          scale: 1,
          opacity: 1,
        },
        "start+=1"
      )

      //animate marquee sideways to opacity
      .to(
        this.DOM.marquee,
        {
          duration: 0.5,
          ease: "power4.in",
          opacity: 1,
          y: "0%",
          x: "0",
        },
        "start+1"
      )
      //now animate images sideways to scaleY fully
      .to(
        this.DOM.projeimage1,
        {
          duration: 0.5,
          ease: "power4.in",
          opacity: 1,
          scaleX: "100%",
          scaleY: "100%",
        },
        "start"
      )
      .to(
        this.DOM.projeimage2,
        {
          duration: 0.5,
          ease: "power4.in",
          opacity: 1,
          scaleX: "100%",
          scaleY: "100%",
        },
        "start"
      )
      .to(
        this.DOM.projeimage3,
        {
          duration: 0.5,
          ease: "power3.in",
          opacity: 1,
          scaleX: "100%",
          scaleY: "100%",
        },
        "start"
      )
      .to(
        ".portfolio-map",
        {
          scale: 0,
          duration: 0.6,
          ease: "power3",
        },
        "start"
      );
  }
  close() {
    if (this.timelineHoverOpen) this.timelineHoverOpen.kill();

    this.isContentOpen = false;

    this.timelineHoverClose = gsap
      .timeline()
      .addLabel("start", 0)
      .set(
        this.DOM.enterAction,
        {
          x: 0,
          y: 0,
        },
        "start"
      )
      .to(
        this.DOM.backCtrl,
        {
          duration: 0.3,
          ease: "quad.in",
          scale: 0.9,
          opacity: 0,
        },
        "start"
      )
      .set(
        this.DOM.enterActionSVGCircle,
        {
          scale: 0.5,
          opacity: 0,
        },
        "start+=0.4"
      )

      .to(".free-time", {
        zIndex: 3,
      })
      .to(
        this.DOM.enterActionSVGCircle,
        {
          duration: 0.6,
          ease: "expo",
          scale: 1,
          opacity: 1,
          onComplete: () => {
            // scroll related
            this.DOM.contentEl.classList.remove("content__article--open");
            this.DOM.contentEl.classList.remove("lenis");
            this.DOM.html.classList.remove("oh");
            // scroll content element to the top
            this.DOM.contentEl.scrollTop = 0;
          },
        },
        "start+=0.4"
      )
      .to(
        this.DOM.contentHeadingChars,
        {
          duration: 0.3,
          ease: "quad.in",
          x: this.invert ? "-103%" : "103%",
        },
        "start"
      )
      .to(
        this.DOM.itemHeadingChars,
        {
          duration: 1.3,
          ease: "expo",
          x: "0%",
          stagger: this.invert ? 0.01 : -0.01,
        },
        "start+=0.4"
      )
      .to(
        this.DOM.contentElText,
        {
          duration: 0.5,
          ease: "power4.in",
          opacity: 0,
          y: "20%",
        },
        "start"
      )
      .to(
        this.DOM.imageMain,
        {
          duration: 0.5,
          ease: "power4.in",
          opacity: 0,
          y: "20%",
        },
        "start"
      )
      .to(
        this.DOM.marquee,
        {
          duration: 0.7,
          ease: "power4.in",
          opacity: 0,
          y: "20%",
          x: "200",
        },
        "start"
      )
      .to(
        this.DOM.projeimage1,
        {
          duration: 0.5,
          ease: "power3.in",
          opacity: 0,
          scaleX: "80%",
          scaleY: "20%",
        },
        "start"
      )
      .to(
        this.DOM.projeimage2,
        {
          duration: 0.5,
          ease: "power3.in",
          opacity: 0,
          scaleX: "80%",
          scaleY: "20%",
        },
        "start"
      )
      .to(
        this.DOM.projeimage3,
        {
          duration: 0.5,
          ease: "power3.in",
          opacity: 0,
          scaleX: "80%",
          scaleY: "20%",
        },
        "start"
      )
      .to(
        this.DOM.imgWrap,
        {
          duration: 0.8,
          ease: "power3",
          scale: 1,
          opacity: 1,
        },
        "start+=0.4"
      )
      .to(
        [this.DOM.excerpt, this.DOM.metaContent],
        {
          duration: 1.3,
          ease: "expo",
          y: "0%",
          opacity: 1,
          stagger: {
            from: "center",
            amount: 0.06,
          },
        },
        "start+=0.4"
      )
      .to(
        [frameEl, this.itemsArr.filter((item) => item != this).map((item) => item.DOM.el)],
        {
          duration: 0.6,
          ease: "power3",
          opacity: 1,
        },
        "start+=0.4"
      )
      .to(".portfolio-map", {
        scale: 1,
        duration: 0.6,
        ease: "power3",
      });
  }
}
