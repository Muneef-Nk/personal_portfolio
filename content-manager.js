// Content Manager - Handles dynamic content loading and LIFO display
class ContentManager {
    constructor() {
        this.data = websiteData;
        this.init();
    }

    init() {
        this.loadDevelopmentJourney();
        this.loadServices();
        this.loadQuotes();
        this.loadSkills();
        this.loadProjects();
        this.loadPersonalInfo();
    }

    // LIFO Helper - Reverses array to show newest first
    getLIFOArray(array) {
        return [...array].reverse();
    }

    // Load Development Journey (LIFO - newest experiences first)
    loadDevelopmentJourney() {
        const container = document.querySelector('.developer-journey-content');
        if (!container) return;

        const journeyData = this.getLIFOArray(this.data.developmentJourney);
        container.innerHTML = '';

        journeyData.forEach((item, index) => {
            const journeyItem = document.createElement('div');
            journeyItem.className = `journey-item ${item.type}`;
            journeyItem.innerHTML = `
                <div class="journey-year">${item.year}</div>
                <div class="journey-content">
                    <h3 class="journey-title">${item.title}</h3>
                    <p class="journey-description">${item.description}</p>
                    <div class="journey-technologies">
                        ${item.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
            `;
            container.appendChild(journeyItem);
        });
    }

    // Load Services (LIFO - newest services first)
    loadServices() {
        const container = document.querySelector('.services-grid');
        if (!container) return;

        const servicesData = this.getLIFOArray(this.data.services);
        container.innerHTML = '';

        servicesData.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = `service-card ${service.featured ? 'featured' : ''}`;
            serviceCard.innerHTML = `
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <div class="service-content">
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-description">${service.description}</p>
                    <div class="service-technologies">
                        ${service.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            `;
            container.appendChild(serviceCard);
        });
    }

    // Load Quotes (LIFO - newest quotes first)
    loadQuotes() {
        const container = document.querySelector('.quotes-container');
        if (!container) return;

        const quotesData = this.getLIFOArray(this.data.quotes);
        container.innerHTML = '';

        quotesData.forEach((quote, index) => {
            const quoteCard = document.createElement('div');
            quoteCard.className = 'quote-card modern-card';
            quoteCard.setAttribute('data-slide', index);
            quoteCard.innerHTML = `
                <div class="quote-content">
                    <div class="quote-icon">
                        <i class="fas fa-quote-left"></i>
                    </div>
                    <blockquote class="quote-text">"${quote.text}"</blockquote>
                    <div class="quote-author">
                        <span class="author-name">— ${quote.author}</span>
                        <span class="quote-category">${quote.category}</span>
                    </div>
                </div>
            `;
            container.appendChild(quoteCard);
        });

        // Reinitialize quote slider if it exists
        if (typeof initQuoteSlider === 'function') {
            initQuoteSlider();
        }
    }

    // Load Skills (LIFO - newest skills first in each category)
    loadSkills() {
        const categories = ['mobile', 'web', 'backend', 'tools'];
        
        categories.forEach(category => {
            const container = document.querySelector(`[data-category="${category}"].skills-grid-unique`);
            if (!container) return;

            const skillsData = this.getLIFOArray(this.data.skills[category]);
            container.innerHTML = '';

            skillsData.forEach(skill => {
                const skillHex = document.createElement('div');
                skillHex.className = 'skill-hex';
                skillHex.innerHTML = `
                    <div class="hex-inner">
                        <div class="skill-content">
                            <img src="${skill.icon}" alt="${skill.name}">
                            <span>${skill.name}</span>
                            <div class="skill-level">${skill.level}</div>
                            <div class="skill-experience">${skill.experience}</div>
                        </div>
                    </div>
                `;
                container.appendChild(skillHex);
            });
        });
    }

    // Load Projects (LIFO - newest projects first)
    loadProjects() {
        const container = document.querySelector('.projects-grid-new');
        if (!container) return;

        const projectsData = this.getLIFOArray(this.data.projects);
        container.innerHTML = '';

        projectsData.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = `project-card-new ${project.featured ? 'featured' : ''}`;
            projectCard.innerHTML = `
                <div class="project-image">
                    <div class="project-placeholder">
                        <i class="${project.image}"></i>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.githubUrl}" class="project-link github-link">
                            <i class="fab fa-github"></i>
                            <span>GitHub</span>
                        </a>
                        <a href="${project.liveUrl}" class="project-link live-link">
                            <i class="fas fa-external-link-alt"></i>
                            <span>Live Demo</span>
                        </a>
                    </div>
                </div>
            `;
            container.appendChild(projectCard);
        });
    }

    // Load Personal Information
    loadPersonalInfo() {
        const personal = this.data.personal;
        
        // Update name and title
        const nameElements = document.querySelectorAll('.hero-name, .brand-name-footer');
        nameElements.forEach(el => el.textContent = personal.name);
        
        const titleElements = document.querySelectorAll('.hero-title');
        titleElements.forEach(el => el.textContent = personal.title);
        
        // Update contact information
        const emailElements = document.querySelectorAll('.contact-value');
        emailElements.forEach(el => {
            if (el.textContent.includes('@')) {
                el.textContent = personal.email;
            }
        });
        
        // Update tagline
        const taglineElements = document.querySelectorAll('.brand-tagline-footer');
        taglineElements.forEach(el => el.textContent = personal.tagline);
    }

    // Method to add new content (automatically appears first due to LIFO)
    addContent(section, newItem) {
        if (this.data[section]) {
            // Add new item with incremented ID
            const maxId = Math.max(...this.data[section].map(item => item.id), 0);
            newItem.id = maxId + 1;
            
            this.data[section].push(newItem);
            
            // Reload the specific section
            switch(section) {
                case 'developmentJourney':
                    this.loadDevelopmentJourney();
                    break;
                case 'services':
                    this.loadServices();
                    break;
                case 'quotes':
                    this.loadQuotes();
                    break;
                case 'projects':
                    this.loadProjects();
                    break;
            }
        }
    }

    // Method to add new skill
    addSkill(category, newSkill) {
        if (this.data.skills[category]) {
            const maxId = Math.max(...this.data.skills[category].map(skill => skill.id), 0);
            newSkill.id = maxId + 1;
            
            this.data.skills[category].push(newSkill);
            this.loadSkills();
        }
    }

    // Method to remove content by ID
    removeContent(section, id) {
        if (this.data[section]) {
            this.data[section] = this.data[section].filter(item => item.id !== id);
            
            // Reload the specific section
            switch(section) {
                case 'developmentJourney':
                    this.loadDevelopmentJourney();
                    break;
                case 'services':
                    this.loadServices();
                    break;
                case 'quotes':
                    this.loadQuotes();
                    break;
                case 'projects':
                    this.loadProjects();
                    break;
            }
        }
    }

    // Method to get current data (for debugging or external use)
    getData() {
        return this.data;
    }
}

// Initialize content manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all other scripts are loaded
    setTimeout(() => {
        window.contentManager = new ContentManager();
        console.log('Content Manager initialized with LIFO display');
    }, 100);
});

// Example usage functions (for easy content updates)
function addNewProject(projectData) {
    if (window.contentManager) {
        window.contentManager.addContent('projects', projectData);
    }
}

function addNewSkill(category, skillData) {
    if (window.contentManager) {
        window.contentManager.addSkill(category, skillData);
    }
}

function addNewQuote(quoteData) {
    if (window.contentManager) {
        window.contentManager.addContent('quotes', quoteData);
    }
}

// Export for console usage
window.addNewProject = addNewProject;
window.addNewSkill = addNewSkill;
window.addNewQuote = addNewQuote;
