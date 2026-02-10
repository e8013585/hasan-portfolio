// =========================================
// PORTFOLIO WEBSITE - MAIN JAVASCRIPT
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    var initFunctions = [
        ['Loader', initLoader],
        ['Cursor', initCursor],
        ['Theme', initTheme],
        ['Navigation', initNavigation],
        ['HeroAnimations', initHeroAnimations],
        ['ScrollAnimations', initScrollAnimations],
        ['ExperienceChart', initExperienceChart],
        ['MobileDetection', initMobileDetection],
        ['ProjectModal', initProjectModal],
        ['EnvoyGallery', initEnvoyGallery]
    ];

    for (var i = 0; i < initFunctions.length; i++) {
        try {
            initFunctions[i][1]();
        } catch (e) {
            console.error('Error in ' + initFunctions[i][0] + ':', e);
        }
    }

    // Hide broken images
    var allImages = document.querySelectorAll('img');
    for (var j = 0; j < allImages.length; j++) {
        allImages[j].addEventListener('error', function() {
            var parent = this.closest('.envoy-page-item, .envoy-cover-slide');
            if (parent) {
                parent.style.display = 'none';
            }
        });
    }
});

// =========================================
// LOADING SCREEN
// =========================================
function initLoader() {
    var loader = document.querySelector('.loader');
    if (!loader) return;

    var hasHidden = false;

    function hideLoader() {
        if (hasHidden) return;
        hasHidden = true;

        loader.classList.add('hidden');
        loader.style.pointerEvents = 'none';
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';

        document.body.style.overflow = '';

        setTimeout(function() {
            loader.style.display = 'none';
            if (!document.querySelector('.nav-menu.active') &&
                !document.querySelector('.modal.active') &&
                (!document.getElementById('image-modal') ||
                 document.getElementById('image-modal').style.display !== 'block')) {
                document.body.style.overflow = '';
            }
        }, 600);
    }

    setTimeout(hideLoader, 3500);

    if (document.readyState === 'complete') {
        setTimeout(hideLoader, 1800);
    } else {
        window.addEventListener('load', function() {
            setTimeout(hideLoader, 1800);
        });
    }

    var interactionEvents = ['click', 'touchstart', 'keydown', 'scroll'];
    function onUserInteraction() {
        setTimeout(function() {
            if (!hasHidden) {
                hideLoader();
            }
        }, 500);

        for (var i = 0; i < interactionEvents.length; i++) {
            document.removeEventListener(interactionEvents[i], onUserInteraction);
        }
    }

    setTimeout(function() {
        if (!hasHidden) {
            for (var i = 0; i < interactionEvents.length; i++) {
                document.addEventListener(interactionEvents[i], onUserInteraction, { passive: true });
            }
        }
    }, 2000);
}

// =========================================
// CUSTOM CURSOR
// =========================================
function initCursor() {
    var cursor = document.querySelector('.cursor-follower');
    if (!cursor || window.innerWidth < 768) return;

    var mouseX = 0, mouseY = 0;
    var cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('active');
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    var hoverElements = document.querySelectorAll('a, button, .contact-card, .skill-tag, .nav-link');
    for (var i = 0; i < hoverElements.length; i++) {
        hoverElements[i].addEventListener('mouseenter', function() { cursor.classList.add('hover'); });
        hoverElements[i].addEventListener('mouseleave', function() { cursor.classList.remove('hover'); });
    }

    document.addEventListener('mouseleave', function() { cursor.classList.remove('active'); });
}

