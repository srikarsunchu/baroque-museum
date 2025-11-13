import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  initLenis,
  fadeUpOnScroll,
  scaleInOnScroll,
  parallaxOnScroll,
  heroParallax,
} from "./scroll-animations.js";

gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger);

CustomEase.create(
  "hop",
  "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
);

const carouselSlides = [
  {
    title: "Jupiter Rebuked by Venus",
    image: "/carousel/slide-img-1.jpg",
    slug: "jupiter-rebuked-by-venus",
  },
  {
    title: "After the Bullfight",
    image: "/carousel/slide-img-2.jpg",
    slug: "after-the-bullfight",
  },
  {
    title: "The Continence of Scipio",
    image: "/carousel/slide-img-3.jpg",
    slug: "the-continence-of-scipio",
  },
  {
    title: "Old Peasant Lighting a Pipe",
    image: "/carousel/slide-img-4.jpg",
    slug: "old-peasant-lighting-pipe",
  },
  {
    title: "An Elegant Company",
    image: "/carousel/slide-img-5.jpg",
    slug: "an-elegant-company",
  },
  {
    title: "David with the Head of Goliath",
    image: "/carousel/DavidnGoliath.png",
    slug: "david-with-head-of-goliath",
  },
  {
    title: "Girl with the Pearl Earring",
    image: "/carousel/PearlEarring.png",
    slug: "girl-with-pearl-earring",
  },
  {
    title: "Adoration of the Magi",
    image: "/carousel/adoration.jpg",
    slug: "adoration-of-the-magi",
  },
  {
    title: "The Night Watch",
    image: "/carousel/TheNightWatch.png",
    slug: "the-night-watch",
  },
];

let carousel, carouselImages, prevBtn, nextBtn, learnMoreBtn;

let currentIndex = 0;
let carouselTextElements = [];
let splitTextInstances = [];
let isAnimating = false;
let slideOffset = 500;

function initCarousel() {
  carousel = document.querySelector(".carousel");
  carouselImages = document.querySelector(".carousel-images");
  prevBtn = document.querySelector(".prev-btn");
  nextBtn = document.querySelector(".next-btn");
  learnMoreBtn = document.querySelector(".learn-more-btn");

  createCarouselTitles();
  createInitialSlide();
  bindCarouselControls();
  bindLearnMoreButton();
  setSlideOffset();

  window.addEventListener("resize", setSlideOffset);

  document.fonts.ready.then(() => {
    splitTitles();
    initFirstSlide();
  });
}

function setSlideOffset() {
  slideOffset = window.innerWidth < 1000 ? 100 : 500;
}

function createCarouselTitles() {
  carouselSlides.forEach((slide) => {
    const slideTitleContainer = document.createElement("div");
    slideTitleContainer.classList.add("slide-title-container");

    const slideTitle = document.createElement("h1");
    slideTitle.classList.add("title");
    slideTitle.textContent = slide.title;

    slideTitleContainer.appendChild(slideTitle);
    carousel.appendChild(slideTitleContainer);

    carouselTextElements.push(slideTitleContainer);
  });
}

function createInitialSlide() {
  const initialSlideImgContainer = document.createElement("div");
  initialSlideImgContainer.classList.add("img");

  const initialSlideImg = document.createElement("img");
  initialSlideImg.src = carouselSlides[0].image;

  initialSlideImgContainer.appendChild(initialSlideImg);
  carouselImages.appendChild(initialSlideImgContainer);
}

function splitTitles() {
  carouselTextElements.forEach((slide) => {
    const slideTitle = slide.querySelector(".title");
    const splitText = new SplitText(slideTitle, {
      type: "words",
      wordsClass: "word",
    });
    splitTextInstances.push(splitText);
  });
}

function bindCarouselControls() {
  nextBtn.addEventListener("click", () => {
    if (isAnimating) return;
    currentIndex = (currentIndex + 1) % carouselSlides.length;
    animateSlide("right");
  });

  prevBtn.addEventListener("click", () => {
    if (isAnimating) return;
    currentIndex =
      (currentIndex - 1 + carouselSlides.length) % carouselSlides.length;
    animateSlide("left");
  });
}

function bindLearnMoreButton() {
  learnMoreBtn.addEventListener("click", () => {
    const currentSlide = carouselSlides[currentIndex];
    window.location.href = `/pages/${currentSlide.slug}.html`;
  });
}

function initFirstSlide() {
  const initialSlideWords = carouselTextElements[0].querySelectorAll(".word");
  gsap.to(initialSlideWords, {
    filter: "blur(0px)",
    opacity: 1,
    duration: 2,
    ease: "power3.out",
  });
}

