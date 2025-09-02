// Auto-scrolling quotes functionality
class QuotesSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.quote-slide');
        this.indicators = document.querySelectorAll('.quote-indicators .indicator');
        this.autoScrollInterval = null;
        this.init();
    }

    init() {
        this.startAutoScroll();
        this.setupIndicators();
        
        // Pause auto-scroll on hover
        const slider = document.querySelector('.quotes-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => this.pauseAutoScroll());
            slider.addEventListener('mouseleave', () => this.startAutoScroll());
        }
    }

    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            this.nextSlide();
        }, 4000); // Change slide every 4 seconds
    }

    pauseAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }

    updateSlider() {
        // Remove active class from all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].classList.add('active');
        }
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.add('active');
        }
    }

    setupIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.pauseAutoScroll();
                this.goToSlide(index);
                // Restart auto-scroll after manual selection
                setTimeout(() => this.startAutoScroll(), 1000);
            });
        });
    }
}

// Resume download functionality
function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'assets/resume/Muhammed_Muneef_Resume.pdf'; // You'll need to add your resume file here
    link.download = 'Muhammed_Muneef_Resume.pdf';
    link.target = '_blank';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Show a toast notification
    showToast('Resume download started!');
}

// Toast notification function
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    
    // Style the toast
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #d946ef, #a855f7);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(212, 70, 239, 0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// Initialize quotes slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuotesSlider();
    
    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
