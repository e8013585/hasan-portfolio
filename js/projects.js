// =========================================
// PROJECTS MODULE
// Enhanced with clean tilt effect (no overlay)
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    initProjectFilters();
    initProjectTiltEffect();
    initLazyLoading();
    loadProjects();
});

// =========================================
// PROJECT FILTERS
// =========================================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter items with animation
            let visibleIndex = 0;
            projectItems.forEach((item) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, visibleIndex * 50);
                    visibleIndex++;
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// =========================================
// PROJECT TILT EFFECT - CLEAN VERSION
// Only tilt/lean toward cursor, no overlay
// =========================================
function initProjectTiltEffect() {
    // Select all project images in the grid (not the featured one)
    const projectItems = document.querySelectorAll('.project-item');
    const projectImages = document.querySelectorAll('.projects-masonry .project-img, .projects-grid .project-img');
    
    // Apply tilt effect to project items (wrapper divs)
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function(e) {
            this.style.transition = 'box-shadow 0.3s ease';
        });
        
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation based on cursor position
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees
            const rotateY = ((x - centerX) / centerX) * 10;  // Max 10 degrees
            
            // Apply 3D transform
            this.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.02, 1.02, 1.02)
            `;
            this.style.boxShadow = `
                ${rotateY * -2}px ${rotateX * 2}px 30px rgba(0, 0, 0, 0.15)
            `;
        });
        
        item.addEventListener('mouseleave', function(e) {
            // Reset transform smoothly
            this.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            this.style.boxShadow = '';
            
            // Remove transition after animation completes
            setTimeout(() => {
                this.style.transition = '';
            }, 500);
        });
    });
    
    // Apply tilt effect directly to images (for grids without wrapper divs)
    projectImages.forEach(img => {
        // Skip if parent is already a project-item (avoid double effect)
        if (img.closest('.project-item')) return;
        
        img.addEventListener('mouseenter', function(e) {
            this.style.transition = 'box-shadow 0.3s ease';
        });
        
        img.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            this.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.03, 1.03, 1.03)
            `;
            this.style.boxShadow = `
                ${rotateY * -1.5}px ${rotateX * 1.5}px 25px rgba(0, 0, 0, 0.2)
            `;
        });
        
        img.addEventListener('mouseleave', function(e) {
            this.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            this.style.boxShadow = '';
            
            setTimeout(() => {
                this.style.transition = '';
            }, 500);
        });
    });
}

// =========================================
// LAZY LOADING IMAGES
// =========================================
function initLazyLoading() {
    const images = document.querySelectorAll('.project-img, .projects-masonry img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    img.onerror = () => {
                        img.style.opacity = '1';
                        img.alt = 'Image not available';
                    };
                }
                
                imageObserver.unobserve(img);
            }
        });
    }, { 
        rootMargin: '100px',
        threshold: 0.1 
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// =========================================
// LOAD PROJECTS FROM LOCALSTORAGE
// =========================================
function loadProjects() {
    const projectContainer = document.getElementById('project-list');
    
    if (!projectContainer) return;
    
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    if (projects.length === 0) {
        projectContainer.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-folder-open"></i>
                <p>No projects available yet.</p>
            </div>
        `;
        return;
    }
    
    projectContainer.innerHTML = projects.map((project, index) => `
        <div class="project-card" style="animation-delay: ${index * 0.1}s">
            <div class="project-image-wrapper">
                <img 
                    src="${project.image}" 
                    alt="${project.title}" 
                    class="project-img" 
                    loading="lazy"
                    onerror="this.src='https://placehold.co/600x400?text=Image+Not+Found'"
                >
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${project.tags && project.tags.length ? `
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
    
    // Re-initialize tilt effects for new cards
    initProjectTiltEffect();
}

// =========================================
// UTILITY: DEBOUNCE FUNCTION
// =========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// =========================================
// EXPORT FOR GLOBAL ACCESS
// =========================================
window.loadProjects = loadProjects;
window.initProjectFilters = initProjectFilters;
window.initProjectTiltEffect = initProjectTiltEffect;
