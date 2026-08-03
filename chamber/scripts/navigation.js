/* ============================================================
   navigation.js
   Toggles the mobile navigation menu used across the chamber
   site (navToggleBtn / mainNav pattern from styles.css).
   Safe to include on every page: it no-ops if the elements
   aren't present.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("navToggleBtn");
  const nav = document.getElementById("mainNav");

  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu when a link is chosen (useful on small screens)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
});
