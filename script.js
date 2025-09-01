document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn-glass, .social-link, .contact-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 100) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 120;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced typing effect
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = [
            'beautiful websites',
            'modern applications',
            'digital experiences',
            'innovative solutions'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 150;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingText.textContent = 'I craft ' + currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 75;
            } else {
                typingText.textContent = 'I craft ' + currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1500);
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animateElements = document.querySelectorAll('.glass-card, .skill-card, .project-card, .contact-card');
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Skills data with modern tech stack
    const skills = [
        { 
            name: 'Frontend Development', 
            icon: 'fas fa-code', 
            description: 'Creating responsive and interactive user interfaces with modern frameworks and libraries.'
        },
        { 
            name: 'Backend Development', 
            icon: 'fas fa-server', 
            description: 'Building robust server-side applications and APIs with scalable architecture.'
        },
        { 
            name: 'Mobile Development', 
            icon: 'fas fa-mobile-alt', 
            description: 'Developing cross-platform mobile applications with native performance.'
        },
        { 
            name: 'UI/UX Design', 
            icon: 'fas fa-palette', 
            description: 'Designing beautiful and intuitive user experiences with modern design principles.'
        },
        { 
            name: 'Database Design', 
            icon: 'fas fa-database', 
            description: 'Designing and optimizing database schemas for performance and scalability.'
        },
        { 
            name: 'DevOps & Cloud', 
            icon: 'fas fa-cloud', 
            description: 'Implementing CI/CD pipelines and cloud infrastructure for modern applications.'
        }
    ];

    // Projects data with modern examples
    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce solution with modern payment integration, real-time inventory management, and responsive design.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            demo: '#',
            code: '#',
            image: 'fas fa-shopping-cart'
        },
        {
            title: 'Task Management App',
            description: 'A collaborative project management tool with real-time updates, team collaboration features, and advanced analytics.',
            technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
            demo: '#',
            code: '#',
            image: 'fas fa-tasks'
        },
        {
            title: 'AI-Powered Dashboard',
            description: 'An intelligent analytics dashboard with machine learning insights, data visualization, and predictive analytics.',
            technologies: ['Python', 'TensorFlow', 'React', 'D3.js'],
            demo: '#',
            code: '#',
            image: 'fas fa-chart-line'
        }
    ];

    // Render skills
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        skills.forEach((skill, index) => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-card glass-card';
            skillElement.innerHTML = `
                <i class="skill-icon ${skill.icon}"></i>
                <h3>${skill.name}</h3>
                <p>${skill.description}</p>
            `;
            skillsGrid.appendChild(skillElement);
        });
    }

    // Render projects
    const projectsContainer = document.querySelector('.projects-container');
    if (projectsContainer) {
        projects.forEach((project, index) => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-card glass-card';
            
            const techString = project.technologies.join(' • ');
            
            projectElement.innerHTML = `
                <div class="project-image">
                    <i class="${project.image}"></i>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <p class="project-tech">${techString}</p>
                    <div class="project-links">
                        <a href="${project.demo}" class="btn-glass primary">
                            <span>Live Demo</span>
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                        <a href="${project.code}" class="btn-glass secondary">
                            <span>View Code</span>
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            `;
            projectsContainer.appendChild(projectElement);
        });
    }

    // Animated counter for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const count = parseInt(counter.innerText);
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 20);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Trigger counter animation when about section is visible
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        aboutObserver.observe(aboutSection);
    }


    // Parallax effect for floating shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Quotes functionality
    const quotes = [
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            text: "Innovation distinguishes between a leader and a follower.",
            author: "Steve Jobs"
        },
        {
            text: "Code is like humor. When you have to explain it, it's bad.",
            author: "Cory House"
        },
        {
            text: "First, solve the problem. Then, write the code.",
            author: "John Johnson"
        },
        {
            text: "Experience is the name everyone gives to their mistakes.",
            author: "Oscar Wilde"
        },
        {
            text: "The best way to predict the future is to create it.",
            author: "Peter Drucker"
        },
        {
            text: "Simplicity is the ultimate sophistication.",
            author: "Leonardo da Vinci"
        }
    ];

    let currentQuoteIndex = 0;
    const quoteDisplay = document.getElementById('quote-display');
    const prevBtn = document.getElementById('prev-quote');
    const nextBtn = document.getElementById('next-quote');

    function updateQuote() {
        const quote = quotes[currentQuoteIndex];
        quoteDisplay.innerHTML = `
            <p class="quote-text">"${quote.text}"</p>
            <p class="quote-author">- ${quote.author}</p>
        `;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
            updateQuote();
        });

        nextBtn.addEventListener('click', () => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            updateQuote();
        });

        // Auto-rotate quotes every 8 seconds
        setInterval(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            updateQuote();
        }, 8000);
    }

    // Resume download functionality
    const resumeBtn = document.getElementById('download-resume');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a simple PDF content or redirect to actual resume
            const resumeContent = `
                Muneef M
                Full Stack Developer
                Location: Kochi, Kerala, India
                Email: md.muneefnk@gmail.com
                
                Skills: Frontend Development, Backend Development, UI/UX Design
                Experience: 3+ Years in Web Development
                
                This is a placeholder resume. Please replace with actual resume file.
            `;
            
            // Create and download a text file (in real scenario, you'd link to actual PDF)
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Muneef_M_Resume.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            // Show feedback
            const originalText = resumeBtn.innerHTML;
            resumeBtn.innerHTML = '<i class="fas fa-check"></i><span>Downloaded!</span>';
            setTimeout(() => {
                resumeBtn.innerHTML = originalText;
            }, 2000);
        });
    }

    // Enhanced form submission with email integration
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Create mailto link with form data
            const mailtoLink = `mailto:md.muneefnk@gmail.com?subject=${encodeURIComponent(subject || 'Contact from Portfolio')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Simulate form submission
            setTimeout(() => {
                // Open email client
                window.location.href = mailtoLink;
                
                // Show success message
                submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
                submitBtn.style.background = 'var(--success)';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        });
    }

    // Add smooth reveal animations to sections
    const revealSections = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        revealObserver.observe(section);
    });
});
