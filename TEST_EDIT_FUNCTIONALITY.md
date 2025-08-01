# Test Guide: Edit Functionality

## 🧪 **Testing the Edit Functionality**

### **Prerequisites**
1. Local server running (`python -m http.server 8000`)
2. Supabase database set up with events table
3. At least one event in the database

### **Step-by-Step Test**

#### **1. Access Admin Dashboard**
- Navigate to: `http://localhost:8000/admin.html`
- Verify the page loads without errors
- Check browser console for any JavaScript errors

#### **2. Verify Events Load**
- Events should display in the table
- Each event should have "Edit" and "Delete" buttons
- Check browser console for: `📋 Loading events from Supabase...`

#### **3. Test Edit Button**
- Click the "Edit" button on any event
- Check browser console for: `🔄 Opening edit modal for event: [event-id]`
- Modal should open with:
  - Title: "Edit Event"
  - Button text: "Save Changes"
  - All form fields populated with event data
  - Console should show: `📝 Populating form with event data: [event-data]`

#### **4. Test Form Population**
- Verify all fields are filled with existing data:
  - Event Name
  - Tag
  - Description
  - Date
  - Time
  - Location
  - Registration Link
- If event has an image, it should display in preview
- Console should show: `✅ Form populated successfully`

#### **5. Test Field Editing**
- Modify any field in the form
- Add a new image (optional)
- Click "Save Changes"

#### **6. Verify Save Process**
- Console should show:
  - `🔄 Updating event: [event-id]`
  - `✅ Event saved successfully`
- Notification should appear: "Event updated successfully"
- Modal should close
- Events table should refresh with updated data

#### **7. Test Image Handling**
- **With existing image**: Form should show current image
- **Upload new image**: Should replace existing image
- **No new image**: Should keep existing image URL

#### **8. Test Form Reset**
- After saving, click "Add New Event"
- Form should reset to "Add New Event" mode
- Button should say "Save Event"
- All fields should be empty

## 🔍 **Debugging Checklist**

### **If Edit Button Doesn't Work:**
1. Check browser console for errors
2. Verify `editEvent` function is called
3. Check if event data exists in `events` array
4. Verify form elements exist in DOM

### **If Form Doesn't Populate:**
1. Check if `populateEventForm` is called
2. Verify form field selectors are correct
3. Check if event data has all required fields
4. Look for console errors about missing elements

### **If Save Doesn't Work:**
1. Check Supabase connection
2. Verify event ID is valid
3. Check for validation errors
4. Look for network errors in browser dev tools

### **If Image Handling Fails:**
1. Check if image preview elements exist
2. Verify image URL is valid
3. Check Supabase Storage permissions
4. Look for upload errors in console

## 📊 **Expected Console Output**

### **Successful Edit Flow:**
```
🔄 Opening edit modal for event: 123e4567-e89b-12d3-a456-426614174000
📝 Populating form with event data: {id: "123e4567-e89b-12d3-a456-426614174000", name: "Test Event", ...}
🖼️ Displaying existing image: https://...
✅ Form populated successfully
🔄 Updating event: 123e4567-e89b-12d3-a456-426614174000
📤 Uploading image to Supabase Storage... (if new image)
✅ Image uploaded successfully: https://...
✅ Event saved successfully
📋 Loading events from Supabase...
✅ Events loaded: 3
```

### **Error Cases:**
```
❌ Form not found
❌ Error saving event: [error-message]
❌ Error uploading image: [error-message]
```

## ✅ **Success Criteria**

The edit functionality is working correctly if:

1. ✅ Edit button opens modal with populated form
2. ✅ Form fields contain existing event data
3. ✅ Button text changes to "Save Changes"
4. ✅ Modal title shows "Edit Event"
5. ✅ Existing images display correctly
6. ✅ New images upload and replace old ones
7. ✅ Form saves changes to Supabase
8. ✅ Events table updates after save
9. ✅ Form resets to "Add New" mode
10. ✅ No console errors during the process

## 🚨 **Common Issues & Solutions**

### **Issue: Edit button does nothing**
**Solution**: Check if `editEvent` function is defined and accessible

### **Issue: Form fields are empty**
**Solution**: Verify form field selectors match HTML structure

### **Issue: Save button doesn't work**
**Solution**: Check if `saveEvent` function is called and Supabase connection is working

### **Issue: Images don't display**
**Solution**: Verify image URLs are valid and accessible

### **Issue: Form doesn't reset**
**Solution**: Check if `closeEventModal` function resets form properly

---

**Test Status**: Ready for testing
**Last Updated**: January 2025 