// =========================================
// THEME TOGGLE
// =========================================
function initTheme() {
    var themeToggle = document.getElementById('theme-toggle');
    var brandsImage = document.getElementById('brands-image');

    var savedTheme = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    var currentTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light');
    applyTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            var current = document.documentElement.getAttribute('data-theme');
            var newTheme = current === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);

            if (window.experienceChart) {
                setTimeout(updateChartColors, 100);
            }
        });
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);

        if (themeToggle) {
            var moonIcon = themeToggle.querySelector('.fa-moon');
            var sunIcon = themeToggle.querySelector('.fa-sun');
            if (moonIcon && sunIcon) {
                if (theme === 'dark') {
                    moonIcon.style.display = 'none';
                    sunIcon.style.display = 'inline-block';
                } else {
                    moonIcon.style.display = 'inline-block';
                    sunIcon.style.display = 'none';
                }
            }
        }

        if (brandsImage) {
            brandsImage.src = theme === 'dark'
                ? 'assets/brandsthatiworkedfordark.png'
                : 'assets/brandsthatiworkedforlight.png';
        }
    }

    prefersDark.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// =========================================
// NAVIGATION
// =========================================
function initNavigation() {
    var navbar = document.querySelector('.navbar');
    var hamburger = document.querySelector('.hamburger');
    var navMenu = document.querySelector('.nav-menu');
    var navLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        var scrollY = window.scrollY || window.pageYOffset;

        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        for (var s = 0; s < sections.length; s++) {
            var section = sections[s];
            var sectionTop = section.offsetTop - 100;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                for (var l = 0; l < navLinks.length; l++) {
                    navLinks[l].classList.remove('active');
                    if (navLinks[l].getAttribute('href') === '#' + sectionId) {
                        navLinks[l].classList.add('active');
                    }
                }
            }
        }
    });

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            if (navMenu) navMenu.classList.toggle('active');
            document.body.style.overflow = (navMenu && navMenu.classList.contains('active')) ? 'hidden' : '';
        });
    }

    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function() {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var a = 0; a < anchors.length; a++) {
        anchors[a].addEventListener('click', function(e) {
            var href = this.getAttribute('href');

            if (!href || href === '#' || href.length < 2) {
                e.preventDefault();
                return;
            }

            try {
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            } catch (err) {
                e.preventDefault();
            }
        });
    }
}

// =========================================
// HERO ANIMATIONS
// =========================================
function initHeroAnimations() {
    var roleText = document.querySelector('.role-text');

    if (roleText) {
        var roles = ['Creative Director', 'Art Director', 'Graphic Designer', 'Visual Storyteller', 'Brand Designer'];
        var roleIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var typeSpeed = 100;

        function typeWriter() {
            var currentRole = roles[roleIndex];

            if (isDeleting) {
                roleText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                roleText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        setTimeout(typeWriter, 2500);
    }

    var statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'));
        if (!target) return;

        var duration = 2000;
        var startTime = performance.now();

        function updateCounter(currentTime) {
            var elapsed = currentTime - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var easeOutQuart = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.floor(target * easeOutQuart);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    var heroStats = document.querySelector('.hero-stats');
    if (heroStats && statNumbers.length > 0) {
        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    for (var j = 0; j < statNumbers.length; j++) {
                        animateCounter(statNumbers[j]);
                    }
                    observer.unobserve(entries[i].target);
                }
            }
        }, { threshold: 0.5 });

        observer.observe(heroStats);
    }
}

// =========================================
// SCROLL ANIMATIONS
// =========================================
function initScrollAnimations() {
    var revealElements = document.querySelectorAll(
        '.section-header, .about-image-wrapper, .about-content, ' +
        '.chart-wrapper, .featured-project, .brands-image-wrapper, ' +
        '.contact-card, .skill-category, .envoy-intro, .envoy-covers-section, ' +
        '.envoy-pages-section, .envoy-detail-card, .envoy-cta'
    );

    var revealObserver = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                entries[i].target.classList.add('reveal', 'active');
                revealObserver.unobserve(entries[i].target);
            }
        }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    for (var i = 0; i < revealElements.length; i++) {
        revealElements[i].classList.add('reveal');
        revealObserver.observe(revealElements[i]);
    }

    var projectItems = document.querySelectorAll('.project-item');

    var projectObserver = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                var visibleCount = document.querySelectorAll('.project-item.visible').length;
                var delay = Math.min(visibleCount * 50, 500);
                (function(target) {
                    setTimeout(function() {
                        target.classList.add('visible');
                    }, delay);
                })(entries[i].target);
                projectObserver.unobserve(entries[i].target);
            }
        }
    }, { threshold: 0.1 });

    for (var j = 0; j < projectItems.length; j++) {
        projectObserver.observe(projectItems[j]);
    }
}

