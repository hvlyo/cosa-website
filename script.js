// Supabase Configuration
const SUPABASE_URL = 'https://mamzjipnbjztqxfuxglq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hbXpqaXBuYmp6dHF4ZnV4Z2xxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMzM3NzcsImV4cCI6MjA2OTYwOTc3N30.qjLaVvlfGePP4xP92FCscXq7--LZM5VxcOEe6DNBq0g';

// Initialize Supabase client
let supabase;
try {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (error) {
    console.warn('Supabase not configured. Using mock data.');
}

// Mock data for development
const mockEvents = [
    {
        id: 1,
        name: 'Creative Workshop: Brand Identity Design',
        description: 'Learn the fundamentals of brand identity design with industry professionals.',
        date: '2024-02-15',
        time: '14:00',
        location: 'Design Studio A',
        image_url: null,
        tag: 'Workshop'
    },
    {
        id: 2,
        name: 'Networking Mixer with Ad Agencies',
        description: 'Connect with professionals from top advertising agencies in the region.',
        date: '2024-02-22',
        time: '18:00',
        location: 'Campus Center',
        image_url: null,
        tag: 'Networking'
    },
    {
        id: 3,
        name: 'Campaign Pitch Competition',
        description: 'Present your creative campaign ideas to a panel of industry judges.',
        date: '2024-03-01',
        time: '10:00',
        location: 'Auditorium',
        image_url: null,
        tag: 'Competition'
    }
];

// Mock officers data
const mockOfficers = [
    {
        id: 1,
        name: 'Sarah Johnson',
        position: 'President',
        photo_url: null
    },
    {
        id: 2,
        name: 'Michael Chen',
        position: 'Vice President',
        photo_url: null
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        position: 'Secretary',
        photo_url: null
    },
    {
        id: 4,
        name: 'David Kim',
        position: 'Treasurer',
        photo_url: null
    }
];

// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const eventsContainer = document.getElementById('events-container');
const officersContainer = document.getElementById('officers-container');
const contactForm = document.getElementById('contact-form');

// Load Events from Supabase
async function loadEvents() {
    try {
        console.log('📋 Loading events from Supabase...');
        
        let events = [];
        
        if (supabase) {
            // Try to fetch from Supabase
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('date', { ascending: true });
            
            if (error) {
                console.warn('Supabase error:', error);
                events = [];
            } else {
                events = data || [];
                console.log('✅ Events loaded from Supabase:', events.length);
            }
        } else {
            console.log('⚠️ Supabase not configured - showing empty events');
            events = [];
        }
        
        displayEvents(events);
    } catch (error) {
        console.error('❌ Error loading events:', error);
        displayEvents([]);
    }
}

// Load Officers from Supabase or Mock Data
async function loadOfficers() {
    try {
        let officers = [];
        
        if (supabase) {
            // Try to fetch from Supabase
            const { data, error } = await supabase
                .from('officers')
                .select('name, position, photo_url')
                .order('id', { ascending: true });
            
            if (error) {
                console.warn('Supabase error:', error);
                officers = mockOfficers;
            } else {
                officers = data || mockOfficers;
            }
        } else {
            // Use mock data if Supabase is not configured
            officers = mockOfficers;
        }
        
        displayOfficers(officers);
    } catch (error) {
        console.error('Error loading officers:', error);
        displayOfficers(mockOfficers);
    }
}

// Display Events
function displayEvents(events) {
    if (!eventsContainer) return;
    
    eventsContainer.innerHTML = '';
    
    if (events.length === 0) {
        eventsContainer.innerHTML = `
            <div class="col-span-full text-center py-12 fade-in">
                <p class="empty-state">No Upcoming Events Currently</p>
            </div>
        `;
        return;
    }
    
    events.forEach((event, index) => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        const eventCard = document.createElement('div');
        eventCard.className = 'reveal card-hover bg-white rounded-xl shadow-lg overflow-hidden';
        eventCard.style.animationDelay = `${index * 0.1}s`;
        
        // Build the card content
        let cardContent = `
            <div class="relative">
                ${event.image_url ? `
                    <div class="h-48 bg-gray-200 overflow-hidden">
                        <img src="${event.image_url}" alt="${event.name}" class="w-full h-full object-cover">
                    </div>
                ` : ''}
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <span class="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
                            ${event.tag}
                        </span>
                        <span class="text-sm text-gray-500">${formattedDate}</span>
                    </div>
                    <h3 class="heading-font text-xl text-gray-900 mb-3">${event.name}</h3>
                    <p class="text-gray-600 mb-4">${event.description}</p>
                    <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            ${event.time}
                        </div>
                        <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            ${event.location}
                        </div>
                    </div>
                    ${event.registration_link ? `
                        <div class="mt-4">
                            <a href="${event.registration_link}" target="_blank" rel="noopener noreferrer" 
                               class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                Register Now
                            </a>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        eventCard.innerHTML = cardContent;
        eventsContainer.appendChild(eventCard);
    });
    
    // Observe new elements for animation
    const newRevealElements = eventsContainer.querySelectorAll('.reveal');
    newRevealElements.forEach(element => {
        observer.observe(element);
    });
}

