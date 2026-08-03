import { itemsOfInterest } from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Handle Visitor Message using localStorage ---
  const visitMessageEl = document.getElementById("visit-message");
  
  if (visitMessageEl) {
    const lastVisit = localStorage.getItem("lastVisitDate");
    const now = Date.now();
    const msInDay = 1000 * 60 * 60 * 24;

    if (!lastVisit) {
      visitMessageEl.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const timeDifference = now - parseInt(lastVisit, 10);
      const daysPassed = Math.floor(timeDifference / msInDay);

      if (daysPassed < 1) {
        visitMessageEl.textContent = "Back so soon! Awesome!";
      } else if (daysPassed === 1) {
        visitMessageEl.textContent = "You last visited 1 day ago.";
      } else {
        visitMessageEl.textContent = `You last visited ${daysPassed} days ago.`;
      }
    }

    // Update stored visit timestamp to current time
    localStorage.setItem("lastVisitDate", now.toString());
  }

  // --- 2. Dynamically Generate 8 Interest Cards ---
  const cardsContainer = document.getElementById("discover-grid");

  if (cardsContainer) {
    itemsOfInterest.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "discover-card";
      // Assign named grid area (area1, area2, ... area8)
      card.style.gridArea = `area${index + 1}`;

      card.innerHTML = `
        <h2>${item.title}</h2>
        <figure>
          <img src="${item.image}" alt="${item.alt}" width="300" height="200" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button type="button" class="learn-more-btn">Learn More</button>
      `;

      cardsContainer.appendChild(card);
    });
  }
});