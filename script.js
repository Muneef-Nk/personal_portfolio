document.addEventListener('DOMContentLoaded', function() {
    // Modern navigation handling
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Skills Category Tabs Functionality
    function initSkillsTabs() {
        const categoryTabs = document.querySelectorAll('.category-tab');
        const skillsGrids = document.querySelectorAll('.skills-grid-unique');

        console.log('Found tabs:', categoryTabs.length);
        console.log('Found grids:', skillsGrids.length);

        if (categoryTabs.length === 0 || skillsGrids.length === 0) {
            console.log('Skills tabs or grids not found, retrying...');
            setTimeout(initSkillsTabs, 500);
            return;
        }

        categoryTabs.forEach((tab, index) => {
            console.log('Adding listener to tab:', index, tab.getAttribute('data-category'));
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                const targetCategory = this.getAttribute('data-category');
                console.log('Tab clicked:', targetCategory);
                
                // Remove active class from all tabs
                categoryTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all skill grids
                skillsGrids.forEach(grid => {
                    grid.classList.remove('active');
                });
                
                // Show target skill grid
                const targetGrid = document.querySelector(`[data-category="${targetCategory}"].skills-grid-unique`);
                console.log('Target grid found:', targetGrid);
                if (targetGrid) {
                    setTimeout(() => {
                        targetGrid.classList.add('active');
                        console.log('Grid activated:', targetCategory);
                    }, 150);
                }
            });
        });

        console.log('Skills tabs initialized successfully');
    }

    // Initialize skills tabs when DOM is ready
    setTimeout(initSkillsTabs, 100);

    // Typing animation for hero subtitle
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const roles = [
            'Software Engineer',
            'Full Stack Developer',
            'Problem Solver',
            'Code Architect'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeRole() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(typeRole, typeSpeed);
        }

        setTimeout(typeRole, 1000);
    }

    // Form validation and interaction
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Make downloadResume function global
    window.downloadResume = function() {
        // Create a temporary link element
        const link = document.createElement('a');
        
        // For demo purposes, we'll create a simple text file
        // In a real scenario, you would link to your actual PDF resume
        const resumeContent = `MUHAMMED MUNEEF
Mobile App Developer

CONTACT INFORMATION
Email: muneef@example.com
Phone: +1 (555) 123-4567
Location: Your City, Country
LinkedIn: linkedin.com/in/muneef
GitHub: github.com/muneef

PROFESSIONAL SUMMARY
Passionate Mobile App Developer with 2+ years of experience in creating innovative and user-friendly mobile applications. Specialized in cross-platform development using Flutter and React Native, with a strong focus on delivering high-quality solutions that meet both user needs and business objectives.

EXPERIENCE

Mobile App Developer (Freelance) | 2022 - Present
• Developed 15+ cross-platform mobile applications using Flutter and React Native
• Built e-commerce mobile apps with payment integration and real-time features
• Created business productivity apps for various clients with 100% satisfaction rate
• Implemented push notifications, offline functionality, and performance optimization

Junior Flutter Developer (Tech Startup) | 2021 - 2022
• Collaborated with UI/UX designers to implement pixel-perfect designs
• Integrated REST APIs and third-party services for enhanced functionality
• Participated in code reviews and agile development processes
• Optimized app performance and reduced loading times by 40%

TECHNICAL SKILLS
• Mobile Development: Flutter, React Native, Dart, JavaScript
• Backend: Node.js, Firebase, REST APIs
• Design: Figma, Adobe XD, UI/UX Principles
• Tools: Git, VS Code, Android Studio, Xcode
• Databases: Firebase Firestore, SQLite

EDUCATION
Bachelor's Degree in Computer Science
University Name | 2018 - 2022

PROJECTS
• E-commerce Mobile App: Flutter-based shopping app with payment integration
• Social Media Platform: React Native app with real-time messaging
• Task Management App: Cross-platform productivity app with offline sync
• Weather Forecast App: Location-based weather app with beautiful UI

ACHIEVEMENTS
• 100% client satisfaction rate across all projects
• Contributed to open-source Flutter packages
• Reduced app loading times by 40% through optimization
• Successfully deployed 15+ apps to Google Play Store and Apple App Store`;
        
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        link.href = url;
        link.download = 'Muhammed_Muneef_Resume.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // Show success message
        showNotification('Resume downloaded successfully!', 'success');
    };

    // Add CSS for notification system
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                border-radius: 12px;
                color: white;
                font-weight: 600;
                z-index: 10000;
                transform: translateX(400px);
                opacity: 0;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            }
            
            .notification.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .notification-success {
                background: linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.9));
                border-color: rgba(34, 197, 94, 0.3);
            }
            
            .notification-error {
                background: linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9));
                border-color: rgba(239, 68, 68, 0.3);
            }
            
            .notification-info {
                background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9));
                border-color: rgba(59, 130, 246, 0.3);
            }
        `;
        document.head.appendChild(notificationStyles);
    }
});
