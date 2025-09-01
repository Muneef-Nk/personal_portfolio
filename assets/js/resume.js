// Resume Management System
class ResumeManager {
    constructor() {
        this.resumeData = this.loadResumeData();
        this.isEditMode = false;
        this.init();
    }

    init() {
        this.renderResume();
        this.setupEventListeners();
    }

    loadResumeData() {
        const savedData = localStorage.getItem('portfolio_resume');
        if (savedData) {
            return JSON.parse(savedData);
        }
        
        // Default resume data
        return {
            personalInfo: {
                name: 'Muhammed Muneef',
                title: 'Full Stack Developer',
                email: 'md.muneefnk@gmail.com',
                phone: '+91 9876543210',
                location: 'Kochi, Kerala, India',
                linkedin: 'linkedin.com/in/muneef'
            },
            summary: 'Passionate Full Stack Developer with 2+ years of experience in creating innovative web and mobile applications. Specialized in modern JavaScript frameworks, Python Django, and mobile app development for iOS and Android platforms. Strong expertise in payment integration, Google Maps API, and building scalable solutions.',
            experience: [
                {
                    id: 'exp_1',
                    title: 'Full Stack Developer',
                    company: 'Tech Solutions Inc.',
                    startDate: '2022-01',
                    endDate: null,
                    current: true,
                    description: 'Developed and maintained multiple web applications using React, Node.js, and Python Django. Implemented payment gateways and integrated Google Maps API for location-based services.'
                },
                {
                    id: 'exp_2',
                    title: 'Mobile App Developer',
                    company: 'Digital Innovations',
                    startDate: '2021-06',
                    endDate: '2021-12',
                    current: false,
                    description: 'Built native iOS and Android applications using Swift and Kotlin. Collaborated with design teams to create user-friendly interfaces and implemented backend APIs.'
                }
            ],
            education: [
                {
                    id: 'edu_1',
                    degree: 'Bachelor of Computer Science',
                    institution: 'University of Kerala',
                    startDate: '2018-06',
                    endDate: '2022-05',
                    description: 'Graduated with First Class Honors. Specialized in Software Engineering and Database Management.'
                }
            ],
            certifications: [
                {
                    id: 'cert_1',
                    name: 'AWS Certified Developer',
                    issuer: 'Amazon Web Services',
                    date: '2023-03',
                    credentialId: 'AWS-DEV-2023-001'
                },
                {
                    id: 'cert_2',
                    name: 'iOS App Development',
                    issuer: 'Apple Developer Academy',
                    date: '2022-08',
                    credentialId: 'APPLE-IOS-2022-045'
                }
            ]
        };
    }

    saveResumeData() {
        localStorage.setItem('portfolio_resume', JSON.stringify(this.resumeData));
    }

    renderResume() {
        this.renderPersonalInfo();
        this.renderSummary();
        this.renderExperience();
        this.renderEducation();
        this.renderCertifications();
    }

    renderPersonalInfo() {
        const personalInfo = this.resumeData.personalInfo;
        document.querySelector('[data-field="name"]').textContent = personalInfo.name;
        document.querySelector('[data-field="title"]').textContent = personalInfo.title;
        document.querySelector('[data-field="email"]').textContent = personalInfo.email;
        document.querySelector('[data-field="phone"]').textContent = personalInfo.phone;
        document.querySelector('[data-field="location"]').textContent = personalInfo.location;
        document.querySelector('[data-field="linkedin"]').textContent = personalInfo.linkedin;
    }

    renderSummary() {
        document.querySelector('[data-field="summary"]').textContent = this.resumeData.summary;
    }

