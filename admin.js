// CoSA Admin Dashboard - Supabase Integration
// Manages events with image upload to Supabase Storage

// Supabase Configuration
const SUPABASE_URL = 'https://mamzjipnbjztqxfuxglq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hbXpqaXBuYmp6dHF4ZnV4Z2xxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMzM3NzcsImV4cCI6MjA2OTYwOTc3N30.qjLaVvlfGePP4xP92FCscXq7--LZM5VxcOEe6DNBq0g';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM Elements
const dashboardSection = document.getElementById('dashboard-section');
const addEventBtn = document.getElementById('add-event-btn');
const eventsTableBody = document.getElementById('events-table-body');
const eventModal = document.getElementById('event-modal');
const eventForm = document.getElementById('event-form');
const modalTitle = document.getElementById('modal-title');
const closeModal = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const deleteModal = document.getElementById('delete-modal');
const cancelDelete = document.getElementById('cancel-delete');
const confirmDelete = document.getElementById('confirm-delete');
const notification = document.getElementById('notification');

// Image upload elements
const dropZone = document.getElementById('drop-zone');
const imageUpload = document.getElementById('image-upload');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imagePreview = document.getElementById('image-preview');
const removeImage = document.getElementById('remove-image');
const eventImageUrl = document.getElementById('event-image-url');

// State
let events = [];
let editingEventId = null;
let deletingEventId = null;
let uploadedImageFile = null;

// ============================================================================
// UI MANAGEMENT
// ============================================================================

/**
 * Show notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 */
function showNotification(message, type = 'info') {
    if (!notification) return;
    
    notification.textContent = message;
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${getNotificationClasses(type)}`;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 5000);
}

/**
 * Get CSS classes for notification type
 * @param {string} type - Notification type
 * @returns {string} - CSS classes
 */
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

// ============================================================================
// EVENT MANAGEMENT
// ============================================================================

/**
 * Load events from Supabase
 */
async function loadEvents() {
    try {
        console.log('📋 Loading events from Supabase...');
        
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true });
        
        if (error) {
            console.error('❌ Error loading events:', error);
            showNotification('Error loading events', 'error');
            return;
        }
        
        events = data || [];
        console.log('✅ Events loaded:', events.length);
        displayEvents();
        
    } catch (error) {
        console.error('❌ Error loading events:', error);
        showNotification('Error loading events', 'error');
    }
}

/**
 * Display events in the table
 */
function displayEvents() {
    if (!eventsTableBody) return;
    
    if (events.length === 0) {
        eventsTableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center py-8 text-gray-500">
                    No events found. Click "Add New Event" to create your first event.
                </td>
            </tr>
        `;
        return;
    }
    
    eventsTableBody.innerHTML = events.map(event => `
        <tr class="hover:bg-gray-50 border-b border-gray-200">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${event.name}</div>
                <div class="text-sm text-gray-500">${event.tag}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${new Date(event.date).toLocaleDateString()}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${event.location}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="editEvent('${event.id}')" class="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                </button>
                <button onclick="deleteEvent('${event.id}')" class="text-red-600 hover:text-red-900">
                    Delete
                </button>
            </td>
        </tr>
    `).join('');
}

/**
 * Open event modal for adding/editing
 * @param {string} eventId - Event ID (null for new event)
 */
function openEventModal(eventId = null) {
    editingEventId = eventId;
    uploadedImageFile = null;
    
    // Get the submit button
    const submitButton = eventForm.querySelector('button[type="submit"]');
    
    if (eventId) {
        const event = events.find(e => e.id === eventId);
        if (event) {
            modalTitle.textContent = 'Edit Event';
            submitButton.textContent = 'Save Changes';
            populateEventForm(event);
        }
    } else {
        modalTitle.textContent = 'Add New Event';
        submitButton.textContent = 'Save Event';
        eventForm.reset();
        resetImageUpload();
    }
    
    eventModal.classList.remove('hidden');
}

/**
 * Populate event form with data
 * @param {Object} event - Event object
 */
