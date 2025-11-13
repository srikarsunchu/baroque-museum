import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  initLenis,
  fadeUpOnScroll,
  scaleInOnScroll,
  parallaxOnScroll,
  staggerReveal,
  heroParallax,
} from "./scroll-animations.js";

gsap.registerPlugin(SplitText, ScrollTrigger);

/**
 * Initialize scroll animations for detail pages
 */
export function initDetailPageAnimations() {
  // Initialize Lenis smooth scroll
  initLenis();

  // Hero section animations
  animateHeroSection();

  // Content section animations
  animateContentSections();

  // Typography animations
  animateTypography();

  // Nav background on scroll
  animateNav();
}

/**
 * Animate hero section
 */
function animateHeroSection() {
  const heroImage = document.querySelector(".hero-image");
  const heroTitle = document.querySelector(".hero-title");
  const artworkDetails = document.querySelector(".artwork-details");

  if (heroImage) {
    // Parallax effect on hero image (slower scroll)
    gsap.to(heroImage, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Fade in image on load
    gsap.from(heroImage, {
      opacity: 0,
      scale: 1.08,
      duration: 1.3,
      ease: "expo.out",
    });
  }

  if (heroTitle) {
    // Fade in and slide up hero title
    gsap.from(heroTitle, {
      opacity: 0,
      y: 40,
      duration: 1.0,
      delay: 0.2,
      ease: "expo.out",
    });

    // Split text animation for hero title h1
    const h1 = heroTitle.querySelector("h1");
    if (h1) {
      const split = new SplitText(h1, { type: "words", wordsClass: "word-reveal" });
      
      gsap.from(split.words, {
        opacity: 0,
        y: 15,
        rotateX: -40,
        stagger: 0.04,
        duration: 0.7,
        delay: 0.4,
        ease: "expo.out",
      });
    }
  }

  if (artworkDetails) {
    // Staggered reveal of artwork details
    const detailItems = artworkDetails.querySelectorAll("span");
    gsap.from(detailItems, {
      opacity: 0,
      x: -15,
      duration: 0.5,
      stagger: 0.08,
      delay: 0.6,
      ease: "expo.out",
    });
  }
}

/**
 * Animate content sections
 */
function animateContentSections() {
  // Section titles
  const sectionTitles = document.querySelectorAll(".section-title");
  sectionTitles.forEach((title) => {
    gsap.from(title, {
      opacity: 0,
      x: -25,
      duration: 0.8,
      ease: "expo.out",
      scrollTrigger: {
        trigger: title,
        start: "top 92%",
        toggleActions: "play none none none",
      },
    });

    // Animate border line
    const borderLine = document.createElement("span");
    borderLine.className = "title-line";
    borderLine.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: rgba(255, 255, 255, 0.15);
      transform-origin: left center;
      transform: scaleX(0);
    `;
    title.style.position = "relative";
    title.appendChild(borderLine);

    gsap.to(borderLine, {
      scaleX: 1,
      duration: 1.0,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: title,
        start: "top 92%",
        toggleActions: "play none none none",
      },
    });
  });

  // Paragraphs fade in
  const paragraphs = document.querySelectorAll(".section p, .section-content p");
  paragraphs.forEach((p, index) => {
    gsap.from(p, {
      opacity: 0,
      y: 15,
      duration: 0.7,
      delay: index * 0.06,
      ease: "expo.out",
      scrollTrigger: {
        trigger: p,
        start: "top 95%",
        toggleActions: "play none none none",
      },
    });
  });

  // Image figures scale in
  const imageFigures = document.querySelectorAll(".image-figure");
  imageFigures.forEach((figure) => {
    gsap.from(figure, {
      opacity: 0,
      scale: 0.96,
      duration: 0.8,
      ease: "expo.out",
      scrollTrigger: {
        trigger: figure,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    // Parallax on images inside figures
    const img = figure.querySelector("img");
    if (img) {
      gsap.to(img, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: figure,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  });

  // Pin section titles for two-col layouts
  const twoColSections = document.querySelectorAll(".section.two-col");
  twoColSections.forEach((section) => {
    const title = section.querySelector("h2");
    const content = section.querySelector(".section-content");
    
    if (title && content && window.innerWidth > 900) {
      ScrollTrigger.create({
        trigger: section,
        start: "top 20%",
        end: "bottom 80%",
        pin: title,
        pinSpacing: false,
      });
    }
  });

  // Back button animation
  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    gsap.from(backBtn, {
      opacity: 0,
      y: 15,
      duration: 0.7,
      ease: "expo.out",
      scrollTrigger: {
        trigger: backBtn,
        start: "top 95%",
        toggleActions: "play none none none",
      },
    });
  }
}

/**
 * Animate typography elements
 */
function animateTypography() {
  const h2Elements = document.querySelectorAll(".content-section h2:not(.section-title)");
  
  h2Elements.forEach((h2) => {
    const split = new SplitText(h2, { type: "words", wordsClass: "word-reveal" });
    
    gsap.from(split.words, {
      opacity: 0,
      y: 8,
      stagger: 0.04,
      duration: 0.5,
      ease: "expo.out",
      scrollTrigger: {
        trigger: h2,
        start: "top 92%",
        toggleActions: "play none none none",
      },
    });
  });
}

/**
 * Animate navigation
 */
function animateNav() {
  const nav = document.querySelector("nav");
  
  if (nav) {
    // Initial state
    gsap.set(nav, {
      backgroundColor: "transparent",
    });

    // Change on scroll
    ScrollTrigger.create({
      start: 100,
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1 && window.scrollY > 100) {
          gsap.to(nav, {
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(10px)",
            duration: 0.3,
          });
        } else if (window.scrollY < 100) {
          gsap.to(nav, {
            backgroundColor: "transparent",
            backdropFilter: "blur(0px)",
            duration: 0.3,
          });
        }
      },
    });
  }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", initDetailPageAnimations);

