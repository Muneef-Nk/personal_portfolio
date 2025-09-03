// Website Content Data - Easy to Update
// Note: Arrays are displayed in LIFO (Last In First Out) order - newest items appear first

const websiteData = {
    // My Development Journey Timeline
    myDevelopmentJourney: [
        {
            id: 1,
            year: "2020",
            title: "Started Programming Journey",
            description: "Began learning programming fundamentals with Python and web development basics.",
            technologies: ["Python", "HTML", "CSS", "JavaScript"],
            type: "learning"
        },
        {
            id: 2,
            year: "2021",
            title: "Mobile Development Focus",
            description: "Discovered Flutter and started building cross-platform mobile applications.",
            technologies: ["Flutter", "Dart", "Firebase"],
            type: "specialization"
        },
        {
            id: 3,
            year: "2022",
            title: "Full-Stack Development",
            description: "Expanded skills to include backend development with Node.js and database management.",
            technologies: ["Node.js", "MongoDB", "React", "Express"],
            type: "expansion"
        },
        {
            id: 4,
            year: "2023",
            title: "Professional Projects",
            description: "Started working on real-world projects and contributing to open-source communities.",
            technologies: ["React Native", "TypeScript", "AWS", "Docker"],
            type: "professional"
        },
        {
            id: 5,
            year: "2024",
            title: "Advanced Specialization",
            description: "Focused on advanced mobile development, cloud solutions, and modern frameworks.",
            technologies: ["Next.js", "Supabase", "Advanced Flutter", "Microservices"],
            type: "advanced"
        }
    ],

    // Services Offered
    services: [
        {
            id: 1,
            title: "Web Development",
            description: "Modern, responsive websites using latest technologies",
            icon: "fas fa-globe",
            technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
            featured: false
        },
        {
            id: 2,
            title: "Mobile App Development",
            description: "Cross-platform mobile applications for iOS and Android",
            icon: "fas fa-mobile-alt",
            technologies: ["Flutter", "React Native", "Dart", "Swift"],
            featured: true
        },
        {
            id: 3,
            title: "Backend Development",
            description: "Scalable server-side solutions and API development",
            icon: "fas fa-server",
            technologies: ["Node.js", "Python", "MongoDB", "PostgreSQL"],
            featured: false
        },
        {
            id: 4,
            title: "Cloud Solutions",
            description: "Cloud infrastructure setup and deployment services",
            icon: "fas fa-cloud",
            technologies: ["AWS", "Firebase", "Docker", "Supabase"],
            featured: true
        },
        {
            id: 5,
            title: "UI/UX Design",
            description: "User-centered design and intuitive interface creation",
            icon: "fas fa-paint-brush",
            technologies: ["Figma", "Adobe XD", "Prototyping", "User Research"],
            featured: false
        }
    ],

    // Inspirational Quotes
    quotes: [
        {
            id: 1,
            text: "Code is poetry written in logic.",
            author: "Unknown",
            category: "programming"
        },
        {
            id: 2,
            text: "The best time to plant a tree was 20 years ago. The second best time is now.",
            author: "Chinese Proverb",
            category: "motivation"
        },
        {
            id: 3,
            text: "Innovation distinguishes between a leader and a follower.",
            author: "Steve Jobs",
            category: "innovation"
        },
        {
            id: 4,
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs",
            category: "passion"
        },
        {
            id: 5,
            text: "Simplicity is the ultimate sophistication.",
            author: "Leonardo da Vinci",
            category: "design"
        },
        {
            id: 6,
            text: "First, solve the problem. Then, write the code.",
            author: "John Johnson",
            category: "programming"
        },
        {
            id: 7,
            text: "Every expert was once a beginner.",
            author: "Helen Hayes",
            category: "learning"
        },
        {
            id: 8,
            text: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt",
            category: "dreams"
        }
    ],

    // Skills and Expertise
    skills: {
        mobile: [
            {
                id: 1,
                name: "Flutter",
                level: "Expert",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
                experience: "3+ years"
            },
            {
                id: 2,
                name: "React Native",
                level: "Advanced",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                experience: "2+ years"
            },
            {
                id: 3,
                name: "iOS",
                level: "Advanced",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
                experience: "2+ years"
            },
            {
                id: 4,
                name: "Android",
                level: "Advanced",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
                experience: "2+ years"
            },
            {
                id: 5,
                name: "Dart",
                level: "Expert",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
                experience: "3+ years"
            },
            {
                id: 6,
                name: "Kotlin",
                level: "Intermediate",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
                experience: "1+ years"
            },
            {
                id: 6,
                name: "Kotlin",
                level: "Intermediate",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
                experience: "1+ years"
            },
            {
                id: 6,
                name: "Kotlin",
                level: "Intermediate",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
                experience: "1+ years"
            }
        ],
        web: [
            {
                id: 1,
                name: "JavaScript",
                level: "Expert",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                experience: "4+ years"
            },
            {
                id: 2,
                name: "TypeScript",
                level: "Advanced",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
                experience: "2+ years"
            },
            {
                id: 3,
                name: "Next.js",
                level: "Advanced",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
                experience: "2+ years"
            },
            {
                id: 4,
                name: "Tailwind CSS",
                level: "Expert",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
                experience: "3+ years"
            },
            {
                id: 5,
                name: "Figma",
                level: "Advanced",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
                experience: "2+ years"
            },
            {
                id: 6,
                name: "Jest",
                level: "Intermediate",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
                experience: "1+ years"
            }
        ],
        backend: [
            {
                id: 1,
                name: "Node.js",
                level: "Advanced",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                experience: "3+ years"
            },
            {
                id: 2,
                name: "Python",
                level: "Advanced",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                experience: "3+ years"
            },
            {
                id: 3,
                name: "FastAPI",
                level: "Intermediate",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
                experience: "1+ years"
            },
            {
                id: 4,
                name: "GraphQL",
                level: "Intermediate",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
                experience: "1+ years"
            },
            {
                id: 5,
                name: "MongoDB",
                level: "Advanced",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
                experience: "2+ years"
            },
            {
                id: 6,
                name: "PostgreSQL",
                level: "Intermediate",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
                experience: "1+ years"
            }
        ],
        tools: [
            {
                id: 1,
                name: "Firebase",
                level: "Expert",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
                experience: "3+ years"
            },
            {
                id: 2,
                name: "AWS",
                level: "Intermediate",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
                experience: "1+ years"
            },
            {
                id: 3,
                name: "Docker",
                level: "Intermediate",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
                experience: "1+ years"
            },
            {
                id: 4,
                name: "Git",
                level: "Expert",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
                experience: "4+ years"
            },
            {
                id: 5,
                name: "Supabase",
                level: "Advanced",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
                experience: "1+ years"
            },
            {
                id: 6,
                name: "Xcode",
                level: "Advanced",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg",
                experience: "2+ years"
            }
        ]
    },

    // Featured Projects
    projects: [
        {
            id: 1,
            title: "Personal Portfolio Website",
            description: "Modern personal portfolio with glassmorphism design and interactive animations.",
            image: "fas fa-globe",
            technologies: ["HTML", "CSS", "JavaScript", "Glassmorphism"],
            githubUrl: "#",
            liveUrl: "#",
            featured: true
        },
        {
            id: 2,
            title: "E-Commerce Mobile App",
            description: "A full-featured shopping app with cart, payments, and user authentication built with Flutter.",
            image: "fas fa-mobile-alt",
            technologies: ["Flutter", "Dart", "Firebase"],
            githubUrl: "#",
            liveUrl: "#",
            featured: true
        },
        {
            id: 3,
            title: "Task Management App",
            description: "Cross-platform productivity app with real-time sync and collaborative features using React Native.",
            image: "fas fa-tasks",
            technologies: ["React Native", "JavaScript", "Node.js"],
            githubUrl: "#",
            liveUrl: "#",
            featured: true
        },
        {
            id: 4,
            title: "Fitness Tracker iOS App",
            description: "Native iOS health app with workout tracking, nutrition logging, and progress analytics.",
            image: "fas fa-heartbeat",
            technologies: ["Swift", "iOS", "HealthKit"],
            githubUrl: "#",
            liveUrl: "#",
            featured: false
        },
        {
            id: 5,
            title: "Learning Management System",
            description: "Educational platform with course management, video streaming, and progress tracking for students.",
            image: "fas fa-graduation-cap",
            technologies: ["Flutter", "Firebase", "Video API"],
            githubUrl: "#",
            liveUrl: "#",
            featured: true
        },
        {
            id: 6,
            title: "jdsfjdsklfjkldsjfkl",
            description: "Educational platform with course management, video streaming, and progress tracking for students.",
            image: "fas fa-graduation-cap",
            technologies: ["Flutter", "Firebase", "Video API"],
            githubUrl: "#",
            liveUrl: "#",
            featured: true
        }
    ],

    // Personal Information
    personal: {
        name: "Muhammed Muneef M",
        title: "Mobile App Developer",
        email: "md.muneefnk@gmail.com",
        phone: "+91 9876543210",
        location: "Kerala, India",
        tagline: "Creating digital experiences that matter.",
        bio: "Passionate mobile app developer with expertise in Flutter, React Native, and modern web technologies. I love creating beautiful, functional applications that solve real-world problems."
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = websiteData;
}
