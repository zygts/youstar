import "./style.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import barba from "@barba/core";
import Splitting from "splitting";
import "splitting/dist/splitting.css";

gsap.registerPlugin(ScrollTrigger);

// quotes
const results = Splitting({ target: ".stars-quote", by: "chars" });
results.forEach((splitResult) => {
  const chars = splitResult.chars;

  gsap.set(chars, {
    x: -10,
    opacity: 0,
  });
});

// Animate names and jobs
const rows = document.querySelectorAll(".stars-row");

rows.forEach((row, index) => {
  const name = row.querySelector(".stars-name");
  const job = row.querySelector(".stars-job");
  const isEven = index % 2 === 0;

  const startX = isEven ? -20 : 20;

  [name, job].forEach((element) => {
    gsap.set(element, {
      x: startX,
      opacity: 0,
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const preloader = document.getElementById("preloader");
    const app = document.getElementById("app");

    // Mostrar app un poco antes de que el preloader desaparezca por completo
    app.style.display = "block";

    preloader.classList.add("hidden");

    setTimeout(function () {
      preloader.style.display = "none";

      // Inicializar las animaciones después de mostrar el contenido
      initializeAnimations();
    }, 1000); // Esperar a que la animación termine
  }, 1500);
});

function initializeAnimations() {
  // image containers
  const imgContainers = document.querySelectorAll(".stars-img");

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

  // stars-row elements
  const starRows = document.querySelectorAll(".stars-row");
  starRows.forEach((row) => {
    gsap.fromTo(
      row,
      { "--pseudo-width": "0%" }, // Starting state
      {
        "--pseudo-width": "100%", // Ending state
        ease: "power2.inOut",
        duration: 2,
        scrollTrigger: {
          trigger: row,
          start: "top 90%",
        },
      }
    );
  });

  // quotes
  const results = Splitting({ target: ".stars-quote", by: "chars" });
  results.forEach((splitResult) => {
    const chars = splitResult.chars;

    gsap.fromTo(
      chars,
      {
        x: -10,
        opacity: 0,
      },
      {
        yPercent: 0,
        x: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.01,
        ease: "power2.out",
        scrollTrigger: {
          trigger: splitResult.el,
          start: "top 70%",
        },
      }
    );
  });

  // Animate names and jobs
  const rows = document.querySelectorAll(".stars-row");

  rows.forEach((row, index) => {
    const name = row.querySelector(".stars-name");
    const job = row.querySelector(".stars-job");
    const isEven = index % 2 === 0;

    const startX = isEven ? -20 : 20;

    [name, job].forEach((element) => {
      gsap.fromTo(
        element,
        {
          x: startX,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 70%",
          },
        }
      );
    });
  });
}
