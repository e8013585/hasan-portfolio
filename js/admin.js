// Image upload handling
document.addEventListener('DOMContentLoaded', function() {
    const uploadBtn = document.getElementById('upload-btn');
    const imageUpload = document.getElementById('image-upload');
    const fileName = document.getElementById('file-name');
    const imagePreview = document.getElementById('image-preview');
    const imageInput = document.getElementById('image');

    // Trigger file input when button is clicked
    uploadBtn.addEventListener('click', () => {
        imageUpload.click();
    });

    // Handle file selection
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            fileName.textContent = file.name;
            
            // Preview image
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
            
            // base64 data storage logic
            reader.onloadend = function() {
                imageInput.value = reader.result;
            };
        } else {
            fileName.textContent = 'No file chosen';
            imagePreview.innerHTML = '';
            imageInput.value = '';
        }
    });
});

// Modify the project upload form submission
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value; // This is now base64 data
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const project = { 
        title, 
        description, 
        image, 
        tags,
        id: Date.now() // Simple ID generation
    };
    
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
    
    // Reset form
    this.reset();
    document.getElementById('file-name').textContent = 'No file chosen';
    document.getElementById('image-preview').innerHTML = '';
    document.getElementById('image').value = '';
    
    // Refresh project list
    loadDashboardProjects();
    
    alert('Project added successfully!');
});