// =========================================
// EXPERIENCE CHART
// =========================================
function initExperienceChart() {
    var ctx = document.getElementById('experienceChart');
    if (!ctx) return;

    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded yet. Retrying in 1 second...');
        var retryCount = 0;
        var maxRetries = 10;
        var retryInterval = setInterval(function() {
            retryCount++;
            if (typeof Chart !== 'undefined') {
                clearInterval(retryInterval);
                createChart(ctx);
            } else if (retryCount >= maxRetries) {
                clearInterval(retryInterval);
                console.error('Chart.js failed to load after ' + maxRetries + ' retries.');
            }
        }, 1000);
        return;
    }

    createChart(ctx);
}

function createChart(ctx) {
    function getChartColors() {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return {
            textColor: isDark ? '#f1f5f9' : '#333',
            gridColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            tickColor: isDark ? '#f1f5f9' : '#333',
            tooltipBg: isDark ? '#1e293b' : '#ffffff'
        };
    }

    var colors = getChartColors();

    window.experienceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Adobe Illustrator', 'Adobe Photoshop', 'Adobe Acrobat',
                'Adobe InDesign', 'Adobe Creative Suite', 'Adobe Bridge',
                'Adobe Creative Cloud', 'Adobe Media Encoder', 'Microsoft Word',
                'Microsoft PowerPoint', 'QuarkXPress', 'Adobe Premiere Pro',
                'Adobe After Effects', 'Microsoft Excel', 'Adobe Audition', 'Corel Painter'
            ],
            datasets: [{
                label: 'Years of Experience',
                data: [37, 35, 31, 25, 23, 17, 14, 11, 10, 9, 8, 7, 6, 5, 4, 3],
                backgroundColor: [
                    'rgba(255,154,0,0.85)', 'rgba(49,168,255,0.85)', 'rgba(255,0,0,0.85)',
                    'rgba(255,51,102,0.85)', 'rgba(120,120,120,0.85)', 'rgba(50,50,50,0.85)',
                    'rgba(218,31,38,0.85)', 'rgba(138,43,226,0.85)', 'rgba(43,87,154,0.85)',
                    'rgba(235,72,36,0.85)', 'rgba(0,174,239,0.85)', 'rgba(153,51,255,0.85)',
                    'rgba(166,124,255,0.85)', 'rgba(33,115,70,0.85)', 'rgba(0,229,229,0.85)',
                    'rgba(228,82,60,0.85)'
                ],
                borderColor: [
                    'rgba(255,154,0,1)', 'rgba(49,168,255,1)', 'rgba(255,0,0,1)',
                    'rgba(255,51,102,1)', 'rgba(120,120,120,1)', 'rgba(50,50,50,1)',
                    'rgba(218,31,38,1)', 'rgba(138,43,226,1)', 'rgba(43,87,154,1)',
                    'rgba(235,72,36,1)', 'rgba(0,174,239,1)', 'rgba(153,51,255,1)',
                    'rgba(166,124,255,1)', 'rgba(33,115,70,1)', 'rgba(0,229,229,1)',
                    'rgba(228,82,60,1)'
                ],
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    title: { display: true, text: 'Years of Experience', color: colors.textColor, font: { size: 14, weight: '500' } },
                    ticks: { stepSize: 5, color: colors.tickColor, font: { size: 12 } },
                    grid: { color: colors.gridColor }
                },
                y: {
                    ticks: { font: { size: 13 }, color: colors.tickColor },
                    grid: { color: colors.gridColor }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: colors.tooltipBg,
                    titleColor: colors.textColor,
                    bodyColor: colors.textColor,
                    borderColor: colors.gridColor,
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) { return ' ' + context.parsed.x + ' years'; }
                    }
                }
            },
            animation: { duration: 1500, easing: 'easeOutQuart' }
        }
    });
}