// Display Officers
function displayOfficers(officers) {
    if (!officersContainer) return;
    
    officersContainer.innerHTML = '';
    
    if (officers.length === 0) {
        officersContainer.innerHTML = `
            <div class="col-span-full text-center py-12 fade-in">
                <p class="text-gray-500 text-lg">No officers information available.</p>
            </div>
        `;
        return;
    }
    
    officers.forEach((officer, index) => {
        const officerCard = document.createElement('div');
        officerCard.className = 'reveal card-hover bg-white rounded-xl shadow-lg p-6 text-center';
        officerCard.style.animationDelay = `${index * 0.1}s`;
        
        const cardContent = `
            <div class="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                ${officer.photo_url ? `
                    <img src="${officer.photo_url}" alt="${officer.name}" class="w-20 h-20 rounded-full object-cover">
                ` : `
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                `}
            </div>
            <h3 class="heading-font text-xl text-gray-900 mb-2">${officer.name}</h3>
            <p class="text-orange-600 font-semibold">${officer.position}</p>
        `;
        
        officerCard.innerHTML = cardContent;
        officersContainer.appendChild(officerCard);
    });
    
    // Observe new elements for animation
    const newRevealElements = officersContainer.querySelectorAll('.reveal');
    newRevealElements.forEach(element => {
        observer.observe(element);
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}

// Smooth Scrolling for Navigation Links
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer for Reveal Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Contact Form Submission
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    try {
        // Try to submit to Supabase first
        if (supabase) {
            const { error } = await supabase
                .from('inquiries')
                .insert([{ name, email, message }]);
            
            if (!error) {
                showNotification('Message sent successfully!', 'success');
                e.target.reset();
                return;
            }
        }
        
        // Fallback to Netlify form handling
        await submitToNetlify(formData);
        showNotification('Message sent successfully!', 'success');
        e.target.reset();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showNotification('Error sending message. Please try again.', 'error');
    }
}

// Submit to Netlify (fallback)
async function submitToNetlify(formData) {
    const response = await fetch('/', {
        method: 'POST',
        body: formData
    });
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${getNotificationClasses(type)}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Get notification classes
function getNotificationClasses(type) {
    switch (type) {
        case 'success':
            return 'bg-green-500 text-white';
        case 'error':
            return 'bg-red-500 text-white';
        case 'info':
        default:
            return 'bg-blue-500 text-white';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 CoSA Website Initializing...');
    
    // Initialize mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Initialize smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScrollTo(targetId);
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Initialize contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Observe existing reveal elements
    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
    
    // Load dynamic content
    loadEvents();
    loadOfficers();
    
    console.log('✅ CoSA Website Initialized');
}); 