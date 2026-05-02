
/* ---- 1. WAIT FOR THE PAGE TO FULLY LOAD ---- */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- 2. MOBILE HAMBURGER MENU ---- */
  // When the hamburger icon is clicked, toggle the nav open/closed

  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    // Toggle .open class on both elements
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close the mobile menu when any nav link is clicked
  const allNavLinks = document.querySelectorAll('.nav-link');

  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  /* ---- 3. FADE-IN ON SCROLL (Intersection Observer) ---- */
  // When a .fade-in element enters the viewport, add .visible to trigger the CSS animation

  // Select all elements we want to animate
  const fadeElements = document.querySelectorAll('.fade-in');

  // IntersectionObserver watches elements and fires a callback when they enter/leave the screen
  const observer = new IntersectionObserver(

    function (entries) {
      entries.forEach(function (entry) {

        if (entry.isIntersecting) {
          // Element is on screen → play the fade-in animation
          entry.target.classList.add('visible');

          // Once animated, stop observing (so it doesn't re-animate on scroll back up)
          observer.unobserve(entry.target);
        }

      });
    },

    {
      threshold: 0.12,  // trigger when 12% of the element is visible
      rootMargin: '0px 0px -40px 0px' // small offset so animation starts a bit before the element hits the very bottom
    }

  );

  // Attach the observer to every fade-in element
  fadeElements.forEach(function (el) {
    observer.observe(el);
  });


  /* ---- 4. ACTIVE NAV LINK HIGHLIGHT ON SCROLL ---- */
  // As you scroll through sections, the matching nav link turns yellow

  const sections = document.querySelectorAll('section[id]'); // all sections with an id

  function highlightNav () {
    // Current scroll position (+ half viewport to trigger earlier)
    const scrollY = window.scrollY + window.innerHeight / 2;

    sections.forEach(function (section) {
      const sectionTop    = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId     = section.getAttribute('id');

      // Check if scroll position is inside this section
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {

        // Remove .active from all nav links
        allNavLinks.forEach(function (link) {
          link.classList.remove('active');
        });

        // Add .active to the matching nav link
        const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
        if (activeLink) {
          activeLink.classList.add('active');
        }

      }
    });
  }

  // Run on scroll and also once on load
  window.addEventListener('scroll', highlightNav);
  highlightNav();


  /* ---- 5. NAVBAR BACKGROUND ON SCROLL ---- */
  // Make the navbar slightly more opaque after scrolling down a bit

  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
      navbar.style.background = 'rgba(10, 10, 10, 0.92)';
    }
  });


  /* ---- 6. PROJECT CARD — STAGGERED REVEAL ---- */
  // Each card fades in one by one instead of all at once

  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(function (card, index) {
    // Add a small extra delay per card so they appear one after another
    card.style.transitionDelay = (index * 0.1) + 's';
  });


  /* ---- 7. SKILL TAG HOVER — RANDOM YELLOW PULSE ---- */
  // Skill tags get a subtle pulse animation on hover for extra flair

  const skillTags = document.querySelectorAll('.skill-tag');

  skillTags.forEach(function (tag) {
    tag.addEventListener('mouseenter', function () {
      tag.style.transform = 'translateY(-3px)';
    });
    tag.addEventListener('mouseleave', function () {
      tag.style.transform = 'translateY(0)';
    });
  });


  /* ---- 8. TYPING EFFECT ON HERO TAGLINE ---- */
  // Cycles through a list of roles, typing and deleting them one by one

  const taglineEl = document.querySelector('.hero-tagline');

  if (taglineEl) {
    const roles = [
      'Aspiring Full Stack Developer',
      'Frontend Enthusiast',
      'vibe coder',
    ];

    let roleIndex  = 0;  
    let charIndex  = 0;  
    let isDeleting = false;

    function typeEffect () {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        // --- TYPING: add one character ---
        taglineEl.textContent = currentRole.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
          // Finished typing → pause, then start deleting
          setTimeout(function () {
            isDeleting = true;
            typeEffect();
          }, 1500); // pause 1.5s before deleting
          return;
        }

      } else {
        // --- DELETING: remove one character ---
        taglineEl.textContent = currentRole.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          // Finished deleting → move to next role
          isDeleting = false;
          roleIndex  = (roleIndex + 1) % roles.length;
        }
      }

      // Speed: deleting is faster than typing
      const speed = isDeleting ? 30 : 90;
      setTimeout(typeEffect, speed);
    }

    // Start the typing effect after a short delay
    setTimeout(typeEffect, 1000);
  }


  /* ---- CONSOLE MESSAGE (just for fun) ---- */
  console.log('%c👋 Hey there, fellow developer!', 'color: #f5c518; font-size: 14px; font-weight: bold;');
  console.log('%cFeel free to explore the code.', 'color: #888; font-size: 12px;');

}); // end DOMContentLoaded


/* ---- ACTIVE NAV LINK STYLE ---- */
// This is a small CSS injection so active nav links stay yellow
// (avoids adding another <style> tag in the HTML)
const styleTag = document.createElement('style');
styleTag.textContent = `
  .nav-link.active {
    color: var(--yellow) !important;
  }
  .nav-link.active::after {
    width: 100% !important;
  }
  /* Smooth transition for skill-tag lift */
  .skill-tag {
    transition: transform 0.2s ease, border-color 0.25s ease,
                color 0.25s ease, background 0.25s ease;
  }
`;
document.head.appendChild(styleTag);
