// =========================================
// PORTFOLIO WEBSITE - MAIN JAVASCRIPT
// Revamped with modern features while
// retaining all original functionality
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initLoader();
    initCursor();
    initTheme();
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initExperienceChart();
    initMobileDetection();
    initProjectModal();
});

// =========================================
// LOADING SCREEN
// =========================================
function initLoader() {
    const loader = document.querySelector('.loader');
    
    if (!loader) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1800);
    });
}

// =========================================
// CUSTOM CURSOR
// =========================================
function initCursor() {
    const cursor = document.querySelector('.cursor-follower');
    
    if (!cursor || window.innerWidth < 768) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('active');
    });
    
    // Smooth cursor following
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects on interactive elements (excluding project images for clean tilt effect)
    const hoverElements = document.querySelectorAll('a, button, .contact-card, .skill-tag, .nav-link');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => cursor.classList.remove('active'));
}

// =========================================
// THEME TOGGLE FUNCTIONALITY
// =========================================
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i.fa-moon, i.fa-sun') || themeToggle?.querySelector('i');
    const brandsImage = document.getElementById('brands-image');
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Determine initial theme
    let currentTheme;
    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (prefersDarkScheme.matches) {
        currentTheme = 'dark';
    } else {
        currentTheme = 'light';
    }
    
    // Apply initial theme
    applyTheme(currentTheme);
    
    // Toggle theme when button is clicked
    themeToggle?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update chart colors if chart exists
        if (window.experienceChart) {
            setTimeout(updateChartColors, 100);
        }
    });
    
    // Apply theme function
    function applyTheme(theme) {
        // Apply to both documentElement and body for compatibility
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        
        // Update theme icon
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        }
        
        // Update brands image
        updateBrandsImage(theme);
    }
    
    // Update brands image based on theme
    function updateBrandsImage(theme) {
        if (brandsImage) {
            brandsImage.src = theme === 'dark' 
                ? 'assets/brandsthatiworkedfordark.png' 
                : 'assets/brandsthatiworkedforlight.png';
        }
    }
    
    // Listen for OS theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// =========================================
// NAVIGATION
// =========================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect - add scrolled class for styling
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu?.classList.toggle('active');
        document.body.style.overflow = navMenu?.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =========================================
// HERO ANIMATIONS
// =========================================
function initHeroAnimations() {
    // Typewriter effect for role text
    const roleText = document.querySelector('.role-text');
    
    if (roleText) {
        const roles = ['Creative Director', 'Art Director', 'Graphic Designer', 'Visual Storyteller', 'Brand Designer'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        function typeWriter() {
            const currentRole = roles[roleIndex];
            
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
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before next word
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        // Start typewriter after loader finishes
        setTimeout(typeWriter, 2500);
    }
    
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        if (!target) return;
        
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);
            
            el.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Trigger counter when hero stats are in view
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats && statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(num => animateCounter(num));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heroStats);
    }
}

// =========================================
// SCROLL ANIMATIONS
// =========================================
function initScrollAnimations() {
    // Elements to reveal on scroll
    const revealElements = document.querySelectorAll(
        '.section-header, .about-image-wrapper, .about-content, ' +
        '.chart-wrapper, .featured-project, .brands-image-wrapper, ' +
        '.contact-card, .skill-category'
    );
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
    });
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
    
    // Stagger animation for project items
    const projectItems = document.querySelectorAll('.project-item');
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on visible index
                const visibleItems = document.querySelectorAll('.project-item.visible');
                const delay = visibleItems.length * 50;
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, Math.min(delay, 500)); // Cap delay at 500ms
                
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    projectItems.forEach(item => projectObserver.observe(item));
}