function updateChartColors() {
    var chart = window.experienceChart;
    if (!chart) return;

    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var textColor = isDark ? '#f1f5f9' : '#333';
    var gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    var tooltipBg = isDark ? '#1e293b' : '#ffffff';

    chart.options.scales.x.ticks.color = textColor;
    chart.options.scales.y.ticks.color = textColor;
    chart.options.scales.x.title.color = textColor;
    chart.options.scales.x.grid.color = gridColor;
    chart.options.scales.y.grid.color = gridColor;
    chart.options.plugins.tooltip.backgroundColor = tooltipBg;
    chart.options.plugins.tooltip.titleColor = textColor;
    chart.options.plugins.tooltip.bodyColor = textColor;
    chart.update();
}

// =========================================
// MOBILE DETECTION
// =========================================
function initMobileDetection() {
    var isMobile = false;

    if (window.matchMedia) {
        isMobile = window.matchMedia('(pointer: coarse)').matches;
    }

    if (!isMobile) {
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if (!isMobile && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
        isMobile = true;
    }

    if (isMobile) {
        var heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.style.backgroundImage = "url('assets/introductionbgimagemobile.jpg')";
            heroSection.style.backgroundAttachment = 'scroll';
        }
        document.body.classList.add('is-mobile');
    }
}

