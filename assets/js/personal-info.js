// Personal Information Management System
class PersonalInfoManager {
    constructor() {
        this.personalInfo = this.loadPersonalInfo();
        this.init();
    }

    init() {
        this.renderPersonalInfo();
        this.setupEventListeners();
    }

    loadPersonalInfo() {
        const savedInfo = localStorage.getItem('portfolio_personal_info');
        if (savedInfo) {
            return JSON.parse(savedInfo);
        }
        
        // Default personal information
        return {
            hero: {
                name: 'Muhammed Muneef',
                role: 'Mobile App Developer',
                description: 'Passionate mobile app developer. I create intuitive and visually appealing mobile experiences. I transform ideas into seamless apps that meet users\' expectations.',
                badge: 'WELCOME TO MY WORLD ✨'
            },
            about: {
                title: 'About me',
                description: 'Welcome to my portfolio! I\'m Muhammed Muneef, a passionate mobile app developer dedicated to creating seamless and visually engaging digital experiences. With 2+ years of experience, I specialize in designing intuitive interfaces that enhance user experience.'
            },
            contact: {
                email: 'md.muneefnk@gmail.com',
                phone: '+1 234 567 890',
                location: 'Kochi, Kerala, India'
            },
            social: {
                github: '#',
                linkedin: '#',
                twitter: '#',
                instagram: '#'
            },
            footer: {
                brandText: 'Muhammed Muneef M',
                tagline: 'Creating digital experiences that matter.',
                copyright: 'Muhammed Muneef. Crafted with ❤️'
            }
        };
    }

    savePersonalInfo() {
        localStorage.setItem('portfolio_personal_info', JSON.stringify(this.personalInfo));
    }

    renderPersonalInfo() {
        this.updateHeroSection();
        this.updateAboutSection();
        this.updateContactSection();
        this.updateSocialLinks();
        this.updateFooter();
    }

    updateHeroSection() {
        const nameElement = document.querySelector('.title-greeting');
        const roleElement = document.querySelector('.role-highlight');
        const descriptionElement = document.querySelector('.hero-description');
        const badgeElement = document.querySelector('.badge-text');

        if (nameElement) nameElement.textContent = this.personalInfo.hero.name;
        if (roleElement) roleElement.textContent = this.personalInfo.hero.role;
        if (descriptionElement) descriptionElement.textContent = this.personalInfo.hero.description;
        if (badgeElement) badgeElement.textContent = this.personalInfo.hero.badge;
    }

    updateAboutSection() {
        const titleElement = document.querySelector('#about .section-title');
        const descriptionElement = document.querySelector('#about .section-subtitle');

        if (titleElement) titleElement.textContent = this.personalInfo.about.title;
        if (descriptionElement) descriptionElement.textContent = this.personalInfo.about.description;
    }

    updateContactSection() {
        const emailElements = document.querySelectorAll('a[href^="mailto:"]');
        const phoneElements = document.querySelectorAll('a[href^="tel:"]');
        const locationElement = document.querySelector('.contact-card:nth-child(3) p');

        emailElements.forEach(el => {
            el.href = `mailto:${this.personalInfo.contact.email}`;
            const textEl = el.parentElement.querySelector('p');
            if (textEl) textEl.textContent = this.personalInfo.contact.email;
        });

        phoneElements.forEach(el => {
            el.href = `tel:${this.personalInfo.contact.phone.replace(/\s/g, '')}`;
            const textEl = el.parentElement.querySelector('p');
            if (textEl) textEl.textContent = this.personalInfo.contact.phone;
        });

        if (locationElement) {
            locationElement.textContent = this.personalInfo.contact.location;
        }
    }

