// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
} else {
    document.body.setAttribute('data-theme', 'light');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Brand Image Theme Switching
function updateBrandImage() {
    const currentTheme = document.body.getAttribute('data-theme');
    const brandImage = document.getElementById('brands-image');
    
    if (currentTheme === 'dark') {
        brandImage.src = 'assets/brandsthatiworkedfordark.png';
    } else {
        brandImage.src = 'assets/brandsthatiworkedforlight.png';
    }
}

// Call on initial load
document.addEventListener('DOMContentLoaded', updateBrandImage);

// Update when theme changes
themeToggle.addEventListener('click', function() {
    // Wait a bit for the theme to change before updating the image
    setTimeout(updateBrandImage, 100);
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Project loading
document.addEventListener('DOMContentLoaded', () => {
    // Initialize projects if none exist
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

// Experience chart
document.addEventListener('DOMContentLoaded', function () {

    const ctx = document.getElementById('experienceChart').getContext('2d');

    // Function to detect theme colors
    function getChartColors() {
        const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
        return {
            textColor: isDarkMode ? '#f1f5f9' : '#333',
            gridColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            tickColor: isDarkMode ? '#f1f5f9' : '#333'
        };
    }

    // Correct: store colors in a separate variable
    let chartColors = getChartColors();

    // Data for the experience chart
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
                'rgba(255,154,0,1)',    // Illustrator
                'rgba(49,168,255,1)',   // Photoshop
                'rgba(255,0,0,1)',      // Acrobat
                'rgba(255,51,102,1)',   // InDesign
                'rgba(120,120,120,1)',  // Creative Suite
                'rgba(0,0,0,1)',        // Bridge
                'rgba(218,31,38,1)',    // Creative Cloud
                'rgba(138,43,226,1)',   // Media Encoder
                'rgba(43,87,154,1)',    // Word
                'rgba(235,72,36,1)',    // PowerPoint
                'rgba(0,174,239,1)',    // QuarkXPress
                'rgba(153,51,255,1)',   // Premiere Pro
                'rgba(166,124,255,1)',  // After Effects
                'rgba(33,115,70,1)',    // Excel
                'rgba(0,229,229,1)',    // Audition
                'rgba(228,82,60,1)'     // Corel Painter
            ],

            borderColor: [
                'rgba(255,154,0,1)',
                'rgba(49,168,255,1)',
                'rgba(255,0,0,1)',
                'rgba(255,51,102,1)',
                'rgba(120,120,120,1)',
                'rgba(0,0,0,1)',
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

            borderWidth: 1
        }]
    };

    // Chart.js instance
    const experienceChart = new Chart(ctx, {
        type: 'bar',
        data: experienceData,
        options: {
            indexAxis: 'y',

            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Years of Experience',
                        color: chartColors.textColor
                    },
                    ticks: {
                        stepSize: 1,
                        color: chartColors.tickColor
                    },
                    grid: {
                        color: chartColors.gridColor
                    }
                },
                y: {
                    ticks: {
                        font: { size: 14 },
                        color: chartColors.tickColor
                    },
                    grid: {
                        color: chartColors.gridColor
                    }
                }
            }, // ← Fixed missing brace

            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.parsed.x} years`;
                        }
                    }
                }
            },

            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Update chart colors on theme change
    function updateChartColors() {
        chartColors = getChartColors();

        experienceChart.options.scales.x.ticks.color = chartColors.tickColor;
        experienceChart.options.scales.y.ticks.color = chartColors.tickColor;
        experienceChart.options.scales.x.title.color = chartColors.textColor;
        experienceChart.options.scales.x.grid.color = chartColors.gridColor;
        experienceChart.options.scales.y.grid.color = chartColors.gridColor;

        experienceChart.update();
    }

    // Theme toggle listener
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            setTimeout(updateChartColors, 100);
        });
    }
});

// Mobile Device Detection and Background Image Switching
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is on a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Apply mobile background
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.style.backgroundImage = "url('../assets/introductionbgimagemobile.jpg')";
        }
    }
});

// Project Showcase with Modal Popup
document.addEventListener('DOMContentLoaded', function() {
    // Project descriptions
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
        
        // More projects
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
    // Get modal elements
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeBtn = document.querySelector('.close');

    // Get all project images
    const projectImages = document.querySelectorAll('.project-img');

    // Add click event to all images
    projectImages.forEach(img => {
        img.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const src = this.getAttribute('src');
            const description = projectDescriptions[index];
            
            // Set modal content
            modalImage.src = src;
            modalTitle.textContent = description.title;
            modalText.textContent = description.description;
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Scroll to top of modal when opened
            modal.scrollTop = 0;
        });
    });

    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
});
