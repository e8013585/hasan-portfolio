// =========================================
// PROJECTS MODULE
// Enhanced with clean tilt effect (no overlay)
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
    initProjectTiltEffect();
    initLazyLoading();
    loadProjects();
});

// =========================================
// UTILITY: SANITIZE HTML
// =========================================
function sanitizeHTML(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// =========================================
// PROJECT FILTERS
// =========================================
function initProjectFilters() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var projectItems = document.querySelectorAll('.project-item');

    if (filterBtns.length === 0) return;

    for (var i = 0; i < filterBtns.length; i++) {
        (function(btn) {
            btn.addEventListener('click', function() {
                // Update active button
                for (var b = 0; b < filterBtns.length; b++) {
                    filterBtns[b].classList.remove('active');
                }
                btn.classList.add('active');

                var filter = btn.getAttribute('data-filter');

                // Filter items with animation
                var visibleIndex = 0;
                for (var j = 0; j < projectItems.length; j++) {
                    (function(item, idx) {
                        var category = item.getAttribute('data-category');

                        if (filter === 'all' || category === filter) {
                            item.style.display = 'block';
                            setTimeout(function() {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, idx * 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            setTimeout(function() {
                                item.style.display = 'none';
                            }, 300);
                        }
                    })(projectItems[j], visibleIndex);

                    var cat = projectItems[j].getAttribute('data-category');
                    if (filter === 'all' || cat === filter) {
                        visibleIndex++;
                    }
                }
            });
        })(filterBtns[i]);
    }
}

// =========================================
// PROJECT TILT EFFECT - CLEAN VERSION
// Only tilt/lean toward cursor, no overlay
// Uses data attribute to prevent duplicate listeners
// =========================================
function initProjectTiltEffect() {
    var projectItems = document.querySelectorAll('.project-item');
    var projectImages = document.querySelectorAll('.projects-masonry .project-img, .projects-grid .project-img');

    // Apply tilt effect to project items (wrapper divs)
    for (var i = 0; i < projectItems.length; i++) {
        (function(item) {
            // Skip if already initialized — prevents duplicate listeners
            if (item.getAttribute('data-tilt-init')) return;
            item.setAttribute('data-tilt-init', 'true');

            item.addEventListener('mouseenter', function() {
                this.style.transition = 'box-shadow 0.3s ease';
            });

            item.addEventListener('mousemove', function(e) {
                var rect = this.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;

                var centerX = rect.width / 2;
                var centerY = rect.height / 2;

                // Calculate rotation based on cursor position
                var rotateX = ((y - centerY) / centerY) * -10;
                var rotateY = ((x - centerX) / centerX) * 10;

                // Apply 3D transform — use perspective + rotate only, keep translateY separate
                this.style.transform =
                    'perspective(1000px) ' +
                    'rotateX(' + rotateX + 'deg) ' +
                    'rotateY(' + rotateY + 'deg) ' +
                    'scale3d(1.02, 1.02, 1.02)';
                this.style.boxShadow =
                    (rotateY * -2) + 'px ' + (rotateX * 2) + 'px 30px rgba(0, 0, 0, 0.15)';
            });

            item.addEventListener('mouseleave', function() {
                var self = this;
                self.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
                self.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                self.style.boxShadow = '';

                setTimeout(function() {
                    self.style.transition = '';
                }, 500);
            });
        })(projectItems[i]);
    }

    // Apply tilt effect directly to images (for grids without wrapper divs)
    for (var j = 0; j < projectImages.length; j++) {
        (function(img) {
            // Skip if parent is already a project-item (avoid double effect)
            if (img.closest('.project-item')) return;

            // Skip if already initialized
            if (img.getAttribute('data-tilt-init')) return;
            img.setAttribute('data-tilt-init', 'true');

            img.addEventListener('mouseenter', function() {
                this.style.transition = 'box-shadow 0.3s ease';
            });

            img.addEventListener('mousemove', function(e) {
                var rect = this.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;

                var centerX = rect.width / 2;
                var centerY = rect.height / 2;

                var rotateX = ((y - centerY) / centerY) * -8;
                var rotateY = ((x - centerX) / centerX) * 8;

                this.style.transform =
                    'perspective(1000px) ' +
                    'rotateX(' + rotateX + 'deg) ' +
                    'rotateY(' + rotateY + 'deg) ' +
                    'scale3d(1.03, 1.03, 1.03)';
                this.style.boxShadow =
                    (rotateY * -1.5) + 'px ' + (rotateX * 1.5) + 'px 25px rgba(0, 0, 0, 0.2)';
            });

            img.addEventListener('mouseleave', function() {
                var self = this;
                self.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
                self.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                self.style.boxShadow = '';

                setTimeout(function() {
                    self.style.transition = '';
                }, 500);
            });
        })(projectImages[j]);
    }
}

// =========================================
// LAZY LOADING IMAGES
// =========================================
function initLazyLoading() {
    var images = document.querySelectorAll('.project-img, .projects-masonry img');

    var imageObserver = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            (function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;

                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';

                    if (img.complete) {
                        img.style.opacity = '1';
                    } else {
                        img.onload = function() {
                            img.style.opacity = '1';
                        };

                        img.onerror = function() {
                            img.style.opacity = '1';
                            img.alt = 'Image not available';
                        };
                    }

                    imageObserver.unobserve(img);
                }
            })(entries[i]);
        }
    }, {
        rootMargin: '100px',
        threshold: 0.1
    });

    for (var j = 0; j < images.length; j++) {
        imageObserver.observe(images[j]);
    }
}

