/* ==========================================================
   আপ্যায়ন Catering & Events — Vanilla JS
   Handles: mobile menu, sticky navbar shadow, scroll fade-up
   animation, and the static booking form.
   ========================================================== */

(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var toggleBtn = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var iconOpen = document.getElementById("icon-open");
  var iconClose = document.getElementById("icon-close");

  function closeMenu() {
    mobileMenu.style.maxHeight = "0px";
    toggleBtn.setAttribute("aria-expanded", "false");
    iconOpen.classList.remove("hidden");
    iconClose.classList.add("hidden");
  }

  function openMenu() {
    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
    toggleBtn.setAttribute("aria-expanded", "true");
    iconOpen.classList.add("hidden");
    iconClose.classList.remove("hidden");
  }

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", function () {
      var isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ---------- Sticky navbar shadow on scroll ---------- */
  var navbar = document.getElementById("navbar");
  function updateNavbarShadow() {
    if (window.scrollY > 8) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", updateNavbarShadow, { passive: true });
  updateNavbarShadow();

  /* ---------- Fade-up on scroll ---------- */
  var fadeEls = document.querySelectorAll(".fade-up");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    fadeEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Booking form (static — no real submission) ---------- */
  var form = document.getElementById("booking-form");
  var successMsg = document.getElementById("form-success");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      successMsg.textContent =
        "ধন্যবাদ! আপনার বুকিং অনুরোধ পাওয়া গেছে। আমরা শীঘ্রই যোগাযোগ করব। (এটি একটি ডেমো ফর্ম — সরাসরি ডেটা পাঠানো হয় না)";
      successMsg.classList.remove("hidden");
      form.reset();
      successMsg.focus && successMsg.focus();
    });
  }

  /* ---------- Smooth scroll offset for sticky header (anchor links) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = link.getAttribute("href");
      if (targetId.length <= 1) return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var headerOffset = window.innerWidth >= 1024 ? 84 : 68;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: top, behavior: prefersReducedMotion ? "auto" : "smooth" });
      history.pushState(null, "", targetId);
    });
  });
})();
