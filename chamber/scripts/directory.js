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
        member.level === "gold"
          ? "badge--gold"
          : member.level === "silver"
          ? "badge--silver"
          : "badge--silver";
      const levelLabel =
        member.level.charAt(0).toUpperCase() + member.level.slice(1) + " Member";

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

gridViewBtn.addEventListener("click", () => {
  gridEl.classList.remove("directory--list");
});

listViewBtn.addEventListener("click", () => {
  gridEl.classList.add("directory--list");
});

initDirectory();