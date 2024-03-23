//Group 1; code to update time
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    let time = document.querySelector(".time");
    function updateTime() {
      var date = new Date();
      time.innerHTML = date.toTimeString().substr(0, 5);
    }
    updateTime();
    setInterval(() => {
      updateTime();
    }, 1000);

    //Group 2; code to open menu
    let openMenu = document.querySelector(".button-menu");
    let closeMenu = document.querySelector(".button-close");
    let menuholders = document.querySelectorAll(".menu-will-open");
    let myCursor = document.querySelector(".mf-cursor");

    menuholders.forEach((body) => {
      openMenu.addEventListener("click", () => {
        setTimeout(() => {
          body.classList.add("menu-is-open");

          if (myCursor) {
            myCursor.style.display = "none";
          }
        }, 1000);
      });
      closeMenu.addEventListener("click", () => {
        setTimeout(() => {
          body.classList.remove("menu-is-open");
          if (myCursor) {
            myCursor.style.display = "block";
          }
        }, 1000);
      });
    });

    // GROUP 3; smooth scrolling

    function lenisSmooth() {
      if (innerWidth > 767) {
        const lenis = new Lenis({
          duration: 3,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: "vertical",
          gestureDirection: "vertical",
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
      }
    }

    lenisSmooth();

    window.addEventListener("resize", lenisSmooth);

    //Group 4 : line animation for guiding hero

    gsap.registerPlugin(ScrollTrigger);

    if (innerWidth > 767) {
      function lineTimeline(element) {
        const afterPseudo = gsap.timeline({
          defaults: {
            duration: 2,
            ease: "power2.out",
          },
        });

        afterPseudo.fromTo(
          element,
          {
            scaleX: 1,
            opacity: 1,
            transformOrigin: "center center",
          },
          {
            scaleX: 0,
            opacity: 0,
          }
        );

        return afterPseudo;
      }

      document.querySelectorAll("[line-triggerX]").forEach(function (element) {
        const lineTrigger = element.getAttribute("line-triggerX");

        const linetimeline = lineTimeline(element);

        ScrollTrigger.create({
          trigger: lineTrigger,
          start: "top 80%",
          // markers:true,
          animation: linetimeline,
          onEnter: () => linetimeline.play(),
        });
      });

      function lineyTimeline(element) {
        const afterPseudoY = gsap.timeline({
          defaults: {
            duration: 2,
            ease: "power2.out",
            delay: 1.2,
          },
        });

        afterPseudoY.fromTo(
          element,
          {
            scaleY: 1,
            opacity: 1,
            transformOrigin: "bottom",
          },
          {
            scaleY: 0,
            opacity: 0,
          }
        );

        return afterPseudoY;
      }

      document.querySelectorAll("[line-triggerY]").forEach(function (element) {
        const lineyTrigger = element.getAttribute("line-triggerY");

        const lineytimeline = lineyTimeline(element);

        ScrollTrigger.create({
          trigger: lineyTrigger,
          start: "top 80%",
          // markers:true,
          animation: lineytimeline,
          toggleActions: "play none none none",
        });
      });
    }

    //Group 5 : show footer

    if (innerWidth > 767) {
      function showFooter() {
        gsap.registerPlugin(ScrollTrigger);

        let herotimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".empty",
            start: "top bottom",
            end: "bottom 60%",
            scrub: true,
            // markers: true
          },
        });

        herotimeline.to(".empty", {
          y: "-40vh",
          ease: "expo.out",
          // duration: 3
        });
      }

      showFooter();

      window.addEventListener("resize", showFooter);
    }

    // Group 6 : folding of text from opaCITY AnimaTION

    const fx28Titles = [...document.querySelectorAll("[data-splitting][data-effect28]")];

    if (fx28Titles) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(SplitText);

      let title = new SplitText("[data-splitting][data-effect28]", {
        type: "words,lines,chars",
        wordsClass: "content__title word",
        charsClass: "char",
        linesClass: "lines",
      });

      fx28Titles.forEach((title) => {
        const words = [...title.querySelectorAll(".word")];

        for (const word of words) {
          const chars = word.querySelectorAll(".char");
          const charsTotal = chars.length;

          gsap.fromTo(
            chars,
            {
              "will-change": "transform, filter",
              transformOrigin: "50% 100%",
              scale: (position) => {
                const factor =
                  position < Math.ceil(charsTotal / 2)
                    ? position
                    : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
                return gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0.5, 2.1, factor);
              },
              y: (position) => {
                const factor =
                  position < Math.ceil(charsTotal / 2)
                    ? position
                    : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
                return gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0, 60, factor);
              },
              rotation: (position) => {
                const factor =
                  position < Math.ceil(charsTotal / 2)
                    ? position
                    : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
                return position < charsTotal / 2
                  ? gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), -4, 0, factor)
                  : gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0, 4, factor);
              },
              filter: "blur(12px) opacity(0)",
            },
            {
              ease: "power2.inOut",
              y: 0,
              rotation: 0,
              scale: 1,
              filter: "blur(0px) opacity(1)",
              scrollTrigger: {
                trigger: word,
                start: "top bottom+=40%",
                end: "top top+=15%",
                scrub: true,
              },
              stagger: {
                amount: 0.15,
                from: "center",
              },
            }
          );
        }
      });
    }

    //Group 7; code to change image on menu clicking

    let menGallery = document.querySelector(".menu-gallery"),
      workMenu = document.querySelector(".menu-work"),
      gallerypics = menGallery.querySelectorAll(".gallery__item-imginner");

    const changeWorkMenu = () => {
      gallerypics.forEach(function (element, i) {
        //  let gallerypic = querySelector(".gallery__item-imginner");
        let imageSet = element.getAttribute("data-image");

        // console.log(element, imageSet, i);
        // element.style.backgroundImage = `${imageSet}`;
        // element.setAttribute("style", `background:${imageSet}`);

        let timeline = gsap.timeline();

        timeline
          .addLabel("rotate,+=0")
          .to(
            element,
            {
              transform: "rotate3d(0, 1, 0, 180deg)",
              perspective: "1000px",
              duration: 1.2,
              ease: "power2.in",
              id: i + 1,
            },
            "rotate"
          )
          .add(() => {
            element.classList.add(`menu-image${i}`);
          });
      });
    };

    const resumeMenu = () => {
      gallerypics.forEach(function (element, i) {
        //  let gallerypic = querySelector(".gallery__item-imginner");
        let imageSet = element.getAttribute("data-image");

        // console.log(element, imageSet, i);
        // element.style.backgroundImage = `${imageSet}`;

        let timeline = gsap.timeline();

        timeline
          .to(element, {
            transform: "rotate3d(0, 1, 0, 0deg);",
            perspective: "1000px",
            duration: 1.2,
            ease: "power2.in",
            id: i + 1,
          })
          .add(() => {
            element.classList.remove(`menu-image${i}`);
          });
      });
    };

    workMenu.addEventListener("mouseenter", () => {
      changeWorkMenu();
    });

    // workMenu.addEventListener("mouseleave", () => {
    //   resumeMenu();
    // });

    //Group 8; code to toggle dark-light modes

    let toggleButton = document.querySelector(".knob");
    let togglePath = document.querySelector(".dark-toggle");
    let root = document.querySelector("body");

    let xCursor = document.querySelector(".mf-cursor");

    let on = false;

    const toggleMode = () => {
      on = !on;

      let modeOff = gsap.timeline();
      modeOff.to(toggleButton, {
        x: () => (on ? 18 : 0),
        duration: 0.4,
        ease: "expo.in",
      });
      let heylinkers = document.querySelectorAll(".portfolio-map a");
      heylinkers.forEach((heylinker) => {
        gsap.set(heylinker, {
          color: on ? "#fff" : "#000",
        });
      });
    };

    togglePath.addEventListener("click", () => {
      toggleMode();
      root.classList.toggle("dark-mode");
      xCursor.classList.add("-exclusion");

      // bodyComputedStyle.getPropertyValue('--color-black'),
    });

    //Group 9; initiating and controlling custom cursor

    if (innerWidth > 767) {
      let cursor = new MouseFollower();
    }

    if (document.querySelector(".mf-cursor")) {
      function hideMf() {
        if (innerWidth < 768) {
          document.querySelector(".mf-cursor").style.display = "none";
        }
      }

      hideMf();
    }
    window.addEventListener("resize", hideMf);

    // Group 10:  Magnetic effect for elements with class .viewall

    const els = document.querySelectorAll(".magnetic");

    els.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        console.log("magnettt");
      });

      // Apply Magnetic effect to each element individually
      new Magnetic(el, {
        y: 0.4, // horizontal delta
        x: 0.4, // vertical delta
        s: 0.2, // speed
        rs: 0.7, // release speed
      });
    });

    // Automatic handle magnetic elements through attribute
    $("[data-magnetic]").each(function () {
      new Magnetic(this);
    });

    //Group 11: scroll to  a location

    gsap.registerPlugin(ScrollToPlugin);

    let toContact = document.querySelector(".tocontact"),
      toworks = document.querySelector(".toworks"),
      tohero = document.querySelector(".tohero"),
      toabout = document.querySelector(".toabout");

    toContact.addEventListener("click", () => {
      gsap.to(window, {
        duration: 3,
        scrollTo: ".free-time",
        ease: "expo.out",
      });
    });

    toworks.addEventListener("click", () => {
      gsap.to(window, {
        duration: 3,
        scrollTo: { y: ".works", offsetY: 50 },
        ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    });

    tohero.addEventListener("click", () => {
      gsap.to(window, {
        duration: 3,
        scrollTo: { y: ".content-hero" },
        ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    });

    toabout.addEventListener("click", () => {
      gsap.to(window, {
        duration: 3,
        scrollTo: { y: ".intro-port", offsetY: 10 },
        ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    });

    // Group 12: turn scrollers to white

    let linkers = document.querySelectorAll(".portfolio-map a");
    let body = document.querySelector("body");
    let colordefault = getComputedStyle(body).backgroundColor;
    let colorbackup = getComputedStyle(body).color;

    let linkersTimeline = gsap.timeline({
      paused: true, // Pause the timeline initially
      scrollTrigger: {
        trigger: ".free-time",
        start: "top center",
        markers: !true,
        onEnter: () => {
          linkersTimeline.play();
        },
        onLeaveBack: () => {
          linkersTimeline.reverse();
        },
      },
    });

    // Additional scroll trigger for when scrolling back to the top
    gsap.to(window, {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        onEnter: () => {
          linkersTimeline.reverse();
        },
      },
    });

    linkers.forEach((linker) => {
      linkersTimeline.fromTo(
        linker,
        {
          color: colorbackup,
        },
        {
          color: colordefault,
          duration: 0.4,
          ease: "power1.out",
        }
      );
    });
  }, 0);
});

//Group 13: change Array of words in hello contact footer

const words = ["Hello", "Hola", "Bonjour", "Salut", "Chao"];
let currentIndex = 0;

function changeWord() {
  const span = document.getElementById("changehello");
  currentIndex = (currentIndex + 1) % words.length;
  span.innerHTML = words[currentIndex];
}

// Call the function after 10 seconds
setInterval(changeWord, 10000);

// Group 13: copy email address

function copyToClipboard(text) {
  if (innerWidth > 767 && document.hasFocus()) {
    navigator.clipboard.writeText(text);

    let copies = document.querySelectorAll(".copy");

    copies.forEach((copy) => {
      copy.innerHTML = "Copied";

      setTimeout(() => {
        copy.innerHTML = "Copy!";
      }, 4000);
    });
  }
}

// Group 14 : animate text
const text3d = () => {
  if (innerWidth > 767) {
    gsap.registerPlugin(ScrollTrigger);
    const fx19Titles = [...document.querySelectorAll("[data-splitting][data-effect19]")];

    fx19Titles.forEach((title) => {
      const chars = title.querySelectorAll(".char");

      chars.forEach((char) => gsap.set(char.parentNode, { perspective: 1000 }));

      gsap.fromTo(
        chars,
        {
          "will-change": "opacity, transform",
          transformOrigin: "50% 0%",
          opacity: 0,
          rotationX: -90,
          z: -200,
        },
        {
          ease: "power1",
          opacity: 1,
          stagger: 0.05,
          rotationX: 0,
          z: 0,
          scrollTrigger: {
            trigger: title,
            start: "center bottom",
            end: "bottom top+=40%",
            scrub: true,
          },
        }
      );
    });
  }
};

text3d();

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    text3d();
    copyToClipboard();
  }, 250);
});

// Group 14: rotate the socials star

if (innerWidth > 767) {
  let socialtl = gsap.timeline({
    scrollTrigger: {
      trigger: ".wiggle",
      start: "top 90%",
      end: "top 30%",
      scrub: 1,
    },
  });

  socialtl.fromTo(
    "#logo-36",
    {
      scale: 0.3,
      y: "-200px",
      rotate: 0,
    },
    {
      scale: 1,
      y: 0,
      rotate: 360,
    }
  );
}

//Group 15: lets rotate some i's in the footer

let chars = [...document.querySelectorAll(".rotate-i .char")];

// Here we're creating a timeline that we can use
const lettertl = gsap.timeline({
  repeat: -1,
  duration: 2,
  delay: 3,
  yoyo: true,
});

lettertl.to(chars[6], { rotation: 360 });
lettertl.to(chars[11], { rotation: 360 });

//use the defaults

let emailbox = document.querySelector(".email-box");

//  Group 13: darkmode if user browser prefers

// if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
//   // User prefers dark mode, add the dark-mode class to the body element
//   document.body.classList.add("dark-mode");
// } else {
//   document.body.classList.remove("dark-mode");
// }