    renderExperience() {
        const container = document.getElementById('experience-list');
        container.innerHTML = '';

        this.resumeData.experience.forEach(exp => {
            const expElement = document.createElement('div');
            expElement.className = 'experience-item curved-border';
            expElement.innerHTML = `
                <div class="experience-header">
                    <div>
                        <div class="experience-title">${exp.title}</div>
                        <div class="experience-company">${exp.company}</div>
                        <div class="experience-date">
                            ${this.formatDate(exp.startDate)} - ${exp.current ? 'Present' : this.formatDate(exp.endDate)}
                        </div>
                    </div>
                    <div class="experience-controls" style="display: ${this.isEditMode ? 'flex' : 'none'};">
                        <button class="control-btn edit" onclick="editExperience('${exp.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="control-btn delete" onclick="deleteExperience('${exp.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="experience-description">${exp.description}</div>
            `;
            container.appendChild(expElement);
        });
    }

    renderEducation() {
        const container = document.getElementById('education-list');
        container.innerHTML = '';

        this.resumeData.education.forEach(edu => {
            const eduElement = document.createElement('div');
            eduElement.className = 'education-item curved-border';
            eduElement.innerHTML = `
                <div class="experience-header">
                    <div>
                        <div class="experience-title">${edu.degree}</div>
                        <div class="experience-company">${edu.institution}</div>
                        <div class="experience-date">
                            ${this.formatDate(edu.startDate)} - ${this.formatDate(edu.endDate)}
                        </div>
                    </div>
                    <div class="experience-controls" style="display: ${this.isEditMode ? 'flex' : 'none'};">
                        <button class="control-btn edit" onclick="editEducation('${edu.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="control-btn delete" onclick="deleteEducation('${edu.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                ${edu.description ? `<div class="experience-description">${edu.description}</div>` : ''}
            `;
            container.appendChild(eduElement);
        });
    }