// =========================================
// LOAD PROJECTS FROM LOCALSTORAGE
// =========================================
function loadProjects() {
    var projectContainer = document.getElementById('project-list');

    if (!projectContainer) return;

    var projects = [];
    try {
        projects = JSON.parse(localStorage.getItem('projects')) || [];
    } catch (e) {
        console.error('Error parsing projects from localStorage:', e);
        projects = [];
    }

    if (projects.length === 0) {
        projectContainer.innerHTML = '';
        var noProjects = document.createElement('div');
        noProjects.className = 'no-projects';

        var icon = document.createElement('i');
        icon.className = 'fas fa-folder-open';
        noProjects.appendChild(icon);

        var msg = document.createElement('p');
        msg.textContent = 'No projects available yet.';
        noProjects.appendChild(msg);

        projectContainer.appendChild(noProjects);
        return;
    }

    // Clear container
    projectContainer.innerHTML = '';

    for (var i = 0; i < projects.length; i++) {
        (function(project, index) {
            var card = document.createElement('div');
            card.className = 'project-card';
            card.style.animationDelay = (index * 0.1) + 's';

            // Image wrapper
            var imgWrapper = document.createElement('div');
            imgWrapper.className = 'project-image-wrapper';

            var img = document.createElement('img');
            img.src = project.image || '';
            img.alt = sanitizeHTML(project.title) || 'Project image';
            img.className = 'project-img';
            img.loading = 'lazy';
            img.onerror = function() {
                this.src = 'https://placehold.co/600x400?text=Image+Not+Found';
            };
            imgWrapper.appendChild(img);
            card.appendChild(imgWrapper);

            // Content
            var content = document.createElement('div');
            content.className = 'project-content';

            var title = document.createElement('h3');
            title.textContent = project.title || '';
            content.appendChild(title);

            var desc = document.createElement('p');
            desc.textContent = project.description || '';
            content.appendChild(desc);

            // Tags
            if (project.tags && project.tags.length > 0) {
                var tagsDiv = document.createElement('div');
                tagsDiv.className = 'project-tags';

                for (var t = 0; t < project.tags.length; t++) {
                    var tagSpan = document.createElement('span');
                    tagSpan.className = 'tag';
                    tagSpan.textContent = project.tags[t];
                    tagsDiv.appendChild(tagSpan);
                }

                content.appendChild(tagsDiv);
            }

            card.appendChild(content);
            projectContainer.appendChild(card);
        })(projects[i], i);
    }

    // Re-initialize tilt effects for new cards (safe — uses data-tilt-init guard)
    initProjectTiltEffect();
}

// =========================================
// UTILITY: DEBOUNCE FUNCTION
// =========================================
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        var later = function() {
            clearTimeout(timeout);
            func.apply(context, args);
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
