document.addEventListener("DOMContentLoaded", () => {
  // Extract URL parameters passed from join.html (GET method)
  const currentUrl = window.location.href;
  const urlParams = new URL(currentUrl).searchParams;

  // Retrieve individual values matching field 'name' attributes
  const fname = urlParams.get("fname");
  const lname = urlParams.get("lname");
  const orgtitle = urlParams.get("orgtitle");
  const email = urlParams.get("email");
  const phone = urlParams.get("phone");
  const orgname = urlParams.get("orgname");
  const membershipLevel = urlParams.get("membershipLevel");
  const timestamp = urlParams.get("timestamp");

  // DOM elements
  const submittedDateEl = document.getElementById("submittedDate");
  const summaryNameEl = document.getElementById("summaryName");
  const summaryTitleEl = document.getElementById("summaryTitle");
  const summaryEmailEl = document.getElementById("summaryEmail");
  const summaryPhoneEl = document.getElementById("summaryPhone");
  const summaryOrgEl = document.getElementById("summaryOrg");
  const summaryLevelEl = document.getElementById("summaryLevel");

  // Helper function to map membership level code to readable text
  function formatMembershipLevel(levelCode) {
    switch (levelCode) {
      case "np":
        return "NP Membership (Non-Profit)";
      case "bronze":
        return "Bronze Membership";
      case "silver":
        return "Silver Membership";
      case "gold":
        return "Gold Membership";
      default:
        return levelCode || "Not Selected";
    }
  }

  // Helper function to format ISO timestamp into a readable string
  function formatDate(isoString) {
    if (!isoString) return "N/A";
    const dateObj = new Date(isoString);
    if (isNaN(dateObj.getTime())) return isoString;
    return dateObj.toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short"
    });
  }

  // Populate HTML elements if required fields exist
  if (fname && lname && email && phone && orgname) {
    if (submittedDateEl) submittedDateEl.textContent = formatDate(timestamp);
    if (summaryNameEl) summaryNameEl.textContent = `${fname} ${lname}`;
    if (summaryTitleEl) summaryTitleEl.textContent = orgtitle ? orgtitle : "N/A";
    if (summaryEmailEl) summaryEmailEl.textContent = email;
    if (summaryPhoneEl) summaryPhoneEl.textContent = phone;
    if (summaryOrgEl) summaryOrgEl.textContent = orgname;
    if (summaryLevelEl) summaryLevelEl.textContent = formatMembershipLevel(membershipLevel);
  } else {
    // Fallback display if accessed without form data
    if (submittedDateEl) submittedDateEl.textContent = "N/A";
    if (summaryNameEl) summaryNameEl.textContent = "No active application data found.";
  }
});