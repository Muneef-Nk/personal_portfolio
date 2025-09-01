// Projects Management System
class ProjectsManager {
    constructor() {
        this.projects = this.loadProjects();
        this.currentEditId = null;
        this.init();
    }

    init() {
        this.renderProjects();
        this.setupEventListeners();
    }

    loadProjects() {
        const savedProjects = localStorage.getItem('portfolio_projects');
        if (savedProjects) {
            return JSON.parse(savedProjects);
        }
        
        // Default projects
        return [
            {
                id: 'proj_1',
                title: 'Food Delivery Mobile App',
                description: 'Cross-platform food delivery app with real-time tracking, payment integration, and restaurant management system.',
                technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Razorpay'],
                demo: 'https://play.google.com/store/apps/details?id=com.foodapp',
                code: 'https://github.com/muneef-nk/food-delivery-app',
                image: 'fas fa-utensils',
                createdAt: new Date().toISOString()
            },
            {
                id: 'proj_2',
                title: 'Fitness Tracker App',
                description: 'Native iOS and Android fitness tracking app with workout plans, progress monitoring, and social features.',
                technologies: ['React Native', 'Node.js', 'MongoDB', 'HealthKit'],
                demo: 'https://apps.apple.com/app/fitness-tracker',
                code: 'https://github.com/muneef-nk/fitness-tracker',
                image: 'fas fa-dumbbell',
                createdAt: new Date().toISOString()
            },
            {
                id: 'proj_3',
                title: 'E-Commerce Shopping App',
                description: 'Full-featured mobile shopping app with AR product preview, secure payments, and inventory management.',
                technologies: ['Swift', 'Kotlin', 'ARKit', 'Stripe', 'Firebase'],
                demo: 'https://testflight.apple.com/join/shopping-app',
                code: 'https://github.com/muneef-nk/ecommerce-mobile',
                image: 'fas fa-shopping-bag',
                createdAt: new Date().toISOString()
            },
            {
                id: 'proj_4',
                title: 'Chat Messaging App',
                description: 'Real-time messaging app with end-to-end encryption, media sharing, and group chat functionality.',
                technologies: ['Flutter', 'Socket.io', 'Node.js', 'MongoDB'],
                demo: 'https://play.google.com/store/apps/details?id=com.chatapp',
                code: 'https://github.com/muneef-nk/chat-app',
                image: 'fas fa-comments',
                createdAt: new Date().toISOString()
            },
            {
                id: 'proj_5',
                title: 'Expense Tracker App',
                description: 'Personal finance management app with budget tracking, expense categorization, and financial insights.',
                technologies: ['React Native', 'SQLite', 'Chart.js', 'Expo'],
                demo: 'https://expo.dev/@muneef/expense-tracker',
                code: 'https://github.com/muneef-nk/expense-tracker',
                image: 'fas fa-wallet',
                createdAt: new Date().toISOString()
            }
        ];
    }

    saveProjects() {
        localStorage.setItem('portfolio_projects', JSON.stringify(this.projects));
    }

    renderProjects() {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;

        grid.innerHTML = '';

        this.projects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            grid.appendChild(projectCard);
        });

        // Add empty state if no projects
        if (this.projects.length === 0) {
            grid.innerHTML = `
                <div class="empty-state curved-border">
                    <i class="fas fa-folder-open"></i>
                    <h3>No Projects Yet</h3>
                    <p>Start building your portfolio by adding your first project!</p>
                    <button class="btn-primary" onclick="openProjectModal()">
                        <i class="fas fa-plus"></i>
                        <span>Add Your First Project</span>
                    </button>
                </div>
            `;
        }
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card curved-border';
        card.innerHTML = `
            <div class="project-header">
                <div class="project-icon">
                    <i class="${project.image}"></i>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <div class="project-controls">
                        <button class="control-btn edit" onclick="editProject('${project.id}')" title="Edit Project">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="control-btn delete" onclick="deleteProject('${project.id}')" title="Delete Project">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <p class="project-description">${project.description}</p>
            
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            <div class="project-actions">
                <div class="project-links">
                    ${project.demo ? `
                        <a href="${project.demo}" class="project-link primary" target="_blank" rel="noopener">
                            <span>Live Demo</span>
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    ` : ''}
                    ${project.code ? `
                        <a href="${project.code}" class="project-link secondary" target="_blank" rel="noopener">
                            <span>View Code</span>
                            <i class="fab fa-github"></i>
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
        return card;
    }

    setupEventListeners() {
        const form = document.getElementById('project-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const projectData = {
            title: formData.get('title'),
            description: formData.get('description'),
            technologies: formData.get('technologies').split(',').map(tech => tech.trim()),
            demo: formData.get('demo'),
            code: formData.get('code'),
            image: formData.get('image')
        };

        if (this.currentEditId) {
            this.updateProject(this.currentEditId, projectData);
        } else {
            this.addProject(projectData);
        }

        this.closeModal();
        this.renderProjects();
    }

    addProject(projectData) {
        const newProject = {
            id: 'proj_' + Date.now(),
            ...projectData,
            createdAt: new Date().toISOString()
        };
        
        this.projects.unshift(newProject);
        this.saveProjects();
        
        this.showNotification('Project added successfully!', 'success');
    }

    updateProject(id, projectData) {
        const index = this.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            this.projects[index] = {
                ...this.projects[index],
                ...projectData,
                updatedAt: new Date().toISOString()
            };
            this.saveProjects();
            this.showNotification('Project updated successfully!', 'success');
        }
    }

    editProject(id) {
        const project = this.projects.find(p => p.id === id);
        if (!project) return;

        this.currentEditId = id;
        
        // Fill form with project data
        document.getElementById('project-title').value = project.title;
        document.getElementById('project-description').value = project.description;
        document.getElementById('project-technologies').value = project.technologies.join(', ');
        document.getElementById('project-demo').value = project.demo || '';
        document.getElementById('project-code').value = project.code || '';
        document.getElementById('project-image').value = project.image;
        
        // Update modal title
        document.getElementById('modal-title').textContent = 'Edit Project';
        document.getElementById('submit-text').textContent = 'Update Project';
        
        this.openModal();
    }

    deleteProject(id) {
        const project = this.projects.find(p => p.id === id);
        if (!project) return;

        if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
            this.projects = this.projects.filter(p => p.id !== id);
            this.saveProjects();
            this.renderProjects();
            this.showNotification('Project deleted successfully!', 'success');
        }
    }

    openModal() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Reset form and state
        document.getElementById('project-form').reset();
        this.currentEditId = null;
        document.getElementById('modal-title').textContent = 'Add New Project';
        document.getElementById('submit-text').textContent = 'Add Project';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 4000);
    }
}

// Global functions for HTML onclick handlers
let projectsManager;

function openProjectModal() {
    projectsManager.openModal();
}

function closeProjectModal() {
    projectsManager.closeModal();
}

function editProject(id) {
    projectsManager.editProject(id);
}

function deleteProject(id) {
    projectsManager.deleteProject(id);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    projectsManager = new ProjectsManager();
    
    // Close modal when clicking outside
    document.getElementById('project-modal')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeProjectModal();
        }
    });
});
