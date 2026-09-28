// Sobre Nosotros JavaScript - Agujas Acupuntura

// Scroll Reveal Animation Logic
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

// Logic for Dynamic Badges
const badgeOptions = [
    { icon: 'school', title: '10+', text: 'Años Transformando' },
    { icon: 'verified', title: '100%', text: 'Calidad Humana' },
    { icon: 'public', title: 'Líder', text: 'Presencia Nacional' },
    { icon: 'favorite', title: 'Pro', text: 'Cuidado Integral' }
];

let currentIdx = 0;
const boxes = [document.getElementById('dynamicBox1'), document.getElementById('dynamicBox2')].filter(Boolean);
const icons = [document.getElementById('dynamicIcon1'), document.getElementById('dynamicIcon2')].filter(Boolean);
const titles = [document.getElementById('dynamicTitle1'), document.getElementById('dynamicTitle2')].filter(Boolean);
const texts = [document.getElementById('dynamicText1'), document.getElementById('dynamicText2')].filter(Boolean);

if (boxes.length > 0) {
    setInterval(() => {
        // Fade out
        boxes.forEach((box) => {
            box.style.opacity = '0';
            box.style.transform = 'translateY(10px) rotate(2deg)';
        });

        setTimeout(() => {
            currentIdx = (currentIdx + 1) % badgeOptions.length;
            const opt = badgeOptions[currentIdx];

            icons.forEach((icon) => { icon.textContent = opt.icon; });
            titles.forEach((title) => { title.textContent = opt.title; });
            texts.forEach((text) => { text.textContent = opt.text; });

            // Fade in
            boxes.forEach((box) => {
                box.style.opacity = '1';
                box.style.transform = 'translateY(0) rotate(0deg)';
            });
        }, 500);
    }, 6000);
}

// Back button handler
const btnBackNav = document.getElementById("btnBackNav");
if (btnBackNav) {
    btnBackNav.addEventListener("click", () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "https://www.agujasacupunturaperu.com/demox";
        }
    });
}