// =========================================
// PROJECT MODAL
// =========================================
function initProjectModal() {
    var projectDescriptions = [
        { title: "Banner - Featured Project", description: "Banner" },
        { title: "Billboard", description: "Billboard" },
        { title: "Illustration", description: "Illustration" },
        { title: "Fair/Showcase Organization Billboard", description: "Fair/Showcase Organization Billboard" },
        { title: "Print Magazine Design", description: "Print Magazine Design" },
        { title: "A page for the presentation of an agency", description: "A page for the presentation of an agency" },
        { title: "A page of a Technology magazine", description: "A page of a Technology magazine" },
        { title: "Application UI", description: "Application UI" },
        { title: "Promotion/Advertisement design", description: "Promotion/Advertisement design" },
        { title: "Web Design", description: "Web Design" },
        { title: "Many Logo Designs", description: "This is a mini-project that I had designed myself, depicting some of the brands that I worked for." },
        { title: "Magazine covers (for Envoy)", description: "These are all the covers that I had designed from scratch of the Envoy magazine." },
        { title: "Billboards for a fair organization.", description: "Billboards for a fair organization." },
        { title: "Billboards for a fair organization.", description: "Billboards for a fair organization." },
        { title: "Stuff Magazine Cover Design", description: "Print magazine" },
        { title: "BATHONEA flyer/brochure", description: "A brochure for BATHONEA" },
        { title: "Promotion/advertisement", description: "A promotion/advertisement for Blue Jade Construction Inc." },
        { title: "Business card design", description: "Business card for Blue Jade Construction Inc" },
        { title: "Business card design", description: "Business card for CARFORNIA.COM" },
        { title: "Bus stop shelter advertisement", description: "A bus shelter ad/promotion" },
        { title: "Envoy magazine covers & UI designs", description: "UI of envoymag.com and covers of multiple issues" },
        { title: "Magazine design showcase", description: "Showcase of magazine design skills." },
        { title: "Web & UI Design", description: "UI design along with a website design." },
        { title: "Business promotion design", description: "Design that promotes the business on various items." },
        { title: "Many logo designs", description: "Many logo designs." },
        { title: "Restaurant sign design", description: "Restaurant sign design." },
        { title: "Brochure", description: "A brochure design." },
        { title: "Business design", description: "A promotion design." },
        { title: "Business design", description: "Advertisement/packaging design for a printing press." },
        { title: "Many magazine designs", description: "Many magazine designs." },
        { title: "Drawing", description: "Digital collage sketchbook study of the Incredible Hulk." },
        { title: "YouTube profile picture design", description: "Profile picture design for a gaming channel." },
        { title: "Many logo designs", description: "Many logo designs." },
        { title: "Business card design", description: "A business card design." },
        { title: "Drawing", description: "Digital illustration mimicking Japanese woodblock prints." },
    ];

    for (var d = projectDescriptions.length; d < 145; d++) {
        projectDescriptions.push({ title: "Project " + (d + 1), description: "Description coming soon" });
    }

    window.projectDescriptions = projectDescriptions;

    var modal = document.getElementById('image-modal');
    var modalImage = document.getElementById('modal-image');
    var modalTitle = document.getElementById('modal-title');
    var modalText = document.getElementById('modal-text');
    var closeBtn = document.querySelector('.modal-close');
    var backdrop = document.querySelector('.modal-backdrop');
    var prevBtn = document.querySelector('.modal-prev');
    var nextBtn = document.querySelector('.modal-next');
    var projectImages = document.querySelectorAll('.project-img');
    var currentIndex = 0;

    // Track which gallery is active: 'projects', 'envoy-covers', or 'envoy-pages'
    var activeGallery = 'projects';
    var activeGalleryImages = [];
    var activeGalleryDescriptions = [];

    function openModal(index) {
        if (!modal || !activeGalleryImages[index]) return;
        currentIndex = index;

        var desc = activeGalleryDescriptions[index] || { title: 'Image ' + (index + 1), description: '' };

        if (modalImage) modalImage.src = activeGalleryImages[index].src;
        if (modalTitle) modalTitle.textContent = desc.title;
        if (modalText) modalText.textContent = desc.description;
        modal.style.display = 'block';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modal.scrollTop = 0;

        // Update nav button visibility
        updateNavButtons();
    }

    function updateNavButtons() {
        if (prevBtn) prevBtn.style.display = (activeGalleryImages.length > 1) ? '' : 'none';
        if (nextBtn) nextBtn.style.display = (activeGalleryImages.length > 1) ? '' : 'none';
    }

    function closeModal() {
        if (!modal) return;
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showNext() {
        if (activeGalleryImages.length === 0) return;
        currentIndex = (currentIndex + 1) % activeGalleryImages.length;
        openModal(currentIndex);
    }

    function showPrev() {
        if (activeGalleryImages.length === 0) return;
        currentIndex = (currentIndex - 1 + activeGalleryImages.length) % activeGalleryImages.length;
        openModal(currentIndex);
    }

    // Set up project image clicks
    function setProjectGallery() {
        activeGallery = 'projects';
        activeGalleryImages = [];
        activeGalleryDescriptions = [];

        for (var i = 0; i < projectImages.length; i++) {
            activeGalleryImages.push(projectImages[i]);
            var dataIndex = parseInt(projectImages[i].getAttribute('data-index'));
            if (isNaN(dataIndex)) dataIndex = i;
            activeGalleryDescriptions.push(
                projectDescriptions[dataIndex] || { title: 'Project ' + (dataIndex + 1), description: '' }
            );
        }
    }

    for (var i = 0; i < projectImages.length; i++) {
        (function(idx) {
            projectImages[idx].addEventListener('click', function() {
                setProjectGallery();
                openModal(idx);
            });
            projectImages[idx].setAttribute('tabindex', '0');
            projectImages[idx].setAttribute('role', 'button');
        })(i);
    }

    // Expose functions for Envoy gallery to use
    window.openModalWithGallery = function(images, descriptions, startIndex) {
        activeGalleryImages = images;
        activeGalleryDescriptions = descriptions;
        openModal(startIndex);
    };

    window.closeProjectModal = closeModal;

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });
    if (nextBtn) nextBtn.addEventListener('click', function(e) { e.stopPropagation(); showNext(); });
    if (prevBtn) prevBtn.addEventListener('click', function(e) { e.stopPropagation(); showPrev(); });

    document.addEventListener('keydown', function(e) {
        if (!modal || modal.style.display !== 'block') return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    var touchStartX = 0;
    if (modal) {
        modal.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        modal.addEventListener('touchend', function(e) {
            var diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) showNext(); else showPrev();
            }
        }, { passive: true });
    }
}

