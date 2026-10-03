'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar toggle functionality for mobile
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// contact form: enable the button once the form is valid
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// contact form: open the visitor's email app with the message filled in
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const data = new FormData(form);
  const subject = "Portfolio message from " + data.get("fullname");
  const body = data.get("message") + "\n\n" + data.get("fullname") + " (" + data.get("email") + ")";
  window.location.href = "mailto:zaib.ali.uk@outlook.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
});

// page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}


// scroll reveal: soft fade/slide-in as elements enter the viewport
const revealSelectors = [
  ".about-text p", ".service-title", ".service-item",
  ".timeline .title-wrapper", ".timeline-item",
  ".skills-title", ".skills-list",
  ".mapbox", ".form-title", ".form"
];

const revealTargets = document.querySelectorAll(revealSelectors.join(","));

// stagger siblings a little (capped so long lists don't feel slow)
const siblingCount = new Map();
revealTargets.forEach(function (el) {
  const key = el.parentElement;
  const n = siblingCount.get(key) || 0;
  siblingCount.set(key, n + 1);
  el.classList.add("reveal");
  el.style.setProperty("--reveal-delay", Math.min(n, 5) * 70 + "ms");
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add("is-visible");
        revealObserver.unobserve(el);

        // once revealed, drop the helper classes so hover transitions are not delayed
        const done = function () {
          el.classList.remove("reveal", "is-visible");
          el.style.removeProperty("--reveal-delay");
        };
        el.addEventListener("transitionend", done, { once: true });
        setTimeout(done, 1500);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  revealTargets.forEach(function (el) { revealObserver.observe(el); });
} else {
  revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
}
