// Interactive Home Page Animations and Effects
document.addEventListener('DOMContentLoaded', function() {
    
    // Counter Animation for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + (target === 100 ? '%' : '');
            }, 16);
        });
    }
    
    // Trigger counter animation when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.stats-showcase');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Button Ripple Effect
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = button.querySelector('.btn-ripple');
        
        if (ripple) {
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-active');
            
            setTimeout(() => {
                ripple.classList.remove('ripple-active');
            }, 600);
        }
    }
    
    // Add ripple effect to buttons
    const rippleButtons = document.querySelectorAll('.btn-primary-modern');
    rippleButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Parallax effect for floating elements
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.orb, .neural-node, .tech-badge');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
    
    // Throttled scroll handler
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleParallax);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16);
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Interactive hover effects for tech badges
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(217, 70, 239, 0.3)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Device screen app icons interaction
    const appIcons = document.querySelectorAll('.app-icon');
    appIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.backgroundColor = 'rgba(217, 70, 239, 0.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.backgroundColor = '';
        });
        
        // Add staggered animation on load
        setTimeout(() => {
            icon.style.animation = 'fadeInUp 0.6s ease forwards';
        }, index * 200);
    });
    
    // Typing effect for greeting text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Start typing effect after a delay
    setTimeout(() => {
        const greetingText = document.querySelector('.greeting-text');
        if (greetingText) {
            typeWriter(greetingText, "Hello, I'm", 80);
        }
    }, 1000);
    
    // Mouse movement parallax for hero section
    document.addEventListener('mousemove', function(e) {
        const hero = document.querySelector('.hero-interactive');
        if (!hero) return;
        
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        // Move floating elements based on mouse position
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const moveX = (x - 0.5) * (20 + index * 5);
            const moveY = (y - 0.5) * (20 + index * 5);
            orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        // Move neural nodes
        const nodes = document.querySelectorAll('.neural-node');
        nodes.forEach((node, index) => {
            const moveX = (x - 0.5) * (10 + index * 2);
            const moveY = (y - 0.5) * (10 + index * 2);
            node.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});

// CSS Keyframes for additional animations
const additionalStyles = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes rippleEffect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.ripple-active {
    animation: rippleEffect 0.6s linear;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