// =========================================
// ENVOY MAGAZINE CAROUSEL & GALLERY
// =========================================
function initEnvoyGallery() {
    var track = document.querySelector('.envoy-carousel-track');
    var slides = document.querySelectorAll('.envoy-cover-slide');
    var prevBtn = document.querySelector('.envoy-carousel-prev');
    var nextBtn = document.querySelector('.envoy-carousel-next');
    var dots = document.querySelectorAll('.envoy-dot');
    var viewport = document.querySelector('.envoy-carousel-viewport');

    if (!track || slides.length === 0 || !viewport) return;

    var currentCenter = 0;
    var isDragging = false;
    var hasDragged = false;
    var dragStartX = 0;
    var dragStartTranslate = 0;
    var currentTranslate = 0;

    function getSlideWidth() {
        return slides[0].offsetWidth;
    }

    function getTranslateForIndex(index) {
        var slideWidth = getSlideWidth();
        var viewportCenter = viewport.offsetWidth / 2;
        var slideCenter = (index * slideWidth) + (slideWidth / 2);
        return viewportCenter - slideCenter;
    }

    function updateActiveStates() {
        for (var i = 0; i < slides.length; i++) {
            if (i === currentCenter) {
                slides[i].classList.add('is-center');
            } else {
                slides[i].classList.remove('is-center');
            }
        }
        for (var j = 0; j < dots.length; j++) {
            if (j === currentCenter) {
                dots[j].classList.add('active');
            } else {
                dots[j].classList.remove('active');
            }
        }
    }

    function goToSlide(index, animate) {
        if (animate === undefined) animate = true;
        index = Math.max(0, Math.min(index, slides.length - 1));
        currentCenter = index;
        var translateX = getTranslateForIndex(index);
        currentTranslate = translateX;

        if (animate) {
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
            track.style.transition = 'none';
        }

        track.style.transform = 'translateX(' + translateX + 'px)';
        updateActiveStates();
    }

    function goNext() { goToSlide(currentCenter + 1); }
    function goPrev() { goToSlide(currentCenter - 1); }

    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (prevBtn) prevBtn.addEventListener('click', goPrev);

    for (var d = 0; d < dots.length; d++) {
        (function(dot) {
            dot.addEventListener('click', function() {
                goToSlide(parseInt(dot.getAttribute('data-index')));
            });
        })(dots[d]);
    }

    // Drag support
    function getPointerX(e) {
        if (e.touches && e.touches.length > 0) return e.touches[0].clientX;
        if (e.changedTouches && e.changedTouches.length > 0) return e.changedTouches[0].clientX;
        return e.pageX || e.clientX || 0;
    }

    function onDragStart(e) {
        isDragging = true;
        hasDragged = false;
        dragStartX = getPointerX(e);
        dragStartTranslate = currentTranslate;
        track.style.transition = 'none';
        viewport.style.cursor = 'grabbing';
    }

    function onDragMove(e) {
        if (!isDragging) return;
        var currentX = getPointerX(e);
        var diff = currentX - dragStartX;

        if (Math.abs(diff) > 5) {
            hasDragged = true;
        }

        if (e.cancelable && Math.abs(diff) > 10) {
            e.preventDefault();
        }

        track.style.transform = 'translateX(' + (dragStartTranslate + diff) + 'px)';
    }

    function onDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        viewport.style.cursor = 'grab';

        var endX = getPointerX(e);
        var diff = endX - dragStartX;
        var threshold = getSlideWidth() * 0.25;

        if (diff < -threshold && currentCenter < slides.length - 1) {
            goToSlide(currentCenter + 1);
        } else if (diff > threshold && currentCenter > 0) {
            goToSlide(currentCenter - 1);
        } else {
            goToSlide(currentCenter);
        }

        setTimeout(function() {
            hasDragged = false;
        }, 100);
    }

    viewport.addEventListener('mousedown', onDragStart);
    viewport.addEventListener('mousemove', onDragMove);
    viewport.addEventListener('mouseup', onDragEnd);
    viewport.addEventListener('mouseleave', function() {
        if (isDragging) {
            isDragging = false;
            hasDragged = false;
            viewport.style.cursor = 'grab';
            goToSlide(currentCenter);
        }
    });

    viewport.addEventListener('touchstart', onDragStart, { passive: true });
    viewport.addEventListener('touchmove', onDragMove, { passive: false });
    viewport.addEventListener('touchend', onDragEnd);
    viewport.addEventListener('dragstart', function(e) { e.preventDefault(); });

    // Resize handler
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            goToSlide(currentCenter, false);
        }, 100);
    });

    // Initialize position
    setTimeout(function() {
        goToSlide(0, false);
        track.style.opacity = '1';
    }, 100);

    // =========================================
    // ENVOY COVER MODAL — Full-screen like projects
    // =========================================
    var coverImages = document.querySelectorAll('.envoy-cover-img');

    var coverDescriptions = [
        { title: "Envoy Magazine — Issue 01 Cover", description: "The debut issue establishing the visual identity and editorial direction of Envoy Magazine." },
        { title: "Envoy Magazine — Issue 02 Cover", description: "The second issue building the Envoy brand with refined design language and editorial presence." },
        { title: "Envoy Magazine — Issue 03 Cover", description: "Issue 03 exploring new visual territory with bold creative direction." },
        { title: "Envoy Magazine — Issue 04 Cover", description: "The fourth issue showcasing continued design evolution and brand maturity." },
        { title: "Envoy Magazine — Issue 05 Cover", description: "Issue 05 with growing sophistication in typography and visual composition." },
        { title: "Envoy Magazine — Issue 06 Cover", description: "Bold cover design with refined visual storytelling and impactful imagery." },
        { title: "Envoy Magazine — Issue 07 Cover", description: "The latest issue representing the pinnacle of Envoy's visual evolution." },
    ];

    // Build image array for the cover gallery (using the actual img elements)
    var coverImageElements = [];
    for (var ci = 0; ci < coverImages.length; ci++) {
        coverImageElements.push(coverImages[ci]);
    }

    // Slide click handler: center slide opens modal, non-center navigates
    for (var s = 0; s < slides.length; s++) {
        (function(slide, idx) {
            slide.addEventListener('click', function() {
                if (hasDragged) return;

                if (idx === currentCenter) {
                    // Center slide clicked — open full-screen modal
                    if (typeof window.openModalWithGallery === 'function') {
                        window.openModalWithGallery(coverImageElements, coverDescriptions, idx);
                    }
                } else {
                    // Non-center slide — navigate carousel
                    goToSlide(idx);
                }
            });
        })(slides[s], s);
    }

    // =========================================
    // ENVOY INTERIOR PAGES MODAL
    // =========================================
    var pageImages = document.querySelectorAll('.envoy-page-img');
    var pageDescriptions = [
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" },
        { title: "Envoy", description: "" }
    ];

    var pageImageElements = [];
    for (var pi = 0; pi < pageImages.length; pi++) {
        pageImageElements.push(pageImages[pi]);
    }

    for (var p = 0; p < pageImages.length; p++) {
        (function(img, idx) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                if (typeof window.openModalWithGallery === 'function') {
                    window.openModalWithGallery(pageImageElements, pageDescriptions, idx);
                }
            });
        })(pageImages[p], p);
    }
}
