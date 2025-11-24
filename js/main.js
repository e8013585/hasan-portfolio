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
        { title: "Project 15", description: "Description coming soon" },
        { title: "Project 16", description: "Description coming soon" },
        { title: "Project 17", description: "A promotion/advertisement for Blue Jade Construction Inc." },
        { title: "Project 18", description: "Description coming soon" },
        { title: "Project 19", description: "Description coming soon" },
        { title: "Project 20", description: "Description coming soon" },
        { title: "Project 21", description: "Description coming soon" },
        { title: "Project 22", description: "Description coming soon" },
        { title: "Project 23", description: "Description coming soon" },
        { title: "Project 24", description: "Description coming soon" },
        { title: "Project 25", description: "Description coming soon" },
        { title: "Project 26", description: "Description coming soon" },
        { title: "Project 27", description: "Description coming soon" },
        { title: "Project 28", description: "Description coming soon" },
        { title: "Project 29", description: "Description coming soon" },
        { title: "Project 30", description: "Description coming soon" },
        { title: "Project 31", description: "Description coming soon" },
        { title: "Project 32", description: "Description coming soon" },
        { title: "Project 33", description: "Description coming soon" },
        { title: "Project 34", description: "Description coming soon" },
        { title: "Project 35", description: "Description coming soon" },
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
        { title: "Project 49", description: "Description coming soon" },
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
        { title: "Project 67", description: "Description coming soon" }
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