// =========================================
// EXPERIENCE CHART
// =========================================
function initExperienceChart() {
    const ctx = document.getElementById('experienceChart');
    if (!ctx) return;
    
    // Function to get theme-appropriate colors
    function getChartColors() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark' ||
                          document.body.getAttribute('data-theme') === 'dark';
        return {
            textColor: isDarkMode ? '#f1f5f9' : '#333',
            gridColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            tickColor: isDarkMode ? '#f1f5f9' : '#333',
            tooltipBg: isDarkMode ? '#1e293b' : '#ffffff'
        };
    }
    
    let chartColors = getChartColors();
    
    // Data for the experience chart - YOUR ORIGINAL DATA
    const experienceData = {
        labels: [
            'Adobe Illustrator',
            'Adobe Photoshop',
            'Adobe Acrobat',
            'Adobe InDesign',
            'Adobe Creative Suite',
            'Adobe Bridge',
            'Adobe Creative Cloud',
            'Adobe Media Encoder',
            'Microsoft Word',
            'Microsoft PowerPoint',
            'QuarkXPress',
            'Adobe Premiere Pro',
            'Adobe After Effects',
            'Microsoft Excel',
            'Adobe Audition',
            'Corel Painter'
        ],
        datasets: [{
            label: 'Years of Experience',
            data: [37, 35, 31, 25, 23, 17, 14, 11, 10, 9, 8, 7, 6, 5, 4, 3],
            backgroundColor: [
                'rgba(255,154,0,0.85)',    // Illustrator
                'rgba(49,168,255,0.85)',   // Photoshop
                'rgba(255,0,0,0.85)',      // Acrobat
                'rgba(255,51,102,0.85)',   // InDesign
                'rgba(120,120,120,0.85)',  // Creative Suite
                'rgba(50,50,50,0.85)',     // Bridge (lighter for visibility)
                'rgba(218,31,38,0.85)',    // Creative Cloud
                'rgba(138,43,226,0.85)',   // Media Encoder
                'rgba(43,87,154,0.85)',    // Word
                'rgba(235,72,36,0.85)',    // PowerPoint
                'rgba(0,174,239,0.85)',    // QuarkXPress
                'rgba(153,51,255,0.85)',   // Premiere Pro
                'rgba(166,124,255,0.85)',  // After Effects
                'rgba(33,115,70,0.85)',    // Excel
                'rgba(0,229,229,0.85)',    // Audition
                'rgba(228,82,60,0.85)'     // Corel Painter
            ],
            borderColor: [
                'rgba(255,154,0,1)',
                'rgba(49,168,255,1)',
                'rgba(255,0,0,1)',
                'rgba(255,51,102,1)',
                'rgba(120,120,120,1)',
                'rgba(50,50,50,1)',
                'rgba(218,31,38,1)',
                'rgba(138,43,226,1)',
                'rgba(43,87,154,1)',
                'rgba(235,72,36,1)',
                'rgba(0,174,239,1)',
                'rgba(153,51,255,1)',
                'rgba(166,124,255,1)',
                'rgba(33,115,70,1)',
                'rgba(0,229,229,1)',
                'rgba(228,82,60,1)'
            ],
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false,
        }]
    };
    
    // Create the chart
    window.experienceChart = new Chart(ctx, {
        type: 'bar',
        data: experienceData,
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Years of Experience',
                        color: chartColors.textColor,
                        font: {
                            size: 14,
                            weight: '500'
                        }
                    },
                    ticks: {
                        stepSize: 5,
                        color: chartColors.tickColor,
                        font: { size: 12 }
                    },
                    grid: {
                        color: chartColors.gridColor
                    }
                },
                y: {
                    ticks: {
                        font: { size: 13 },
                        color: chartColors.tickColor
                    },
                    grid: {
                        color: chartColors.gridColor
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: chartColors.tooltipBg,
                    titleColor: chartColors.textColor,
                    bodyColor: chartColors.textColor,
                    borderColor: chartColors.gridColor,
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return ` ${context.parsed.x} years`;
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Update chart colors when theme changes
function updateChartColors() {
    const chart = window.experienceChart;
    if (!chart) return;
    
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark' ||
                      document.body.getAttribute('data-theme') === 'dark';
    
    const textColor = isDarkMode ? '#f1f5f9' : '#333';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const tooltipBg = isDarkMode ? '#1e293b' : '#ffffff';
    
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
// MOBILE DEVICE DETECTION
// =========================================
function initMobileDetection() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.style.backgroundImage = "url('assets/introductionbgimagemobile.jpg')";
            heroSection.style.backgroundAttachment = 'scroll'; // Better mobile performance
        }
        
        // Add mobile class to body for CSS targeting
        document.body.classList.add('is-mobile');
    }
}

