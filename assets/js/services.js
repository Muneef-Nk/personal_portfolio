// Services Management System
class ServicesManager {
    constructor() {
        this.services = this.loadServices();
        this.currentEditId = null;
        this.init();
    }

    init() {
        this.renderServices();
        this.setupEventListeners();
    }

    loadServices() {
        const savedServices = localStorage.getItem('portfolio_services');
        if (savedServices) {
            return JSON.parse(savedServices);
        }
        
        // Default services
        return [
            {
                id: 'service_1',
                title: 'Mobile App Development',
                description: 'Creating native and cross-platform mobile applications with user-friendly interfaces.',
                icon: 'fas fa-mobile-alt',
                featured: false,
                createdAt: new Date().toISOString()
            },
            {
                id: 'service_2',
                title: 'App Design',
                description: 'Crafting beautiful interfaces and user experiences for mobile applications.',
                icon: 'fas fa-code',
                featured: true,
                createdAt: new Date().toISOString()
            },
            {
                id: 'service_3',
                title: 'UI/UX Design',
                description: 'Building wireframes and prototypes for better design flow.',
                icon: 'fas fa-paint-brush',
                featured: false,
                createdAt: new Date().toISOString()
            },
            {
                id: 'service_4',
                title: 'Prototyping & Wireframing',
                description: 'Building wireframes and prototypes for better design flow.',
                icon: 'fas fa-layer-group',
                featured: false,
                createdAt: new Date().toISOString()
            }
        ];
    }

    saveServices() {
        localStorage.setItem('portfolio_services', JSON.stringify(this.services));
    }

    renderServices() {
        const grid = document.querySelector('.services-grid');
        if (!grid) return;

        grid.innerHTML = '';

        this.services.forEach(service => {
            const serviceCard = this.createServiceCard(service);
            grid.appendChild(serviceCard);
        });

        // Add empty state if no services
        if (this.services.length === 0) {
            grid.innerHTML = `
                <div class="empty-state curved-border">
                    <i class="fas fa-briefcase"></i>
                    <h3>No Services Yet</h3>
                    <p>Start building your services portfolio!</p>
                    <button class="btn-primary" onclick="openServiceModal()">
                        <i class="fas fa-plus"></i>
                        <span>Add Your First Service</span>
                    </button>
                </div>
            `;
        }
    }

    createServiceCard(service) {
        const card = document.createElement('div');
        card.className = `service-card ${service.featured ? 'featured' : ''}`;
        card.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        return card;
    }

    setupEventListeners() {
        const form = document.getElementById('service-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const serviceData = {
            title: formData.get('title'),
            description: formData.get('description'),
            icon: formData.get('icon'),
            featured: formData.get('featured') === 'on'
        };

        if (this.currentEditId) {
            this.updateService(this.currentEditId, serviceData);
        } else {
            this.addService(serviceData);
        }

        this.closeModal();
        this.renderServices();
    }

    addService(serviceData) {
        const newService = {
            id: 'service_' + Date.now(),
            ...serviceData,
            createdAt: new Date().toISOString()
        };
        
        this.services.push(newService);
        this.saveServices();
        
        this.showNotification('Service added successfully!', 'success');
    }

    updateService(id, serviceData) {
        const index = this.services.findIndex(s => s.id === id);
        if (index !== -1) {
            this.services[index] = {
                ...this.services[index],
                ...serviceData,
                updatedAt: new Date().toISOString()
            };
            this.saveServices();
            this.showNotification('Service updated successfully!', 'success');
        }
    }

    editService(id) {
        const service = this.services.find(s => s.id === id);
        if (!service) return;

        this.currentEditId = id;
        
        // Fill form with service data
        document.getElementById('service-title').value = service.title;
        document.getElementById('service-description').value = service.description;
        document.getElementById('service-icon').value = service.icon;
        document.getElementById('service-featured').checked = service.featured;
        
        // Update modal title
        document.getElementById('service-modal-title').textContent = 'Edit Service';
        document.getElementById('service-submit-text').textContent = 'Update Service';
        
        this.openModal();
    }

    deleteService(id) {
        const service = this.services.find(s => s.id === id);
        if (!service) return;

        if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
            this.services = this.services.filter(s => s.id !== id);
            this.saveServices();
            this.renderServices();
            this.showNotification('Service deleted successfully!', 'success');
        }
    }

    toggleFeatured(id) {
        const service = this.services.find(s => s.id === id);
        if (!service) return;

        service.featured = !service.featured;
        this.saveServices();
        this.renderServices();
        this.showNotification(`Service ${service.featured ? 'featured' : 'unfeatured'}!`, 'success');
    }

    openModal() {
        const modal = document.getElementById('service-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('service-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Reset form and state
        document.getElementById('service-form').reset();
        this.currentEditId = null;
        document.getElementById('service-modal-title').textContent = 'Add New Service';
        document.getElementById('service-submit-text').textContent = 'Add Service';
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
let servicesManager;

function openServiceModal() {
    servicesManager.openModal();
}

function closeServiceModal() {
    servicesManager.closeModal();
}

function editService(id) {
    servicesManager.editService(id);
}

function deleteService(id) {
    servicesManager.deleteService(id);
}

function toggleFeatured(id) {
    servicesManager.toggleFeatured(id);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    servicesManager = new ServicesManager();
    
    // Close modal when clicking outside
    document.getElementById('service-modal')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeServiceModal();
        }
    });
});
