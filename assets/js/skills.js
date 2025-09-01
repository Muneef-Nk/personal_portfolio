// Skills Management System
class SkillsManager {
    constructor() {
        this.skills = this.loadSkills();
        this.currentEditId = null;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderSkills();
        this.setupEventListeners();
        this.setupCategoryFilters();
    }

    loadSkills() {
        const savedSkills = localStorage.getItem('portfolio_skills');
        if (savedSkills) {
            return JSON.parse(savedSkills);
        }
        
        // Default skills
        return [
            {
                id: 'skill_1',
                name: 'Flutter Development',
                description: 'Cross-platform mobile app development with Flutter and Dart for iOS and Android.',
                category: 'mobile',
                level: 'expert',
                icon: 'fas fa-mobile-alt',
                createdAt: new Date().toISOString()
            },
            {
                id: 'skill_2',
                name: 'React Native',
                description: 'Building native mobile apps using React Native with JavaScript and TypeScript.',
                category: 'mobile',
                level: 'advanced',
                icon: 'fab fa-react',
                createdAt: new Date().toISOString()
            },
            {
                id: 'skill_3',
                name: 'iOS Development (Swift)',
                description: 'Native iOS app development using Swift, UIKit, and SwiftUI frameworks.',
                category: 'mobile',
                level: 'advanced',
                icon: 'fab fa-apple',
                createdAt: new Date().toISOString()
            },
            {
                id: 'skill_4',
                name: 'Android Development (Kotlin)',
                description: 'Native Android development with Kotlin, Jetpack Compose, and modern Android architecture.',
                category: 'mobile',
                level: 'advanced',
                icon: 'fab fa-android',
                createdAt: new Date().toISOString()
            },
            {
                id: 'skill_5',
                name: 'Firebase Integration',
                description: 'Backend services, authentication, real-time database, and cloud functions for mobile apps.',
                category: 'backend',
                level: 'advanced',
                icon: 'fas fa-fire',
                createdAt: new Date().toISOString()
            },
            {
                id: 'skill_6',
                name: 'Mobile UI/UX Design',
                description: 'Creating intuitive and beautiful mobile interfaces with modern design principles.',
                category: 'design',
                level: 'intermediate',
                icon: 'fas fa-paint-brush',
                createdAt: new Date().toISOString()
            },
            {
                id: 'skill_7',
                name: 'API Integration',
                description: 'RESTful APIs, GraphQL, and third-party service integrations for mobile applications.',
                category: 'backend',
                level: 'advanced',
                icon: 'fas fa-plug',
                createdAt: new Date().toISOString()
            },
            {
                id: 'skill_8',
                name: 'App Store Deployment',
                description: 'Publishing apps to Google Play Store and Apple App Store with CI/CD pipelines.',
                category: 'deployment',
                level: 'intermediate',
                icon: 'fas fa-rocket',
                createdAt: new Date().toISOString()
            }
        ];
    }

    saveSkills() {
        localStorage.setItem('portfolio_skills', JSON.stringify(this.skills));
    }

    renderSkills() {
        const grid = document.getElementById('skills-grid');
        if (!grid) return;

        grid.innerHTML = '';

        const filteredSkills = this.currentFilter === 'all' 
            ? this.skills 
            : this.skills.filter(skill => skill.category === this.currentFilter);

        filteredSkills.forEach(skill => {
            const skillCard = this.createSkillCard(skill);
            grid.appendChild(skillCard);
        });

        // Add empty state if no skills
        if (filteredSkills.length === 0) {
            grid.innerHTML = `
                <div class="empty-state curved-border">
                    <i class="fas fa-tools"></i>
                    <h3>No Skills Found</h3>
                    <p>${this.currentFilter === 'all' ? 'Start building your skills portfolio!' : `No skills found in ${this.currentFilter} category.`}</p>
                    <button class="btn-primary" onclick="openSkillModal()">
                        <i class="fas fa-plus"></i>
                        <span>Add New Skill</span>
                    </button>
                </div>
            `;
        }
    }

    createSkillCard(skill) {
        const card = document.createElement('div');
        card.className = 'skill-card curved-border';
        card.innerHTML = `
            <div class="skill-header">
                <i class="skill-icon ${skill.icon}"></i>
                <div class="skill-controls">
                    <button class="control-btn edit" onclick="editSkill('${skill.id}')" title="Edit Skill">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="control-btn delete" onclick="deleteSkill('${skill.id}')" title="Delete Skill">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <h3>${skill.name}</h3>
            <p class="skill-description">${skill.description}</p>
            
            <div class="skill-meta">
                <span class="skill-level ${skill.level}">${skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}</span>
                <span class="skill-category">${skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}</span>
            </div>
        `;
        return card;
    }

    setupEventListeners() {
        const form = document.getElementById('skill-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    setupCategoryFilters() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                this.filterSkills(category);
                
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    filterSkills(category) {
        this.currentFilter = category;
        this.renderSkills();
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const skillData = {
            name: formData.get('name'),
            description: formData.get('description'),
            category: formData.get('category'),
            level: formData.get('level'),
            icon: formData.get('icon')
        };

        if (this.currentEditId) {
            this.updateSkill(this.currentEditId, skillData);
        } else {
            this.addSkill(skillData);
        }

        this.closeModal();
        this.renderSkills();
    }

    addSkill(skillData) {
        const newSkill = {
            id: 'skill_' + Date.now(),
            ...skillData,
            createdAt: new Date().toISOString()
        };
        
        this.skills.unshift(newSkill);
        this.saveSkills();
        
        this.showNotification('Skill added successfully!', 'success');
    }

    updateSkill(id, skillData) {
        const index = this.skills.findIndex(s => s.id === id);
        if (index !== -1) {
            this.skills[index] = {
                ...this.skills[index],
                ...skillData,
                updatedAt: new Date().toISOString()
            };
            this.saveSkills();
            this.showNotification('Skill updated successfully!', 'success');
        }
    }

    editSkill(id) {
        const skill = this.skills.find(s => s.id === id);
        if (!skill) return;

        this.currentEditId = id;
        
        // Fill form with skill data
        document.getElementById('skill-name').value = skill.name;
        document.getElementById('skill-description').value = skill.description;
        document.getElementById('skill-category').value = skill.category;
        document.getElementById('skill-level').value = skill.level;
        document.getElementById('skill-icon').value = skill.icon;
        
        // Update modal title
        document.getElementById('modal-title').textContent = 'Edit Skill';
        document.getElementById('submit-text').textContent = 'Update Skill';
        
        this.openModal();
    }

    deleteSkill(id) {
        const skill = this.skills.find(s => s.id === id);
        if (!skill) return;

        if (confirm(`Are you sure you want to delete "${skill.name}"?`)) {
            this.skills = this.skills.filter(s => s.id !== id);
            this.saveSkills();
            this.renderSkills();
            this.showNotification('Skill deleted successfully!', 'success');
        }
    }

    openModal() {
        const modal = document.getElementById('skill-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('skill-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Reset form and state
        document.getElementById('skill-form').reset();
        this.currentEditId = null;
        document.getElementById('modal-title').textContent = 'Add New Skill';
        document.getElementById('submit-text').textContent = 'Add Skill';
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
let skillsManager;

function openSkillModal() {
    skillsManager.openModal();
}

function closeSkillModal() {
    skillsManager.closeModal();
}

function editSkill(id) {
    skillsManager.editSkill(id);
}

function deleteSkill(id) {
    skillsManager.deleteSkill(id);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    skillsManager = new SkillsManager();
    
    // Close modal when clicking outside
    document.getElementById('skill-modal')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeSkillModal();
        }
    });
});