function populateEventForm(event) {
    console.log('📝 Populating form with event data:', event);
    
    // Get form elements by name attribute
    const form = document.getElementById('event-form');
    if (!form) {
        console.error('❌ Form not found');
        return;
    }
    
    // Set form field values
    const nameField = form.querySelector('input[name="name"]');
    const tagField = form.querySelector('input[name="tag"]');
    const descriptionField = form.querySelector('textarea[name="description"]');
    const dateField = form.querySelector('input[name="date"]');
    const timeField = form.querySelector('input[name="time"]');
    const locationField = form.querySelector('input[name="location"]');
    const registrationField = form.querySelector('input[name="registration_link"]');
    
    if (nameField) nameField.value = event.name || '';
    if (tagField) tagField.value = event.tag || '';
    if (descriptionField) descriptionField.value = event.description || '';
    if (dateField) dateField.value = event.date || '';
    if (timeField) timeField.value = event.time || '';
    if (locationField) locationField.value = event.location || '';
    if (registrationField) registrationField.value = event.registration_link || '';
    
    // Handle image display
    if (event.image_url) {
        imagePreview.src = event.image_url;
        imagePreviewContainer.classList.remove('hidden');
        console.log('🖼️ Displaying existing image:', event.image_url);
    } else {
        imagePreviewContainer.classList.add('hidden');
        console.log('🖼️ No image to display');
    }
    
    console.log('✅ Form populated successfully');
}

/**
 * Save event (create or update)
 * @param {FormData} formData - Form data
 */
async function saveEvent(formData) {
    try {
        const eventData = {
            name: formData.get('name'),
            tag: formData.get('tag'),
            description: formData.get('description'),
            date: formData.get('date'),
            time: formData.get('time'),
            location: formData.get('location'),
            registration_link: formData.get('registration_link') || null
        };
        
        // Upload image if a new file was selected
        if (uploadedImageFile) {
            console.log('📤 Uploading image to Supabase Storage...');
            const imageUrl = await uploadImageToStorage(uploadedImageFile);
            eventData.image_url = imageUrl;
        } else if (editingEventId) {
            // Keep existing image URL if no new image was uploaded
            const existingEvent = events.find(e => e.id === editingEventId);
            if (existingEvent) {
                eventData.image_url = existingEvent.image_url;
            }
        }
        
        let result;
        
        if (editingEventId) {
            // Update existing event
            console.log('🔄 Updating event:', editingEventId);
            const { data, error } = await supabase
                .from('events')
                .update(eventData)
                .eq('id', editingEventId)
                .select();
            
            if (error) throw error;
            result = data;
        } else {
            // Create new event
            console.log('➕ Creating new event');
            const { data, error } = await supabase
                .from('events')
                .insert([eventData])
                .select();
            
            if (error) throw error;
            result = data;
        }
        
        console.log('✅ Event saved successfully');
        showNotification(editingEventId ? 'Event updated successfully' : 'Event created successfully', 'success');
        
        closeEventModal();
        loadEvents();
        
    } catch (error) {
        console.error('❌ Error saving event:', error);
        showNotification('Error saving event: ' + error.message, 'error');
    }
}

/**
 * Upload image to Supabase Storage
 * @param {File} file - File to upload
 * @returns {Promise<string>} - Public URL of uploaded image
 */
async function uploadImageToStorage(file) {
    try {
        const fileName = `event-images/${Date.now()}-${file.name}`;
        
        const { data, error } = await supabase.storage
            .from('event-images')
            .upload(fileName, file);
        
        if (error) throw error;
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('event-images')
            .getPublicUrl(fileName);
        
        console.log('✅ Image uploaded successfully:', publicUrl);
        return publicUrl;
        
    } catch (error) {
        console.error('❌ Error uploading image:', error);
        throw new Error('Failed to upload image: ' + error.message);
    }
}

/**
 * Delete event
 * @param {string} eventId - Event ID to delete
 */
function deleteEvent(eventId) {
    deletingEventId = eventId;
    deleteModal.classList.remove('hidden');
}

