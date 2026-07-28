/* ============================================================
   spotlights.js
   Loads chamber members from data/members.json, filters to
   Gold and Silver level members, and displays 2-3 at random
   on every page load.
   ============================================================ */

const MEMBERS_URL = "data/members.json";
const MIN_SPOTLIGHTS = 2;
const MAX_SPOTLIGHTS = 3;

const gridEl = document.getElementById("spotlightGrid");
const statusEl = document.getElementById("spotlightStatus");

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickSpotlightCount() {
  return Math.random() < 0.5 ? MIN_SPOTLIGHTS : MAX_SPOTLIGHTS;
}

function renderSpotlights(members) {
  gridEl.innerHTML = members
    .map((member) => {
      const badgeClass = member.level === "gold" ? "badge--gold" : "badge--silver";
      const levelLabel = member.level === "gold" ? "Gold Member" : "Silver Member";

      return `
        <article class="card spotlight-card">
          <div class="spotlight-card__top">
            <img
              class="spotlight-card__logo"
              src="${member.logo}"
              alt="${member.name} logo"
              onerror="this.onerror=null; this.replaceWith(Object.assign(document.createElement('div'), {className:'spotlight-card__logo', textContent:'${initials(member.name)}'}));"
            >
            <div>
              <h3>${member.name}</h3>
              <span class="badge ${badgeClass}">${levelLabel}</span>
            </div>
          </div>
          <p>${member.description}</p>
          <div class="spotlight-card__meta">
            <span>${member.phone}</span>
            <span>${member.address}</span>
            <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace(/^https?:\/\//, "")}</a>
          </div>
        </article>
      `;
    })
    .join("");
}

async function initSpotlights() {
  try {
    const response = await fetch(MEMBERS_URL);
    if (!response.ok) {
      throw new Error(`Members request failed: ${response.status}`);
    }

    const members = await response.json();
    const eligible = members.filter(
      (member) => member.level === "gold" || member.level === "silver"
    );

    const count = Math.min(pickSpotlightCount(), eligible.length);
    const selected = shuffle(eligible).slice(0, count);

    renderSpotlights(selected);
    statusEl.textContent = "";
  } catch (error) {
    console.error(error);
    statusEl.textContent =
      "Could not load member spotlights right now. Please try again later.";
  }
}

initSpotlights();