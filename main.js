import "./style.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import barba from "@barba/core";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Select all the image containers
const imgContainers = document.querySelectorAll(".stars-img");

// Create the animation for each image container
imgContainers.forEach((container, index) => {
  gsap.to(container, {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top bottom", // Animation starts when the top of the container reaches the bottom of the viewport
      end: "bottom top", // Animation ends when the bottom of the container reaches the top of the viewport
      scrub: true, // Enables smooth scrubbing
      toggleActions: "play none none reverse", // Play animation on scroll down, reverse on scroll up
    },
  });
});
