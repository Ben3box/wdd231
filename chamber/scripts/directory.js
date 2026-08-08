/* ============================================================
   directory.js
   Loads all chamber members from data/members.json and displays
   the full directory, with a grid/list view toggle.
   ============================================================ */

const MEMBERS_URL = "data/members.json";

const gridEl = document.getElementById("directoryGrid");
const statusEl = document.getElementById("directoryStatus");
const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function levelRank(level) {
  return { gold: 0, silver: 1, member: 2 }[level] ?? 3;
}

function renderDirectory(members) {
  gridEl.innerHTML = members
    .map((member) => {
      const badgeClass =
        member.level === "gold" ? "badge--gold" : "badge--silver";
        
      const levelLabel =
        member.level.charAt(0).toUpperCase() + member.level.slice(1) + " Member";

      const cleanWebsite = member.website
        ? member.website.replace(/^https?:\/\//, "")
        : "";

      return `
        <article class="card spotlight-card">
          <div class="spotlight-card__top">
            <img
              class="spotlight-card__logo"
              src="${member.logo}"
              alt="${member.name} logo"
              loading="lazy"
            >
            <div>
              <h2>${member.name}</h2>
              <span class="badge ${badgeClass}">${levelLabel}</span>
            </div>
          </div>
          <p>${member.description}</p>
          <div class="spotlight-card__meta">
            <span>${member.phone}</span>
            <span>${member.address}</span>
            <a href="${member.website}" target="_blank" rel="noopener">${cleanWebsite}</a>
          </div>
        </article>
      `;
    })
    .join("");

  // Attach safe image fallback listener without inline onerror HTML
  gridEl.querySelectorAll(".spotlight-card__logo").forEach((img) => {
    img.addEventListener("error", function () {
      const cardHeader = this.closest(".spotlight-card__top");
      const memberName = cardHeader ? cardHeader.querySelector("h2")?.textContent : "";
      
      const fallbackDiv = document.createElement("div");
      fallbackDiv.className = "spotlight-card__logo";
      fallbackDiv.textContent = initials(memberName || "CC");
      this.replaceWith(fallbackDiv);
    });
  });
}

async function initDirectory() {
  try {
    const response = await fetch(MEMBERS_URL);
    if (!response.ok) {
      throw new Error(`Members request failed: ${response.status}`);
    }
    const members = await response.json();
    members.sort(
      (a, b) => levelRank(a.level) - levelRank(b.level) || a.name.localeCompare(b.name)
    );

    renderDirectory(members);
    statusEl.textContent = `${members.length} members currently listed.`;
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Could not load the member directory right now.";
  }
}

// Toggle View Logic & Active States
if (gridViewBtn && listViewBtn) {
  gridViewBtn.addEventListener("click", () => {
    gridEl.classList.remove("directory--list");
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
    gridViewBtn.setAttribute("aria-pressed", "true");
    listViewBtn.setAttribute("aria-pressed", "false");
  });

  listViewBtn.addEventListener("click", () => {
    gridEl.classList.add("directory--list");
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
    listViewBtn.setAttribute("aria-pressed", "true");
    gridViewBtn.setAttribute("aria-pressed", "false");
  });
}

// Year update for Footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

initDirectory();