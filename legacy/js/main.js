        if (window.self !== window.top) {
            document.body.classList.add("embed-mode");
        }

        const menuToggle = document.getElementById("menuToggle");
        const navbar = document.getElementById("navbar");
        const navSpacer = document.getElementById("navSpacer");
        const mobileMenuWrap = document.getElementById("mobileMenuWrap");
        const mobileCoursesToggle = document.getElementById("mobileCoursesToggle");
        const mobileCoursesMenu = document.getElementById("mobileCoursesMenu");
        const mobileCoursesIcon = document.getElementById("mobileCoursesIcon");
        const mobileMasterclassToggle = document.getElementById("mobileMasterclassToggle");
        const mobileMasterclassMenu = document.getElementById("mobileMasterclassMenu");
        const mobileMasterclassIcon = document.getElementById("mobileMasterclassIcon");
        const mobileSubtoggles = document.querySelectorAll(".mobile-subtoggle");

        const desktopCoursesWrap = document.getElementById("desktopCoursesWrap");
        const desktopCoursesToggle = document.getElementById("desktopCoursesToggle");
        const desktopCoursesMenu = document.getElementById("desktopCoursesMenu");
        const desktopCoursesChevron = document.getElementById("desktopCoursesChevron");
        const desktopMasterclassWrap = document.getElementById("desktopMasterclassWrap");
        const desktopMasterclassToggle = document.getElementById("desktopMasterclassToggle");
        const desktopMasterclassMenu = document.getElementById("desktopMasterclassMenu");
        const desktopMasterclassChevron = document.getElementById("desktopMasterclassChevron");
        const desktopPresencialesToggle = document.getElementById("desktopPresencialesToggle");
        const desktopOnlineToggle = document.getElementById("desktopOnlineToggle");
        const desktopSesionToggle = document.getElementById("desktopSesionToggle");
        const desktopSesionPanel = document.getElementById("desktopSesionPanel");
        const desktopPresencialesPanel = document.getElementById("desktopPresencialesPanel");
        const desktopOnlinePanel = document.getElementById("desktopOnlinePanel");

        function updateNavSpacer() {
            if (!navbar || !navSpacer) return;
            if (document.body.classList.contains("embed-mode")) {
                navSpacer.style.height = "0px";
                return;
            }
            const navHeight = Math.ceil(navbar.getBoundingClientRect().height);
            navSpacer.style.height = `${navHeight + 5}px`;
        }

        function closeDesktopPanels() {
            desktopPresencialesPanel?.classList.add("hidden");
            desktopOnlinePanel?.classList.add("hidden");
            desktopSesionPanel?.classList.add("hidden");
        }

        function closeDesktopCoursesMenu() {
            desktopCoursesMenu?.classList.add("hidden");
            if (desktopCoursesChevron) desktopCoursesChevron.style.transform = "rotate(0deg)";
            desktopCoursesToggle?.setAttribute("aria-expanded", "false");
            closeDesktopPanels();
        }

        function closeDesktopMasterclassMenu() {
            desktopMasterclassMenu?.classList.add("hidden");
            if (desktopMasterclassChevron) desktopMasterclassChevron.style.transform = "rotate(0deg)";
            desktopMasterclassToggle?.setAttribute("aria-expanded", "false");
        }

        function openDesktopCoursesMenu() {
            closeDesktopMasterclassMenu();
            desktopCoursesMenu?.classList.remove("hidden");
            if (desktopCoursesChevron) desktopCoursesChevron.style.transform = "rotate(180deg)";
            desktopCoursesToggle?.setAttribute("aria-expanded", "true");
        }

        function openDesktopMasterclassMenu() {
            closeDesktopCoursesMenu();
            desktopMasterclassMenu?.classList.remove("hidden");
            if (desktopMasterclassChevron) desktopMasterclassChevron.style.transform = "rotate(180deg)";
            desktopMasterclassToggle?.setAttribute("aria-expanded", "true");
        }

        menuToggle?.addEventListener("click", () => {
            mobileMenuWrap?.classList.toggle("hidden");
            const icon = menuToggle.querySelector(".material-symbols-outlined");
            if (icon) {
                icon.textContent = mobileMenuWrap.classList.contains("hidden") ? "menu" : "close";
            }
            updateNavSpacer();
        });

        mobileCoursesToggle?.addEventListener("click", () => {
            mobileCoursesMenu?.classList.toggle("hidden");
            if (mobileCoursesIcon) {
                mobileCoursesIcon.style.transform = mobileCoursesMenu.classList.contains("hidden") ? "rotate(0deg)" : "rotate(180deg)";
            }
        });

        mobileMasterclassToggle?.addEventListener("click", () => {
            mobileMasterclassMenu?.classList.toggle("hidden");
            if (mobileMasterclassIcon) {
                mobileMasterclassIcon.style.transform = mobileMasterclassMenu.classList.contains("hidden") ? "rotate(0deg)" : "rotate(180deg)";
            }
        });

        mobileSubtoggles.forEach((button) => {
            button.addEventListener("click", () => {
                const targetId = button.getAttribute("data-target");
                const panel = document.getElementById(targetId);
                const icon = button.querySelector(".material-symbols-outlined:last-child");
                panel?.classList.toggle("hidden");
                if (icon && panel) {
                    icon.textContent = panel.classList.contains("hidden") ? "add" : "remove";
                }
            });
        });

        document.querySelectorAll(".mobile-nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenuWrap?.classList.add("hidden");
                const icon = menuToggle?.querySelector(".material-symbols-outlined");
                if (icon) icon.textContent = "menu";
                updateNavSpacer();
            });
        });

        desktopCoursesToggle?.addEventListener("click", (e) => {
            e.stopPropagation();
            const isHidden = desktopCoursesMenu?.classList.contains("hidden");
            if (isHidden) openDesktopCoursesMenu();
            else closeDesktopCoursesMenu();
        });

        desktopMasterclassToggle?.addEventListener("click", (e) => {
            e.stopPropagation();
            const isHidden = desktopMasterclassMenu?.classList.contains("hidden");
            if (isHidden) openDesktopMasterclassMenu();
            else closeDesktopMasterclassMenu();
        });

        desktopPresencialesToggle?.addEventListener("click", (e) => {
            e.stopPropagation();
            desktopOnlinePanel?.classList.add("hidden");
            desktopSesionPanel?.classList.add("hidden");
            desktopPresencialesPanel?.classList.toggle("hidden");
        });

        desktopOnlineToggle?.addEventListener("click", (e) => {
            e.stopPropagation();
            desktopPresencialesPanel?.classList.add("hidden");
            desktopSesionPanel?.classList.add("hidden");
            desktopOnlinePanel?.classList.toggle("hidden");
        });

        desktopSesionToggle?.addEventListener("click", (e) => {
            e.stopPropagation();
            desktopPresencialesPanel?.classList.add("hidden");
            desktopOnlinePanel?.classList.add("hidden");
            desktopSesionPanel?.classList.toggle("hidden");
        });

        document.addEventListener("click", (e) => {
            if (desktopCoursesWrap && !desktopCoursesWrap.contains(e.target)) {
                closeDesktopCoursesMenu();
            }
            if (desktopMasterclassWrap && !desktopMasterclassWrap.contains(e.target)) {
                closeDesktopMasterclassMenu();
            }
        });

        // Window scroll, load, resize listeners for spacer and shadow
        window.addEventListener("scroll", () => {
            const container = navbar?.firstElementChild;
            if (!container) return;
            if (window.scrollY > 14) {
                container.classList.add("shadow-[0_16px_50px_rgba(15,23,42,.12)]");
            } else {
                container.classList.remove("shadow-[0_16px_50px_rgba(15,23,42,.12)]");
            }
        });

        updateNavSpacer();
        window.addEventListener("load", updateNavSpacer);
        window.addEventListener("resize", () => {
            updateNavSpacer();
            if (window.innerWidth >= 1024) {
                mobileMenuWrap?.classList.add("hidden");
                const icon = menuToggle?.querySelector(".material-symbols-outlined");
                if (icon) icon.textContent = "menu";
            } else {
                closeDesktopCoursesMenu();
            }
        });

        desktopCoursesMenu?.addEventListener("click", (e) => e.stopPropagation());
        desktopMasterclassMenu?.addEventListener("click", (e) => e.stopPropagation());
        desktopPresencialesPanel?.addEventListener("click", (e) => e.stopPropagation());
        desktopOnlinePanel?.addEventListener("click", (e) => e.stopPropagation());
        desktopSesionPanel?.addEventListener("click", (e) => e.stopPropagation());

        /* HERO */
        const heroTrack = document.getElementById("heroTrack");
        const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
        const heroPrevBtn = document.getElementById("heroPrevBtn");
        const heroNextBtn = document.getElementById("heroNextBtn");
        const heroDots = document.getElementById("heroDots");
        let heroIndex = 0;
        let heroAutoplay;

        heroSlides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.className = `h-2.5 w-2.5 rounded-full bg-white/45 transition-all duration-300 ${index === 0 ? "w-8 bg-[#f97316]" : ""}`;
            dot.setAttribute("aria-label", `Ir al slide ${index + 1}`);
            dot.addEventListener("click", () => {
                heroIndex = index;
                updateHero();
                restartHeroAutoplay();
            });
            heroDots?.appendChild(dot);
        });

        const getHeroDots = () => Array.from(heroDots?.querySelectorAll("button") || []);

        function animateHeroSlide() {
            const active = heroSlides[heroIndex];
            if (!active || typeof gsap === "undefined") return;

            const animItems = active.querySelectorAll(".hero-anim");
            const mainImage = active.querySelector(".hero-main-image");

            gsap.set(animItems, { opacity: 0, y: 14 });
            gsap.set(mainImage, { scale: 1.01, opacity: 1 });

            const tl = gsap.timeline();
            tl.to(mainImage, { scale: 1, duration: .9, ease: "power2.out" })
                .to(animItems, { opacity: 1, y: 0, duration: .36, stagger: .05, ease: "power3.out" }, .10);
        }

        function updateHero() {
            if (!heroTrack) return;
            heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;

            getHeroDots().forEach((dot, index) => {
                dot.className = `h-2.5 rounded-full transition-all duration-300 ${index === heroIndex ? "w-8 bg-[#f97316]" : "w-2.5 bg-white/45"}`;
            });

            animateHeroSlide();
        }

        function nextHero() {
            heroIndex = (heroIndex + 1) % heroSlides.length;
            updateHero();
        }

        function prevHero() {
            heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
            updateHero();
        }

        heroNextBtn?.addEventListener("click", () => {
            nextHero();
            restartHeroAutoplay();
        });

        heroPrevBtn?.addEventListener("click", () => {
            prevHero();
            restartHeroAutoplay();
        });

        function startHeroAutoplay() {
            clearInterval(heroAutoplay);
            heroAutoplay = setInterval(nextHero, 5000);
        }

        function restartHeroAutoplay() {
            clearInterval(heroAutoplay);
            startHeroAutoplay();
        }

        /* MOBILE SLIDERS */
        function isResponsiveSliderMode() {
            return window.innerWidth <= 768;
        }

        const mobileSliders = Array.from(document.querySelectorAll("[data-mobile-slider]")).map((root) => {
            const track = root.querySelector(".mobile-slider-track");
            const slides = Array.from(root.querySelectorAll(".mobile-slide"));
            const prev = root.querySelector(".mobile-slider-prev");
            const next = root.querySelector(".mobile-slider-next");

            return {
                root,
                track,
                slides,
                prev,
                next,
                index: 0,
                timer: null
            };
        });

        function updateMobileSlider(slider) {
            if (!slider.track) return;

            if (!isResponsiveSliderMode()) {
                slider.track.style.transform = "none";
                return;
            }

            slider.track.style.transform = `translateX(-${slider.index * 100}%)`;
        }

        function nextMobileSlide(slider) {
            slider.index = (slider.index + 1) % slider.slides.length;
            updateMobileSlider(slider);
        }

        function prevMobileSlide(slider) {
            slider.index = (slider.index - 1 + slider.slides.length) % slider.slides.length;
            updateMobileSlider(slider);
        }

        function startMobileSliderAutoplay(slider) {
            clearInterval(slider.timer);
            slider.timer = setInterval(() => {
                if (!isResponsiveSliderMode()) return;
                nextMobileSlide(slider);
            }, 5000);
        }

        function restartMobileSliderAutoplay(slider) {
            clearInterval(slider.timer);
            startMobileSliderAutoplay(slider);
        }

        mobileSliders.forEach((slider) => {
            slider.prev?.addEventListener("click", () => {
                prevMobileSlide(slider);
                restartMobileSliderAutoplay(slider);
            });

            slider.next?.addEventListener("click", () => {
                nextMobileSlide(slider);
                restartMobileSliderAutoplay(slider);
            });

            updateMobileSlider(slider);
            startMobileSliderAutoplay(slider);
        });

        /* REVEAL */
        const revealItems = document.querySelectorAll("[data-reveal]");
        if (typeof gsap !== "undefined" && "IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.fromTo(
                            entry.target,
                            { opacity: 0, y: 32 },
                            { opacity: 1, y: 0, duration: .75, ease: "power3.out" }
                        );
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: .16 });

            revealItems.forEach((item) => revealObserver.observe(item));
        }

        /* NAV (Moved to main navbar block) */

        if (typeof gsap !== "undefined") {
            gsap.from("#navbar > div", { y: -16, opacity: 0, duration: .55, ease: "power3.out" });
        }

        /* WHATSAPP: SOLO AL INTERACTUAR */
        const waWrap = document.getElementById("waWrap");
        const waBubble = document.getElementById("waBubble");
        const waBtn = document.getElementById("waBtn");
        const waClose = document.getElementById("waClose");

        function openWaBubble() {
            waBubble?.classList.add("show");
        }

        function closeWaBubble() {
            waBubble?.classList.remove("show");
        }

        function toggleWaBubble() {
            if (!waBubble) return;
            waBubble.classList.toggle("show");
        }

        waBtn?.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWaBubble();
        });

        waBtn?.addEventListener("mouseenter", () => {
            openWaBubble();
        });

        waBtn?.addEventListener("focus", () => {
            openWaBubble();
        });

        waClose?.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeWaBubble();
        });

        waBubble?.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        document.addEventListener("click", (e) => {
            if (waWrap && !waWrap.contains(e.target)) {
                closeWaBubble();
            }
        });

        const scrollTopBtn = document.getElementById("scrollTopBtn");

        function updateScrollTopButton() {
            scrollTopBtn?.classList.toggle("show", window.scrollY > 320);
        }

        scrollTopBtn?.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        /* INIT */
        updateScrollTopButton();
        updateHero();
        startHeroAutoplay();

        window.addEventListener("resize", () => {
            mobileSliders.forEach((slider) => {
                slider.index = Math.min(slider.index, slider.slides.length - 1);
                updateMobileSlider(slider);
            });
        });

        window.addEventListener("scroll", updateScrollTopButton, { passive: true });

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                clearInterval(heroAutoplay);
                mobileSliders.forEach((slider) => clearInterval(slider.timer));
            } else {
                startHeroAutoplay();
                mobileSliders.forEach((slider) => startMobileSliderAutoplay(slider));
            }
        });
