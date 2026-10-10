/* Shared by every page: header behaviour, mobile nav, scroll reveals, footer year. */
(function () {
  "use strict";

  var doc = document;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  doc.documentElement.classList.add("js");

  /* ---------- Header: transparent over the hero, solid once scrolled ---------- */
  var header = doc.querySelector(".site-header");
  var nav = doc.getElementById("primary-nav");
  var toggle = doc.querySelector(".nav-toggle");

  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 24); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setNav(open) {
    nav.classList.toggle("is-open", open);
    header.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.querySelector("use").setAttribute("href", open ? "#i-x" : "#i-menu");
  }
  toggle.addEventListener("click", function () {
    header.classList.add("nav-ready");
    setNav(!nav.classList.contains("is-open"));
  });
  // Close the mobile menu without animation when the screen grows to desktop size
  window.matchMedia("(min-width: 1180px)").addEventListener("change", function (e) {
    if (e.matches) { header.classList.remove("nav-ready"); setNav(false); }
  });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setNav(false); toggle.focus(); }
  });

  /* ---------- "Back to top" + logo links ----------
     #top is the header, which is position: fixed, so the browser won't scroll to it. Scroll the page instead. */
  doc.addEventListener("click", function (e) {
    var a = e.target.closest('a[href="#top"]');
    if (!a) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    // keep keyboard users in a sensible place: the logo link at the top of the page
    var brand = doc.querySelector(".brand");
    if (brand) brand.focus({ preventScroll: true });
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = Array.prototype.slice.call(doc.querySelectorAll(".reveal"));
  if (!reduceMotion && "IntersectionObserver" in window) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); revObs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    reveals.forEach(function (el) {
      // gentle stagger for siblings in the same grid
      var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = Math.min(idx, 4) * 60 + "ms";
      revObs.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  var year = doc.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
