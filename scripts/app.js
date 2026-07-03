// Navigation logic
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const primaryNav = document.getElementById("primary-nav");

    if (menuToggle && primaryNav) {
        menuToggle.addEventListener("click", () => {
            primaryNav.classList.toggle("open");
            
            // Adjust the layout visualization symbol cleanly 
            if (primaryNav.classList.contains("open")) {
                menuToggle.textContent = "✕";
            } else {
                menuToggle.textContent = "☰";
            }
        });
    }
});