// =========================================
// PROJECT MODAL - YOUR ORIGINAL DATA
// =========================================
function initProjectModal() {
    // YOUR ORIGINAL PROJECT DESCRIPTIONS - ALL RETAINED
    const projectDescriptions = [
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
        { title: "Many Logo Designs", description: "This is a mini-project that I had designed myself, depicting some of the brands that I worked for. You can find more brands that I worked for by scrolling down." },
        { title: "Magazine covers (for Envoy). (Made in the US)", description: "These are all the covers that I had designed from scratch of the Envoy magazine. Envoy is a magazine that is actively being printed and distributed today, and is sold in many bookstores nationwide and across the world, including but not limited to: United States, various regions in Europe, Canada, and Türkiye." },
        { title: "Billboards for a fair organization.", description: "Billboards for a fair organization." },
        { title: "Billboards for a fair organization.", description: "Billboards for a fair organization." },
        { title: "AUTOCAR - Print Magazine cover", description: "Print magazine " },
        { title: "BATHONEA flyer/brochure", description: "A brochure for the business: \"BATHONEA\" " },
        { title: "Promotion/advertisement", description: "A promotion/advertisement for Blue Jade Construction Inc." },
        { title: "Business card design", description: "This is my design for the business card of the company: \"Blue Jade Construction Inc\"" },
        { title: "Business card design", description: "This is my design for the business card of the company: \"CARFORNIA.COM\"" },
        { title: "Bus stop shelter advertisement design", description: "A bus shelter ad/promotion that I've designed" },
        { title: "Envoy magazine covers & UI designs", description: "A design where I showcase the UI of the Envoy magazine's website (envoymag.com) and the covers of the Envoy magazine (of multiple issues)" },
        { title: "Showcase of a magazine design of mine", description: "This is a showcase of my magazine design skills." },
        { title: "Web & UI Design", description: "This is a showcase of a UI design along with a website design." },
        { title: "Business promotion design for many uses", description: "This is my design that promotes the business on various items." },
        { title: "Many logo designs", description: "Many logo designs that I've designed." },
        { title: "Restaurant sign design", description: "This is a restaurant sign design that I've designed." },
        { title: "Brochure", description: "This is a brochure that I've designed." },
        { title: "Business design", description: "This is a promotion that I've designed." },
        { title: "Business design", description: "This is an advertisement/packaging design for a printing press business." },
        { title: "Many magazine designs", description: "Many magazine designs that I've designed." },
        { title: "Drawing", description: "This image presents a chaotic and vibrant digital collage that serves as a sketchbook study of the Marvel character, the Incredible Hulk, set against an intense neon green background. The composition features several distinct iterations of the character in various states of action and differing artistic styles: a central, lime-highlighted figure stands in a triumphant double-bicep flex; a grey-scale, pencil-textured Hulk lunges to the right; a pink-hued version crouches low to the ground; and a rougher, yellow-colored figure appears to be mid-combat in the upper left. Faint, scribbled lines in the background hint at a forest setting or discarded drafts, while handwritten text—including the date \"29.12.2002\" and the Turkish phrase \"Hulk çizimlerim\" (\"My Hulk drawings\")—confirms this is a personal collection of concept art or practice sketches exploring the character's exaggerated anatomy and dynamic movement." },
        { title: "YouTube profile picture design", description: "This is mainly for a profile picture design made for a gaming channel on YouTube. It can also be used for a cybercafe design or similar." },
        { title: "Many logo designs", description: "Many logo designs that I've designed." },
        { title: "Business card design", description: "This is a business card that I've designed." },
        { title: "Drawing", description: "The image is a digital illustration designed to mimic traditional Japanese woodblock prints (Ukiyo-e) or scroll paintings. It features a prominent canvas-like texture overlay that gives it the appearance of being painted on rough paper or fabric. The subjects include Oni, and a warrior." },
        { title: "Project 36", description: "Description coming soon" },
        { title: "Project 37", description: "Description coming soon" },
        { title: "Project 38", description: "Description coming soon" },
        { title: "Project 39", description: "Description coming soon" },
        { title: "Project 40", description: "Description coming soon" },
        { title: "Project 41", description: "Description coming soon" },
        { title: "Project 42", description: "Description coming soon" },
        { title: "Project 43", description: "Description coming soon" },
        { title: "Project 44", description: "Description coming soon" },
        { title: "Project 45", description: "Description coming soon" },
        { title: "Project 46", description: "Description coming soon" },
        { title: "Project 47", description: "Description coming soon" },
        { title: "Project 48", description: "Description coming soon" },
        { title: "Drawing", description: "The image shows a page from a spiral-bound sketchbook (the metal coils are visible at the very top). The artwork is a vertical, panoramic illustration created using watercolors and ink. The style is somewhat loose and sketch-like but captures a sense of grand scale." },
        { title: "Project 50", description: "Description coming soon" },
        { title: "Project 51", description: "Description coming soon" },
        { title: "Project 52", description: "Description coming soon" },
        { title: "Project 53", description: "Description coming soon" },
        { title: "Project 54", description: "Description coming soon" },
        { title: "Project 55", description: "Description coming soon" },
        { title: "Project 56", description: "Description coming soon" },
        { title: "Project 57", description: "Description coming soon" },
        { title: "Project 58", description: "Description coming soon" },
        { title: "Project 59", description: "Description coming soon" },
        { title: "Project 60", description: "Description coming soon" },
        { title: "Project 61", description: "Description coming soon" },
        { title: "Project 62", description: "Description coming soon" },
        { title: "Project 63", description: "Description coming soon" },
        { title: "Project 64", description: "Description coming soon" },
        { title: "Project 65", description: "Description coming soon" },
        { title: "Project 66", description: "Description coming soon" },
        { title: "Project 67", description: "Description coming soon" },
        { title: "Project 68", description: "Description coming soon" },
        { title: "Project 69", description: "Description coming soon" },
        { title: "Project 70", description: "Description coming soon" },
        { title: "Project 71", description: "Description coming soon" },
        { title: "Project 72", description: "Description coming soon" },
        { title: "Project 73", description: "Description coming soon" },
        { title: "Project 74", description: "Description coming soon" },
        { title: "Project 75", description: "Description coming soon" },
        { title: "Project 76", description: "Description coming soon" },
        { title: "Project 77", description: "Description coming soon" },
        { title: "Project 78", description: "Description coming soon" }
    ];
    
    // Make descriptions available globally for projects.js
    window.projectDescriptions = projectDescriptions;
    
    // Get modal elements
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeBtn = document.querySelector('.modal-close') || document.querySelector('.close');
    const backdrop = document.querySelector('.modal-backdrop');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    // Get all project images
    const projectImages = document.querySelectorAll('.project-img');
    let currentIndex = 0;
    
    // Open modal function
    function openModal(index) {
        if (!modal) return;
        
        currentIndex = index;
        const img = projectImages[index];
        const description = projectDescriptions[index] || { 
            title: `Project ${index + 1}`, 
            description: 'A creative design project showcasing professional expertise and attention to detail.' 
        };
        
        // Set modal content
        modalImage.src = img.src;
        modalTitle.textContent = description.title;
        modalText.textContent = description.description;
        
        // Show modal
        modal.style.display = 'block';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Scroll to top of modal when opened
        modal.scrollTop = 0;
        
        // Add entrance animation
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.animation = 'none';
            modalContent.offsetHeight; // Trigger reflow
            modalContent.style.animation = 'slideIn 0.4s ease';
        }
    }
    
    // Close modal function
    function closeModal() {
        if (!modal) return;
        
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Navigate to next image
    function showNext() {
        currentIndex = (currentIndex + 1) % projectImages.length;
        openModal(currentIndex);
    }
    
    // Navigate to previous image
    function showPrev() {
        currentIndex = (currentIndex - 1 + projectImages.length) % projectImages.length;
        openModal(currentIndex);
    }
    
    // Add click event to all images
    projectImages.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
        
        // Add keyboard accessibility
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(index);
            }
        });
    });
    
    // Close modal when X is clicked
    closeBtn?.addEventListener('click', closeModal);
    
    // Close modal when clicking backdrop
    backdrop?.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the content (for old modal structure)
    modal?.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Navigation buttons
    nextBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });
    
    prevBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal?.classList.contains('active') && modal?.style.display !== 'block') return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowRight':
                showNext();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    modal?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNext(); // Swipe left = next
            } else {
                showPrev(); // Swipe right = previous
            }
        }
    }
}

// =========================================
// INITIALIZE DEFAULT PROJECTS (for localStorage)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize projects if none exist in localStorage
    if (!localStorage.getItem('projects')) {
        const defaultProjects = [
            {
                title: "E-Commerce Platform",
                description: "A full-featured online shopping platform with payment integration.",
                image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
                tags: ["React", "Node.js", "MongoDB"]
            },
            {
                title: "Task Management App",
                description: "A productivity application for teams to manage projects and deadlines.",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
                tags: ["Vue.js", "Firebase", "Tailwind CSS"]
            },
            {
                title: "Weather Dashboard",
                description: "Real-time weather application with forecasts and location tracking.",
                image: "https://images.unsplash.com/photo-1561484930-994b8cb85a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
                tags: ["JavaScript", "API Integration", "Chart.js"]
            }
        ];
        localStorage.setItem('projects', JSON.stringify(defaultProjects));
    }
});
