import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll Animation System
 * Integrates Lenis smooth scrolling with GSAP ScrollTrigger
 * for a digital museum experience
 */

let lenis;
let isReducedMotion = false;

/**
 * Initialize Lenis smooth scroll
 */
export function initLenis() {
  // Check for reduced motion preference
  isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  // Skip smooth scroll if user prefers reduced motion
  if (isReducedMotion) {
    console.log("Reduced motion enabled - using native scroll");
    return;
  }

  lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1.2,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    syncTouch: false,
    touchInertiaMultiplier: 35,
  });

  // Connect Lenis with ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/**
 * Scroll to top utility
 */
export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.5 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/**
 * Fade up animation on scroll
 */
export function fadeUpOnScroll(selector, options = {}) {
  const {
    start = "top 92%",
    end = "top 20%",
    scrub = false,
    stagger = 0.08,
    duration = 0.9,
    y = 30,
  } = options;

  const elements = gsap.utils.toArray(selector);

  elements.forEach((element, index) => {
    gsap.fromTo(element, 
      {
        opacity: 0,
        y: y,
      },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        ease: "power3.out",
        delay: stagger * index,
        scrollTrigger: {
          trigger: element,
          start: start,
          end: end,
          scrub: scrub,
          toggleActions: "play none none none",
        },
      }
    );
  });
}

/**
 * Scale in animation on scroll
 */
export function scaleInOnScroll(selector, options = {}) {
  const {
    start = "top 90%",
    end = "top 20%",
    scrub = false,
    stagger = 0.12,
    duration = 0.7,
    scale = 0.95,
  } = options;

  const elements = gsap.utils.toArray(selector);

  elements.forEach((element, index) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        scale: scale,
      },
      {
        opacity: 1,
        scale: 1,
        duration: duration,
        ease: "power2.out",
        delay: stagger * index,
        scrollTrigger: {
          trigger: element,
          start: start,
          end: end,
          scrub: scrub,
          toggleActions: "play none none none",
        },
      }
    );
  });
}

/**
 * Parallax effect on scroll
 */
export function parallaxOnScroll(selector, options = {}) {
  const {
    start = "top bottom",
    end = "bottom top",
    speed = 0.5,
  } = options;

  const elements = gsap.utils.toArray(selector);

  elements.forEach((element) => {
    const movement = -(element.offsetHeight * speed);
    
    gsap.to(element, {
      y: movement,
      ease: "none",
      scrollTrigger: {
        trigger: element.parentElement || element,
        start: start,
        end: end,
        scrub: true,
      },
    });
  });
}

/**
 * Pin section while scrolling
 */
export function pinSection(selector, options = {}) {
  const {
    start = "top top",
    end = "bottom bottom",
    pinSpacing = true,
  } = options;

  const elements = gsap.utils.toArray(selector);

  elements.forEach((element) => {
    ScrollTrigger.create({
      trigger: element,
      start: start,
      end: end,
      pin: true,
      pinSpacing: pinSpacing,
    });
  });
}

/**
 * Fade nav/footer based on scroll position
 */
export function fadeNavOnScroll(navSelector, options = {}) {
  const {
    fadeStart = 0,
    fadeEnd = 300,
  } = options;

  const nav = document.querySelector(navSelector);
  if (!nav) return;

  ScrollTrigger.create({
    start: fadeStart,
    end: fadeEnd,
    onUpdate: (self) => {
      gsap.to(nav, {
        opacity: 1 - self.progress * 0.3,
        duration: 0.3,
      });
    },
  });
}

/**
 * Staggered reveal for multiple elements
 */
export function staggerReveal(selector, options = {}) {
  const {
    start = "top 92%",
    stagger = 0.08,
    duration = 0.7,
    y = 20,
  } = options;

  const elements = gsap.utils.toArray(selector);

  gsap.from(elements, {
    opacity: 0,
    y: y,
    duration: duration,
    stagger: stagger,
    ease: "power2.out",
    scrollTrigger: {
      trigger: elements[0],
      start: start,
      toggleActions: "play none none none",
    },
  });
}

/**
 * Hero parallax effect (subtle)
 */
export function heroParallax(containerSelector, imageSelector, options = {}) {
  const {
    speed = 0.3,
  } = options;

  const container = document.querySelector(containerSelector);
  const image = document.querySelector(imageSelector);
  
  if (!container || !image) return;

  gsap.to(image, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

/**
 * Line draw animation
 */
export function lineDrawAnimation(selector, options = {}) {
  const {
    start = "top 90%",
    duration = 1.0,
  } = options;

  const elements = gsap.utils.toArray(selector);

  elements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        scaleX: 0,
        transformOrigin: "left center",
      },
      {
        scaleX: 1,
        duration: duration,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: element,
          start: start,
          toggleActions: "play none none none",
        },
      }
    );
  });
}

/**
 * Image reveal on scroll (clip-path)
 */
export function imageReveal(selector, options = {}) {
  const {
    start = "top 90%",
    duration = 1.0,
    direction = "left",
  } = options;

  const elements = gsap.utils.toArray(selector);
  
  const clipPaths = {
    left: {
      from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    right: {
      from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    top: {
      from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
  };

  elements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        clipPath: clipPaths[direction].from,
      },
      {
        clipPath: clipPaths[direction].to,
        duration: duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: start,
          toggleActions: "play none none none",
        },
      }
    );
  });
}

/**
 * Clean up all ScrollTrigger instances
 */
export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

/**
 * Refresh ScrollTrigger (useful after DOM changes)
 */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}

/**
 * Check if reduced motion is enabled
 */
export function checkReducedMotion() {
  return isReducedMotion;
}

/**
 * Utility: Disable scroll animations on mobile if needed
 */
export function isMobile() {
  return window.innerWidth < 768;
}

