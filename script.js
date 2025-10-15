document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS library for scroll animations
    AOS.init({
        duration: 1200,     // animations will take 1200ms
        once: true,         // whether animation should happen only once - while scrolling down
        mirror: false       // whether elements should animate out while scrolling past them
    });

    // Initialize Swiper.js for the tools carousel
    const swiper = new Swiper('.tools-carousel', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        autoplay: {
            delay: 5000, // Autoplay slides every 5 seconds
            disableOnInteraction: false, // Continue autoplay after user interaction
        },
        effect: 'coverflow', // More engaging visual effect
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // when window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 50,
            }
        },
        // Callback for AOS re-initialization after slide changes
        on: {
            slideChangeTransitionEnd: function () {
                AOS.refresh(); 
            }
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Handle active class for navigation
            document.querySelectorAll('.main-nav ul li a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            // Scroll to section
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back to Top button functionality
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Highlight active navigation link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjusted offset for better active state detection
            if (scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // --- Language Toggle Functionality ---
    const languageToggle = document.getElementById('languageToggle');
    let currentLang = localStorage.getItem('sagatools_lang') || 'en'; // Default to English

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        // Update text content for all data-en/data-ar elements
        document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
            if (lang === 'ar' && element.dataset.ar) {
                element.textContent = element.dataset.ar;
            } else if (lang === 'en' && element.dataset.en) {
                element.textContent = element.dataset.en;
            }
        });

        // Update button text explicitly
        languageToggle.innerHTML = lang === 'en' ? '<i class="fas fa-language"></i> عربي' : '<i class="fas fa-language"></i> English';

        // Update meta description and title
        const metaDescription = document.querySelector('meta[name="description"]');
        if (lang === 'ar') {
            metaDescription.setAttribute('content', 'SAGATools.AI تقدم أدوات ذكاء اصطناعي وأدوات ويب سريعة، مجانية وذكية في مكان واحد قوي. وصول فوري إلى تنزيل فيديوهات تيك توك، مزيل الخلفيات، تحويل النص إلى كلام، أدوات PDF، ومولد الصور بالذكاء الاصطناعي.');
            document.title = 'SAGATools.AI - استكشف أذكى الأدوات أونلاين مجانًا';
            document.querySelector('meta[property="og:locale"]').setAttribute('content', 'ar_AR');
            document.querySelector('meta[property="og:title"]').setAttribute('content', 'SAGATools.AI - أدوات AI وويب مجانية وقوية');
            document.querySelector('meta[property="og:description"]').setAttribute('content', 'أدوات ذكاء اصطناعي وويب سريعة، مجانية وذكية في مكان واحد قوي. وصول فوري لكل ما تحتاجه!');

        } else {
            metaDescription.setAttribute('content', 'SAGATools.AI offers fast, free, and smart AI & online tools in one powerful hub. Instantly access TikTok Video Downloader, Background Remover, Text-to-Speech, PDF Tools, and AI Image Generator.');
            document.title = 'SAGATools.AI - Explore the Smartest Online Tools for Free';
            document.querySelector('meta[property="og:locale"]').setAttribute('content', 'en_US');
            document.querySelector('meta[property="og:title"]').setAttribute('content', 'SAGATools.AI - Free & Powerful AI & Web Tools');
            document.querySelector('meta[property="og:description"]').setAttribute('content', 'Fast, free, and smart AI & online tools in one powerful hub. Instant access to everything you need!');
        }

        localStorage.setItem('sagatools_lang', lang);
        currentLang = lang; // Update currentLang variable

        // Re-initialize AOS if needed after language change affecting layout
        AOS.refreshHard();
    }

    languageToggle.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    });

    // Set initial language on load
    setLanguage(currentLang);


    // --- Theme Toggle Functionality ---
    const themeToggle = document.getElementById('themeToggle');
    let currentTheme = localStorage.getItem('sagatools_theme') || 'dark'; // Default to dark mode

    function setTheme(theme) {
        if (theme === 'light') {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
        }
        localStorage.setItem('sagatools_theme', theme);
        currentTheme = theme; // Update currentTheme variable
    }

    themeToggle.addEventListener('click', () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Set initial theme on load
    setTheme(currentTheme);

    // Initial check for current theme to set the right icon (if not handled by setTheme)
    if (currentTheme === 'light') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Add SVG gradients directly to body for icons to use
    // This allows dynamic gradient colors based on theme.
    const svgGradients = `
        <svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
            <defs>
                <linearGradient id="gradientNeon" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:var(--accent-blue);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:var(--accent-purple);stop-opacity:1" />
                </linearGradient>
                <linearGradient id="gradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#4a90e2;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8e44ad;stop-opacity:1" />
                </linearGradient>
            </defs>
        </svg>
    `;
    document.body.insertAdjacentHTML('beforeend', svgGradients);
});