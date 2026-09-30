if (window.self !== window.top) {
    document.body.classList.add("embed-mode");
}

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const navSpacer = document.getElementById("navSpacer");
const mobileMenuWrap = document.getElementById("mobileMenuWrap");

function updateNavSpacer() {
    if (!navbar || !navSpacer) return;
    if (document.body.classList.contains("embed-mode")) {
        navSpacer.style.height = "0px";
        return;
    }
    const navHeight = Math.ceil(navbar.getBoundingClientRect().height);
    navSpacer.style.height = `${navHeight + 6}px`;
}

// Menu toggle handler
menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!mobileMenuWrap) return;
    mobileMenuWrap.classList.toggle("hidden");
    const icon = menuToggle.querySelector(".material-symbols-outlined");
    if (icon) {
        icon.textContent = mobileMenuWrap.classList.contains("hidden") ? "menu" : "close";
    }
    updateNavSpacer();
});

// Close mobile menu on clicking any mobile nav link
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        if (!mobileMenuWrap) return;
        mobileMenuWrap.classList.add("hidden");
        const icon = menuToggle?.querySelector(".material-symbols-outlined");
        if (icon) icon.textContent = "menu";
        updateNavSpacer();
    });
});

// Close mobile menu on click outside
document.addEventListener("click", (e) => {
    if (mobileMenuWrap && !mobileMenuWrap.classList.contains("hidden")) {
        if (!navbar?.contains(e.target)) {
            mobileMenuWrap.classList.add("hidden");
            const icon = menuToggle?.querySelector(".material-symbols-outlined");
            if (icon) icon.textContent = "menu";
            updateNavSpacer();
        }
    }
});

// Window scroll shadow dynamic effect
window.addEventListener("scroll", () => {
    if (!navbar) return;
    if (window.scrollY > 15) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}, { passive: true });

updateNavSpacer();
window.addEventListener("load", updateNavSpacer);
window.addEventListener("resize", () => {
    updateNavSpacer();
    if (window.innerWidth >= 1024 && mobileMenuWrap) {
        mobileMenuWrap.classList.add("hidden");
        const icon = menuToggle?.querySelector(".material-symbols-outlined");
        if (icon) icon.textContent = "menu";
    }
});