    renderCertifications() {
        const container = document.getElementById('certifications-list');
        container.innerHTML = '';

        this.resumeData.certifications.forEach(cert => {
            const certElement = document.createElement('div');
            certElement.className = 'certification-item curved-border';
            certElement.innerHTML = `
                <div class="experience-header">
                    <div>
                        <div class="experience-title">${cert.name}</div>
                        <div class="experience-company">${cert.issuer}</div>
                        <div class="experience-date">${this.formatDate(cert.date)}</div>
                        ${cert.credentialId ? `<div class="credential-id">ID: ${cert.credentialId}</div>` : ''}
                    </div>
                    <div class="experience-controls" style="display: ${this.isEditMode ? 'flex' : 'none'};">
                        <button class="control-btn edit" onclick="editCertification('${cert.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="control-btn delete" onclick="deleteCertification('${cert.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(certElement);
        });
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString + '-01');
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }

    setupEventListeners() {
        // Experience form
        const expForm = document.getElementById('experience-form');
        if (expForm) {
            expForm.addEventListener('submit', (e) => this.handleExperienceSubmit(e));
        }
    }

    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        const editBtn = document.getElementById('edit-btn-text');
        const addBtns = document.querySelectorAll('.add-btn');
        const editableElements = document.querySelectorAll('[contenteditable]');
        const controls = document.querySelectorAll('.experience-controls');

        if (this.isEditMode) {
            editBtn.textContent = 'Save Changes';
            document.body.classList.add('edit-mode');
            
            // Make elements editable
            editableElements.forEach(el => {
                el.contentEditable = 'true';
            });
            
            // Show add buttons and controls
            addBtns.forEach(btn => btn.style.display = 'block');
            controls.forEach(ctrl => ctrl.style.display = 'flex');
            
        } else {
            editBtn.textContent = 'Edit Resume';
            document.body.classList.remove('edit-mode');
            
            // Save changes and make non-editable
            this.saveEditableChanges();
            editableElements.forEach(el => {
                el.contentEditable = 'false';
            });
            
            // Hide add buttons and controls
            addBtns.forEach(btn => btn.style.display = 'none');
            controls.forEach(ctrl => ctrl.style.display = 'none');
            
            this.showNotification('Resume updated successfully!', 'success');
        }
    }

    saveEditableChanges() {
        // Save personal info changes
        const personalFields = ['name', 'title', 'email', 'phone', 'location', 'linkedin'];
        personalFields.forEach(field => {
            const element = document.querySelector(`[data-field="${field}"]`);
            if (element) {
                this.resumeData.personalInfo[field] = element.textContent.trim();
            }
        });

        // Save summary changes
        const summaryElement = document.querySelector('[data-field="summary"]');
        if (summaryElement) {
            this.resumeData.summary = summaryElement.textContent.trim();
        }

        this.saveResumeData();
    }

    handleExperienceSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const expData = {
            title: formData.get('title'),
            company: formData.get('company'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            current: formData.has('current'),
            description: formData.get('description')
        };

        this.addExperience(expData);
        this.closeExperienceModal();
        this.renderExperience();
    }

    addExperience(expData) {
        const newExp = {
            id: 'exp_' + Date.now(),
            ...expData
        };
        
        this.resumeData.experience.unshift(newExp);
        this.saveResumeData();
        this.showNotification('Experience added successfully!', 'success');
    }

    downloadResume() {
        // Create a simplified text version for download
        const resumeText = this.generateResumeText();
        
        const blob = new Blob([resumeText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        this.showNotification('Resume downloaded successfully!', 'success');
    }

    generateResumeText() {
        const data = this.resumeData;
        let text = `${data.personalInfo.name}\n`;
        text += `${data.personalInfo.title}\n`;
        text += `Email: ${data.personalInfo.email}\n`;
        text += `Phone: ${data.personalInfo.phone}\n`;
        text += `Location: ${data.personalInfo.location}\n`;
        text += `LinkedIn: ${data.personalInfo.linkedin}\n\n`;
        
        text += `PROFESSIONAL SUMMARY\n`;
        text += `${data.summary}\n\n`;
        
        text += `WORK EXPERIENCE\n`;
        data.experience.forEach(exp => {
            text += `${exp.title} at ${exp.company}\n`;
            text += `${this.formatDate(exp.startDate)} - ${exp.current ? 'Present' : this.formatDate(exp.endDate)}\n`;
            text += `${exp.description}\n\n`;
        });
        
        text += `EDUCATION\n`;
        data.education.forEach(edu => {
            text += `${edu.degree}\n`;
            text += `${edu.institution}\n`;
            text += `${this.formatDate(edu.startDate)} - ${this.formatDate(edu.endDate)}\n`;
            if (edu.description) text += `${edu.description}\n`;
            text += `\n`;
        });
        
        text += `CERTIFICATIONS\n`;
        data.certifications.forEach(cert => {
            text += `${cert.name}\n`;
            text += `${cert.issuer} - ${this.formatDate(cert.date)}\n`;
            if (cert.credentialId) text += `Credential ID: ${cert.credentialId}\n`;
            text += `\n`;
        });
        
        return text;
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

    openExperienceModal() {
        const modal = document.getElementById('experience-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeExperienceModal() {
        const modal = document.getElementById('experience-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        document.getElementById('experience-form').reset();
    }
}

// Global functions
let resumeManager;

function toggleEditMode() {
    resumeManager.toggleEditMode();
}

function downloadResume() {
    resumeManager.downloadResume();
}

function addExperience() {
    resumeManager.openExperienceModal();
}

function closeExperienceModal() {
    resumeManager.closeExperienceModal();
}

function editExperience(id) {
    // Implementation for editing experience
    console.log('Edit experience:', id);
}

function deleteExperience(id) {
    // Implementation for deleting experience
    console.log('Delete experience:', id);
}

function addEducation() {
    // Implementation for adding education
    console.log('Add education');
}

function addCertification() {
    // Implementation for adding certification
    console.log('Add certification');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    resumeManager = new ResumeManager();
    
    // Close modal when clicking outside
    document.getElementById('experience-modal')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeExperienceModal();
        }
    });
});
