        // Preloader Dismiss logic with Minimum Display Time (800ms)
        (function () {
            const startTime = Date.now();
            const minDisplayTime = 800; // Minimum time to show the preloader in milliseconds

            const hidePreloader = () => {
                const preloader = document.getElementById('preloader');
                if (preloader) {
                    const elapsedTime = Date.now() - startTime;
                    const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

                    setTimeout(() => {
                        preloader.style.opacity = '0';
                        preloader.style.visibility = 'hidden';
                        setTimeout(() => {
                            preloader.remove();
                        }, 400);
                    }, remainingTime);
                }
            };

            // Listen for window load
            if (document.readyState === 'complete') {
                hidePreloader();
            } else {
                window.addEventListener('load', hidePreloader);
            }

            // Safe fallback timeout (1.5 seconds)
            setTimeout(hidePreloader, 1500);

            // Handle preloader logo fallback if image fails to load
            const logo = document.getElementById('preloaderLogo');
            const fallback = document.getElementById('preloader-fallback-text');
            if (logo && fallback) {
                logo.addEventListener('error', () => {
                    logo.style.display = 'none';
                    fallback.style.display = 'block';
                });
            }
        })();
