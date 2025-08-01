// CoSA Website Configuration
// Update these values to customize your website

const COSA_CONFIG = {
    // Brand Information
    brand: {
        name: "CoSA",
        fullName: "Collegiate Society of Advertising",
        tagline: "Live Creative",
        founded: "1999",
        email: "cosa.college.org@student.ateneo.edu",
        location: "University Campus"
    },

    // Social Media Links
    social: {
        twitter: "#",
        facebook: "#",
        linkedin: "#",
        instagram: "#"
    },

    // Contact Information
    contact: {
        email: "info@cosa.org",
        phone: "+1 (555) 123-4567",
        address: "University Campus, City, State 12345"
    },

    // Supabase Configuration (Optional)
    supabase: {
        url: "https://mamzjipnbjztqxfuxglq.supabase.co",
        anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hbXpqaXBuYmp6dHF4ZnV4Z2xxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMzM3NzcsImV4cCI6MjA2OTYwOTc3N30.qjLaVvlfGePP4xP92FCscXq7--LZM5VxcOEe6DNBq0g",
        enabled: true // Set to true when Supabase is configured
    },

    // Website Features
    features: {
        enableAnimations: true,
        enableParallax: true,
        enableNotifications: true,
        enableFormValidation: true
    },

    // Content Sections
    sections: {
        hero: {
            title: "Live Creative",
            subtitle: "Collegiate Society of Advertising",
            ctaText: "Join Us",
            ctaLink: "#contact"
        },
        about: {
            title: "About CoSA",
            description: "The Collegiate Society of Advertising (CoSA) was established to bridge the gap between academic learning and real-world advertising experience. We believe in fostering creativity, innovation, and professional development among advertising students.",
            vision: "To be the leading collegiate organization that empowers the next generation of advertising professionals through hands-on experience, industry connections, and creative excellence."
        },
        mission: {
            title: "Mission & Vision",
            mission: "To provide students with practical advertising experience through real campaigns, industry mentorship, and creative workshops that prepare them for successful careers in advertising and marketing.",
            vision: "To cultivate a community of innovative thinkers and creative problem-solvers who will shape the future of advertising with integrity, creativity, and strategic excellence."
        },
        whatWeDo: {
            title: "What We Do",
            services: [
                {
                    title: "Campaigns",
                    description: "Real-world advertising campaigns for local businesses and organizations.",
                    icon: "lightbulb",
                    color: "orange"
                },
                {
                    title: "Trainings",
                    description: "Professional development workshops and skill-building sessions.",
                    icon: "book",
                    color: "red"
                },
                {
                    title: "Events",
                    description: "Networking events, industry talks, and creative showcases.",
                    icon: "users",
                    color: "yellow"
                },
                {
                    title: "Youth Exposure",
                    description: "Mentoring programs and outreach to inspire future advertisers.",
                    icon: "globe",
                    color: "green"
                }
            ]
        },
        events: {
            title: "Upcoming Events",
            emptyMessage: "No events scheduled at the moment. Check back soon for upcoming events!"
        },
        contact: {
            title: "Get In Touch",
            description: "Have questions? Want to join CoSA? Get in touch with us!"
        }
    },

    // Colors (Brand Colors)
    colors: {
        orange: "#FF7800",
        redOrange: "#EC3B13",
        lightBeige: "#FBF6D9",
        yellow: "#FFD200"
    },

    // Typography
    fonts: {
        brand: "'Montserrat', sans-serif",
        headings: "'Work Sans', sans-serif",
        body: "'Karla', sans-serif"
    },

    // Animation Settings
    animations: {
        scrollThreshold: 0.1,
        scrollMargin: "0px 0px -50px 0px",
        fadeInDuration: 1000,
        floatingDuration: 3000
    },

    // Form Settings
    form: {
        enableSupabase: false,
        enableNetlify: true,
        notificationDuration: 5000
    },

    // Performance Settings
    performance: {
        enableLazyLoading: true,
        enableIntersectionObserver: true,
        enableSmoothScroll: true
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = COSA_CONFIG;
} else {
    window.COSA_CONFIG = COSA_CONFIG;
} 