/**
 * Confirm event deletion
 */
async function confirmDeleteEvent() {
    if (!deletingEventId) return;
    
    try {
        console.log('🗑️ Deleting event:', deletingEventId);
        
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', deletingEventId);
        
        if (error) throw error;
        
        console.log('✅ Event deleted successfully');
        showNotification('Event deleted successfully', 'success');
        
        closeDeleteModal();
        loadEvents();
        
    } catch (error) {
        console.error('❌ Error deleting event:', error);
        showNotification('Error deleting event: ' + error.message, 'error');
    }
}

/**
 * Edit event
 * @param {string} eventId - Event ID to edit
 */
function editEvent(eventId) {
    console.log('🔄 Opening edit modal for event:', eventId);
    openEventModal(eventId);
}

/**
 * Close event modal
 */
function closeEventModal() {
    eventModal.classList.add('hidden');
    editingEventId = null;
    uploadedImageFile = null;
    resetImageUpload();
    
    // Reset form to "Add New" mode
    const submitButton = eventForm.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.textContent = 'Save Event';
    }
    modalTitle.textContent = 'Add New Event';
}

/**
 * Close delete modal
 */
function closeDeleteModal() {
    deleteModal.classList.add('hidden');
    deletingEventId = null;
}

// ============================================================================
// IMAGE UPLOAD HANDLING
// ============================================================================

/**
 * Initialize image upload functionality
 */
function initializeImageUpload() {
    if (!dropZone || !imageUpload) return;
    
    // Drag and drop handlers
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-blue-500', 'bg-blue-50');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-blue-500', 'bg-blue-50');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-blue-500', 'bg-blue-50');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageFile(files[0]);
        }
    });
    
    // File input handler
    imageUpload.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleImageFile(e.target.files[0]);
        }
    });
    
    // Remove image handler
    if (removeImage) {
        removeImage.addEventListener('click', removeUploadedImage);
    }
}

/**
 * Handle image file selection
 * @param {File} file - Selected file
 */
function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
        showNotification('Please select an image file', 'error');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showNotification('Image file size must be less than 5MB', 'error');
        return;
    }
    
    // Store the file for upload
    uploadedImageFile = file;
    
    // Create a preview
    const imageUrl = URL.createObjectURL(file);
    
    // Show preview
    imagePreview.src = imageUrl;
    imagePreviewContainer.classList.remove('hidden');
    
    showNotification('Image selected for upload', 'success');
}

/**
 * Remove uploaded image
 */
function removeUploadedImage() {
    uploadedImageFile = null;
    eventImageUrl.value = '';
    imagePreview.src = '';
    imagePreviewContainer.classList.add('hidden');
}

/**
 * Reset image upload
 */
function resetImageUpload() {
    if (imageUpload) {
        imageUpload.value = '';
    }
    uploadedImageFile = null;
    removeUploadedImage();
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 CoSA Admin Dashboard Initializing...');
    
    // Show dashboard immediately (no authentication)
    if (dashboardSection) {
        dashboardSection.classList.remove('hidden');
    }
    
    // Load events
    loadEvents();
    
    // Initialize image upload
    initializeImageUpload();
    
    // Add event button handler
    if (addEventBtn) {
        addEventBtn.addEventListener('click', () => openEventModal());
    }
    
    // Event form handler
    if (eventForm) {
        eventForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(eventForm);
            await saveEvent(formData);
        });
    }
    
    // Modal close handlers
    if (closeModal) {
        closeModal.addEventListener('click', closeEventModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeEventModal);
    }
    
    if (cancelDelete) {
        cancelDelete.addEventListener('click', closeDeleteModal);
    }
    
    if (confirmDelete) {
        confirmDelete.addEventListener('click', confirmDeleteEvent);
    }
    
    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            closeEventModal();
        }
        if (e.target === deleteModal) {
            closeDeleteModal();
        }
    });
    
    console.log('✅ Admin Dashboard Initialized with Supabase Integration');
}); 