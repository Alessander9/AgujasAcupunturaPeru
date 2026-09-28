const floatingWaWrap = document.getElementById("waWrap");
        const floatingWaBubble = document.getElementById("waBubble");
        const floatingWaBtn = document.getElementById("waBtn");
        const floatingWaClose = document.getElementById("waClose");
        const floatingScrollTopBtn = document.getElementById("scrollTopBtn");
        function openFloatingWaBubble() { floatingWaBubble?.classList.add("show"); }
        function closeFloatingWaBubble() { floatingWaBubble?.classList.remove("show"); }
        function toggleFloatingWaBubble() { if (!floatingWaBubble) return; floatingWaBubble.classList.toggle("show"); }
        floatingWaBtn?.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); toggleFloatingWaBubble(); });
        floatingWaBtn?.addEventListener("mouseenter", openFloatingWaBubble);
        floatingWaBtn?.addEventListener("focus", openFloatingWaBubble);
        floatingWaClose?.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); closeFloatingWaBubble(); });
        floatingWaBubble?.addEventListener("click", (e) => e.stopPropagation());
        document.addEventListener("click", (e) => { if (floatingWaWrap && !floatingWaWrap.contains(e.target)) closeFloatingWaBubble(); });
        function updateFloatingScrollTopButton() { if (!floatingScrollTopBtn) return; floatingScrollTopBtn.classList.toggle("show", window.scrollY > 320); }
        floatingScrollTopBtn?.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); });
        updateFloatingScrollTopButton();
        window.addEventListener("scroll", updateFloatingScrollTopButton, { passive: true });