function updateActiveTextSlide() {
  gsap.killTweensOf(".word");

  carouselTextElements.forEach((slide, index) => {
    const words = slide.querySelectorAll(".word");

    if (index !== currentIndex) {
      gsap.to(words, {
        filter: "blur(75px)",
        opacity: 0,
        duration: 2.5,
        ease: "power1.out",
        overwrite: true,
      });
    }
  });

  const currentWords =
    carouselTextElements[currentIndex].querySelectorAll(".word");
  gsap.to(currentWords, {
    filter: "blur(0px)",
    opacity: 1,
    duration: 2,
    ease: "power3.out",
    overwrite: true,
    onComplete: () => {
      gsap.set(currentWords, {
        filter: "blur(0px)",
        opacity: 1,
      });
    },
  });
}

function animateSlide(direction) {
  if (isAnimating) return;
  isAnimating = true;

  setSlideOffset();

  const currentSlide = carouselImages.querySelector(".img:last-child");
  const currentSlideImage = currentSlide.querySelector("img");

  const newSlideImgContainer = document.createElement("div");
  newSlideImgContainer.classList.add("img");

  const newSlideImg = document.createElement("img");
  newSlideImg.src = carouselSlides[currentIndex].image;

  gsap.set(newSlideImg, {
    x: direction === "left" ? -slideOffset : slideOffset,
  });

  newSlideImgContainer.appendChild(newSlideImg);
  carouselImages.appendChild(newSlideImgContainer);

  gsap.to(currentSlideImage, {
    x: direction === "left" ? slideOffset : -slideOffset,
    duration: 1.5,
    ease: "hop",
  });

  gsap.fromTo(
    newSlideImgContainer,
    {
      clipPath:
        direction === "left"
          ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
          : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.5,
      ease: "hop",
      onComplete: () => {
        cleanupCarouselSlides();
        isAnimating = false;
      },
    }
  );

  gsap.to(newSlideImg, {
    x: 0,
    duration: 1.5,
    ease: "hop",
  });

  updateActiveTextSlide();
}

function cleanupCarouselSlides() {
  const imgElements = carouselImages.querySelectorAll(".img");
  if (imgElements.length > 1) {
    for (let i = 0; i < imgElements.length - 1; i++) {
      imgElements[i].remove();
    }
  }
}

function initScrollAnimations() {
  // Initialize Lenis smooth scroll
  initLenis();

  // Hero carousel parallax effect (subtle)
  heroParallax(".carousel", ".carousel-images img", { speed: 0.2 });

  // Fade up animations for section headings and text
  fadeUpOnScroll(".animate-fade-up", {
    start: "top 92%",
    stagger: 0.15,
    duration: 0.8,
    y: 35,
  });

  // Scale in animations for artwork cards
  scaleInOnScroll(".animate-scale-in", {
    start: "top 90%",
    stagger: 0.12,
    duration: 0.7,
    scale: 0.96,
  });

  // Parallax on about section image
  parallaxOnScroll(".about-image img", {
    start: "top bottom",
    end: "bottom top",
    speed: 0.15,
  });

  // Highlights section animations
  const highlightsTitle = document.querySelector(".highlights-title");
  if (highlightsTitle) {
    gsap.from(highlightsTitle, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "expo.out",
      scrollTrigger: {
        trigger: highlightsTitle,
        start: "top 92%",
        toggleActions: "play none none none",
      },
    });

    // Animate the border line under title
    gsap.fromTo(
      highlightsTitle,
      {
        backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.15) 0%)",
        backgroundPosition: "0 100%",
        backgroundSize: "0% 1px",
        backgroundRepeat: "no-repeat",
      },
      {
        backgroundSize: "100% 1px",
        duration: 1.2,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: highlightsTitle,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }

  // Highlight pieces stagger animation
  const highlightPieces = document.querySelectorAll(".highlight-piece");
  highlightPieces.forEach((piece, index) => {
    gsap.from(piece, {
      opacity: 0,
      y: 25,
      duration: 0.8,
      delay: index * 0.12,
      ease: "expo.out",
      scrollTrigger: {
        trigger: piece,
        start: "top 95%",
        toggleActions: "play none none none",
      },
    });

    // Animate h3 within each piece
    const h3 = piece.querySelector("h3");
    if (h3) {
      gsap.from(h3, {
        opacity: 0,
        x: -20,
        duration: 0.7,
        delay: index * 0.12 + 0.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: piece,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    }
  });

  // Nav fade on scroll
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const scrollProgress = self.progress;
      const nav = document.querySelector("nav");
      
      if (scrollProgress > 0.05) {
        gsap.to(nav, {
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(10px)",
          duration: 0.3,
        });
      } else {
        gsap.to(nav, {
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          duration: 0.3,
        });
      }
    },
  });

  // Carousel images parallax effect on scroll past
  const carouselSection = document.querySelector(".carousel");
  if (carouselSection) {
    gsap.to(".carousel-images", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: carouselSection,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initCarousel();
  initScrollAnimations();
});