    updateSocialLinks() {
        const githubLinks = document.querySelectorAll('a[aria-label="GitHub"], .social-link .fa-github');
        const linkedinLinks = document.querySelectorAll('a[aria-label="LinkedIn"], .social-link .fa-linkedin');
        const twitterLinks = document.querySelectorAll('a[aria-label="Twitter"], .social-link .fa-twitter');
        const instagramLinks = document.querySelectorAll('.social-link .fa-instagram');

        githubLinks.forEach(el => {
            const link = el.tagName === 'A' ? el : el.closest('a');
            if (link) link.href = this.personalInfo.social.github;
        });

        linkedinLinks.forEach(el => {
            const link = el.tagName === 'A' ? el : el.closest('a');
            if (link) link.href = this.personalInfo.social.linkedin;
        });

        twitterLinks.forEach(el => {
            const link = el.tagName === 'A' ? el : el.closest('a');
            if (link) link.href = this.personalInfo.social.twitter;
        });

        instagramLinks.forEach(el => {
            const link = el.tagName === 'A' ? el : el.closest('a');
            if (link) link.href = this.personalInfo.social.instagram;
        });
    }

    updateFooter() {
        const brandElement = document.querySelector('.footer-brand .logo-text');
        const taglineElement = document.querySelector('.footer-brand p');
        const copyrightElement = document.querySelector('.footer-bottom p');
        const yearElement = document.getElementById('year');

        if (brandElement) brandElement.textContent = this.personalInfo.footer.brandText;
        if (taglineElement) taglineElement.textContent = this.personalInfo.footer.tagline;
        if (yearElement) yearElement.textContent = new Date().getFullYear();
        if (copyrightElement) {
            copyrightElement.innerHTML = `&copy; <span id="year">${new Date().getFullYear()}</span> ${this.personalInfo.footer.copyright}`;
        }
    }

    setupEventListeners() {
        const form = document.getElementById('personal-info-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        this.personalInfo = {
            hero: {
                name: formData.get('hero-name'),
                role: formData.get('hero-role'),
                description: formData.get('hero-description'),
                badge: formData.get('hero-badge')
            },
            about: {
                title: formData.get('about-title'),
                description: formData.get('about-description')
            },
            contact: {
                email: formData.get('contact-email'),
                phone: formData.get('contact-phone'),
                location: formData.get('contact-location')
            },
            social: {
                github: formData.get('social-github'),
                linkedin: formData.get('social-linkedin'),
                twitter: formData.get('social-twitter'),
                instagram: formData.get('social-instagram')
            },
            footer: {
                brandText: formData.get('footer-brand'),
                tagline: formData.get('footer-tagline'),
                copyright: formData.get('footer-copyright')
            }
        };

        this.savePersonalInfo();
        this.renderPersonalInfo();
        this.closeModal();
        this.showNotification('Personal information updated successfully!', 'success');
    }

    openModal() {
        const modal = document.getElementById('personal-info-modal');
        if (modal) {
            // Fill form with current data
            this.fillForm();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('personal-info-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    fillForm() {
        document.getElementById('hero-name').value = this.personalInfo.hero.name;
        document.getElementById('hero-role').value = this.personalInfo.hero.role;
        document.getElementById('hero-description').value = this.personalInfo.hero.description;
        document.getElementById('hero-badge').value = this.personalInfo.hero.badge;
        
        document.getElementById('about-title').value = this.personalInfo.about.title;
        document.getElementById('about-description').value = this.personalInfo.about.description;
        
        document.getElementById('contact-email').value = this.personalInfo.contact.email;
        document.getElementById('contact-phone').value = this.personalInfo.contact.phone;
        document.getElementById('contact-location').value = this.personalInfo.contact.location;
        
        document.getElementById('social-github').value = this.personalInfo.social.github;
        document.getElementById('social-linkedin').value = this.personalInfo.social.linkedin;
        document.getElementById('social-twitter').value = this.personalInfo.social.twitter;
        document.getElementById('social-instagram').value = this.personalInfo.social.instagram;
        
        document.getElementById('footer-brand').value = this.personalInfo.footer.brandText;
        document.getElementById('footer-tagline').value = this.personalInfo.footer.tagline;
        document.getElementById('footer-copyright').value = this.personalInfo.footer.copyright;
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

// Global functions
let personalInfoManager;

function openPersonalInfoModal() {
    personalInfoManager.openModal();
}

function closePersonalInfoModal() {
    personalInfoManager.closeModal();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    personalInfoManager = new PersonalInfoManager();
    
    // Close modal when clicking outside
    document.getElementById('personal-info-modal')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closePersonalInfoModal();
        }
    });
});
