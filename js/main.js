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
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('experienceChart').getContext('2d');
    
    const experienceData = {
        labels: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Creative Suite', 'Adobe Creative Cloud', 'QuarkXPress', 'Microsoft Excel', 'Adobe InDesign', 'Adobe Acrobat'],
        datasets: [{
            label: 'Years of Experience',
            data: [35, 37, 23, 14, 3, 2, 25, 31], 
            backgroundColor: [
                'rgba(37, 99, 235, 0.7)',
                'rgba(30, 64, 175, 0.7)',
                'rgba(249, 115, 22, 0.7)',
                'rgba(245, 158, 11, 0.7)',
                'rgba(16, 185, 129, 0.7)',
                'rgba(139, 92, 246, 0.7)',
                'rgba(236, 72, 153, 0.7)',
                'rgba(244, 63, 94, 0.7)'
            ],
            borderColor: [
                'rgba(37, 99, 235, 1)',
                'rgba(30, 64, 175, 1)',
                'rgba(249, 115, 22, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(16, 185, 129, 1)',
                'rgba(139, 92, 246, 1)',
                'rgba(236, 72, 153, 1)',
                'rgba(244, 63, 94, 1)'
            ],
            borderWidth: 1
        }]
    };

    const experienceChart = new Chart(ctx, {
        type: 'bar',
        data: experienceData,
        options: {
            indexAxis: 'y', // horizontal bar chart
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Years of Experience'
                    },
                    ticks: {
                        stepSize: 1
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 14
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.x} years`;
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
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
    // Project descriptions (you can customize these)
    const projectDescriptions = [
        { title: "Featured Project", description: "Banner" },
        { title: "Project H_002", description: "Description coming soon." },
        { title: "Project H_003", description: "Description coming soon." },
        { title: "Project H_004", description: "Description coming soon." },
        { title: "Project H_006", description: "Description coming soon." },
        { title: "Project H_007", description: "Description coming soon." },
        { title: "Project H_008", description: "Description coming soon." },
        { title: "Project H_009", description: "Description coming soon." },
        { title: "Project H_010", description: "Description coming soon." },
        { title: "Project H_011", description: "This is a mini-project that I had designed myself, depicting some of the brands that I worked for. You can find more brands that I worked for by scrolling down." },
        { title: "Project H_012", description: "These are all the covers that I had designed from scratch of the Envoy magazine. Envoy is a magazine that is actively being printed and distributed today, and is sold in many bookstores nationwide and across the world, including but not limited to: United States, various regions in Europe, Canada, and Türkiye." },
        { title: "Project H_013", description: "Description coming soon." },
        { title: "Project H_014", description: "Description coming soon." }
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
