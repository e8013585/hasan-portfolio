function loadProjects() {
    const projectContainer = document.getElementById('project-list');
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    if (projects.length === 0) {
        projectContainer.innerHTML = '<p class="no-projects">No projects available yet.</p>';
        return;
    }
    
    projectContainer.innerHTML = projects.map(project => `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-img" onerror="this.src='https://placehold.co/600x400?text=Image+Not+Found'">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags && project.tags.length ? project.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                </div>
            </div>
        </div>
    `).join('');
}
