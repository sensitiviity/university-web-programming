import { BREAKPOINTS } from "./breakpoints.js";
const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");
if (!sidebar || !menuButton) {
    console.warn("Елементи не знайдені");
}
else {
    const mqlMobile = window.matchMedia(BREAKPOINTS.mobile);
    const mqlTablet = window.matchMedia(BREAKPOINTS.tablet);
    const mqlDesktop = window.matchMedia(BREAKPOINTS.desktop);
    function applyResponsiveLayout() {
        if (mqlDesktop.matches || mqlTablet.matches) {
            sidebar.classList.remove("hidden");
            menuButton.classList.add("hidden");
            sidebar.classList.remove("open");
        }
        else if (mqlMobile.matches) {
            menuButton.classList.remove("hidden");
            sidebar.classList.remove("open");
        }
    }
    menuButton.addEventListener("click", () => {
        if (mqlMobile.matches) {
            sidebar.classList.toggle("open");
        }
    });
    applyResponsiveLayout();
    mqlDesktop.addEventListener("change", applyResponsiveLayout);
    mqlTablet.addEventListener("change", applyResponsiveLayout);
    mqlMobile.addEventListener("change", applyResponsiveLayout);
}
