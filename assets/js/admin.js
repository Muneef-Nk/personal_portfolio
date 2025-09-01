// Admin Dashboard Management System
class AdminDashboard {
    constructor() {
        this.currentSection = 'overview';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupDataManagement();
        this.updateStats();
        this.renderCurrentSection();
        
        // Update stats every 5 seconds
        setInterval(() => this.updateStats(), 5000);
    }

    setupNavigation() {
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.getAttribute('data-section');
                this.switchSection(section);
                
                // Update active state
                sidebarItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    switchSection(section) {
        // Hide all sections
        document.querySelectorAll('.admin-section').forEach(s => {
            s.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = section;
            this.renderCurrentSection();
        }
    }

    renderCurrentSection() {
        switch(this.currentSection) {
            case 'overview':
                this.renderOverview();
                break;
            case 'personal-info':
                this.renderPersonalInfoPreview();
                break;
            case 'services':
                this.renderServicesList();
                break;
            case 'skills':
                this.renderSkillsList();
                break;
            case 'projects':
                this.renderProjectsList();
                break;
            case 'quotes':
                this.renderQuotesList();
                break;
        }
    }

    updateStats() {
        const services = JSON.parse(localStorage.getItem('portfolio_services') || '[]');
        const skills = JSON.parse(localStorage.getItem('portfolio_skills') || '[]');
        const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
        const quotes = JSON.parse(localStorage.getItem('portfolio_quotes') || '[]');

        document.getElementById('services-count').textContent = services.length;
        document.getElementById('skills-count').textContent = skills.length;
        document.getElementById('projects-count').textContent = projects.length;
        document.getElementById('quotes-count').textContent = quotes.length;
    }

    renderOverview() {
        // Stats are updated automatically
    }

    renderPersonalInfoPreview() {
        const personalInfo = JSON.parse(localStorage.getItem('portfolio_personal_info') || '{}');
        const preview = document.getElementById('personal-info-preview');
        
        if (!preview) return;

        preview.innerHTML = `
            <div class="preview-section">
                <h3>Hero Section</h3>
                <div class="preview-item"><strong>Name:</strong><span>${personalInfo.hero?.name || 'Not set'}</span></div>
                <div class="preview-item"><strong>Role:</strong><span>${personalInfo.hero?.role || 'Not set'}</span></div>
                <div class="preview-item"><strong>Badge:</strong><span>${personalInfo.hero?.badge || 'Not set'}</span></div>
                <div class="preview-item"><strong>Description:</strong><span>${personalInfo.hero?.description || 'Not set'}</span></div>
            </div>
            
            <div class="preview-section">
                <h3>About Section</h3>
                <div class="preview-item"><strong>Title:</strong><span>${personalInfo.about?.title || 'Not set'}</span></div>
                <div class="preview-item"><strong>Description:</strong><span>${personalInfo.about?.description || 'Not set'}</span></div>
            </div>
            
            <div class="preview-section">
                <h3>Contact Information</h3>
                <div class="preview-item"><strong>Email:</strong><span>${personalInfo.contact?.email || 'Not set'}</span></div>
                <div class="preview-item"><strong>Phone:</strong><span>${personalInfo.contact?.phone || 'Not set'}</span></div>
                <div class="preview-item"><strong>Location:</strong><span>${personalInfo.contact?.location || 'Not set'}</span></div>
            </div>
            
            <div class="preview-section">
                <h3>Social Links</h3>
                <div class="preview-item"><strong>GitHub:</strong><span>${personalInfo.social?.github || 'Not set'}</span></div>
                <div class="preview-item"><strong>LinkedIn:</strong><span>${personalInfo.social?.linkedin || 'Not set'}</span></div>
                <div class="preview-item"><strong>Twitter:</strong><span>${personalInfo.social?.twitter || 'Not set'}</span></div>
                <div class="preview-item"><strong>Instagram:</strong><span>${personalInfo.social?.instagram || 'Not set'}</span></div>
            </div>
        `;
    }

    renderServicesList() {
        const services = JSON.parse(localStorage.getItem('portfolio_services') || '[]');
        const servicesList = document.getElementById('services-list');
        
        if (!servicesList) return;

        if (services.length === 0) {
            servicesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-briefcase"></i>
                    <h3>No Services Yet</h3>
                    <p>Start building your services portfolio!</p>
                    <button class="btn-admin primary" onclick="openServiceModal()">
                        <i class="fas fa-plus"></i>
                        <span>Add Your First Service</span>
                    </button>
                </div>
            `;
            return;
        }

        servicesList.innerHTML = services.map(service => `
            <div class="content-item">
                <div class="content-item-info">
                    <h3>${service.title} ${service.featured ? '<i class="fas fa-star" style="color: #fbbf24; margin-left: 0.5rem;"></i>' : ''}</h3>
                    <p>${service.description}</p>
                    <div style="margin-top: 0.5rem;">
                        <span style="background: rgba(99, 102, 241, 0.2); color: #6366f1; padding: 0.25rem 0.5rem; border-radius: 6px; font-size: 0.8rem;">
                            <i class="${service.icon}"></i> ${service.icon}
                        </span>
                    </div>
                </div>
                <div class="content-item-controls">
                    <button class="control-btn edit" onclick="editService('${service.id}')" title="Edit Service">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="control-btn feature ${service.featured ? 'active' : ''}" onclick="toggleFeatured('${service.id}')" title="Toggle Featured">
                        <i class="fas fa-star"></i>
                    </button>
                    <button class="control-btn delete" onclick="deleteService('${service.id}')" title="Delete Service">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderSkillsList() {
        const skills = JSON.parse(localStorage.getItem('portfolio_skills') || '[]');
        const skillsList = document.getElementById('skills-list');
        
        if (!skillsList) return;

        if (skills.length === 0) {
            skillsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tools"></i>
                    <h3>No Skills Yet</h3>
                    <p>Start building your skills portfolio!</p>
                    <button class="btn-admin primary" onclick="openSkillModal()">
                        <i class="fas fa-plus"></i>
                        <span>Add Your First Skill</span>
                    </button>
                </div>
            `;
            return;
        }

        skillsList.innerHTML = skills.map(skill => `
            <div class="content-item">
                <div class="content-item-info">
                    <h3>${skill.name}</h3>
                    <p>${skill.description}</p>
                    <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
                        <span style="background: rgba(99, 102, 241, 0.2); color: #6366f1; padding: 0.25rem 0.5rem; border-radius: 6px; font-size: 0.8rem;">
                            ${skill.category}
                        </span>
                        <span style="background: rgba(34, 197, 94, 0.2); color: #22c55e; padding: 0.25rem 0.5rem; border-radius: 6px; font-size: 0.8rem;">
                            ${skill.level}
                        </span>
                        <span style="background: rgba(168, 85, 247, 0.2); color: #a855f7; padding: 0.25rem 0.5rem; border-radius: 6px; font-size: 0.8rem;">
                            <i class="${skill.icon}"></i>
                        </span>
                    </div>
                </div>
                <div class="content-item-controls">
                    <button class="control-btn edit" onclick="editSkill('${skill.id}')" title="Edit Skill">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="control-btn delete" onclick="deleteSkill('${skill.id}')" title="Delete Skill">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderProjectsList() {
        const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
        const projectsList = document.getElementById('projects-list');
        
        if (!projectsList) return;

        if (projects.length === 0) {
            projectsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-folder"></i>
                    <h3>No Projects Yet</h3>
                    <p>Start showcasing your work!</p>
                    <button class="btn-admin primary" onclick="openProjectModal()">
                        <i class="fas fa-plus"></i>
                        <span>Add Your First Project</span>
                    </button>
                </div>
            `;
            return;
        }

        projectsList.innerHTML = projects.map(project => `
            <div class="content-item">
                <div class="content-item-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div style="margin-top: 0.5rem;">
                        <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-bottom: 0.5rem;">
                            ${project.technologies.map(tech => `
                                <span style="background: rgba(99, 102, 241, 0.2); color: #6366f1; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.75rem;">
                                    ${tech}
                                </span>
                            `).join('')}
                        </div>
                        <div style="display: flex; gap: 0.5rem; font-size: 0.8rem;">
                            ${project.demo ? `<a href="${project.demo}" target="_blank" style="color: #22c55e;">Demo</a>` : ''}
                            ${project.code ? `<a href="${project.code}" target="_blank" style="color: #6366f1;">Code</a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="content-item-controls">
                    <button class="control-btn edit" onclick="editProject('${project.id}')" title="Edit Project">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="control-btn delete" onclick="deleteProject('${project.id}')" title="Delete Project">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderQuotesList() {
        const quotes = JSON.parse(localStorage.getItem('portfolio_quotes') || '[]');
        const quotesList = document.getElementById('quotes-list');
        
        if (!quotesList) return;

        if (quotes.length === 0) {
            quotesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-quote-left"></i>
                    <h3>No Quotes Yet</h3>
                    <p>Add some inspiring quotes!</p>
                    <button class="btn-admin primary" onclick="openQuoteModal()">
                        <i class="fas fa-plus"></i>
                        <span>Add Your First Quote</span>
                    </button>
                </div>
            `;
            return;
        }

        quotesList.innerHTML = quotes.map((quote, index) => `
            <div class="content-item">
                <div class="content-item-info">
                    <h3>"${quote.text}"</h3>
                    <p>- ${quote.author}</p>
                </div>
                <div class="content-item-controls">
                    <button class="control-btn edit" onclick="editQuote('${quote.id}')" title="Edit Quote">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="control-btn" onclick="showQuote(${index})" title="Show Quote">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="control-btn delete" onclick="deleteQuote('${quote.id}')" title="Delete Quote">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    setupDataManagement() {
        // Import file handler
        const importFile = document.getElementById('import-file');
        if (importFile) {
            importFile.addEventListener('change', (e) => this.handleImport(e));
        }

        // Setup skill filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Apply filter if skills manager exists
                if (window.skillsManager) {
                    skillsManager.filterSkills(filter);
                    this.renderSkillsList();
                }
            });
        });
    }

    handleImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                this.importData(data);
            } catch (error) {
                this.showNotification('Invalid JSON file', 'error');
            }
        };
        reader.readAsText(file);
    }

    importData(data) {
        if (confirm('This will replace all your current data. Are you sure?')) {
            // Import each data type if it exists
            if (data.services) {
                localStorage.setItem('portfolio_services', JSON.stringify(data.services));
            }
            if (data.skills) {
                localStorage.setItem('portfolio_skills', JSON.stringify(data.skills));
            }
            if (data.projects) {
                localStorage.setItem('portfolio_projects', JSON.stringify(data.projects));
            }
            if (data.quotes) {
                localStorage.setItem('portfolio_quotes', JSON.stringify(data.quotes));
            }
            if (data.personalInfo) {
                localStorage.setItem('portfolio_personal_info', JSON.stringify(data.personalInfo));
            }

            // Refresh all managers
            this.refreshAllManagers();
            this.updateStats();
            this.renderCurrentSection();
            
            this.showNotification('Data imported successfully!', 'success');
        }
    }

    refreshAllManagers() {
        // Refresh all manager instances
        if (window.servicesManager) {
            servicesManager.services = servicesManager.loadServices();
            servicesManager.renderServices();
        }
        if (window.skillsManager) {
            skillsManager.skills = skillsManager.loadSkills();
            skillsManager.renderSkills();
        }
        if (window.projectsManager) {
            projectsManager.projects = projectsManager.loadProjects();
            projectsManager.renderProjects();
        }
        if (window.quotesManager) {
            quotesManager.quotes = quotesManager.loadQuotes();
            quotesManager.renderQuoteDisplay();
        }
        if (window.personalInfoManager) {
            personalInfoManager.personalInfo = personalInfoManager.loadPersonalInfo();
            personalInfoManager.renderPersonalInfo();
        }
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

// Global functions for data management
function exportData() {
    const data = {
        services: JSON.parse(localStorage.getItem('portfolio_services') || '[]'),
        skills: JSON.parse(localStorage.getItem('portfolio_skills') || '[]'),
        projects: JSON.parse(localStorage.getItem('portfolio_projects') || '[]'),
        quotes: JSON.parse(localStorage.getItem('portfolio_quotes') || '[]'),
        personalInfo: JSON.parse(localStorage.getItem('portfolio_personal_info') || '{}'),
        exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    if (window.adminDashboard) {
        adminDashboard.showNotification('Data exported successfully!', 'success');
    }
}

function resetAllData() {
    if (confirm('This will delete ALL your portfolio data and restore defaults. This action cannot be undone. Are you sure?')) {
        if (confirm('Are you absolutely sure? This will permanently delete all your content.')) {
            // Clear all localStorage
            localStorage.removeItem('portfolio_services');
            localStorage.removeItem('portfolio_skills');
            localStorage.removeItem('portfolio_projects');
            localStorage.removeItem('portfolio_quotes');
            localStorage.removeItem('portfolio_personal_info');
            
            // Refresh page to reload defaults
            window.location.reload();
        }
    }
}

// Initialize admin dashboard
let adminDashboard;

document.addEventListener('DOMContentLoaded', () => {
    adminDashboard = new AdminDashboard();
});
