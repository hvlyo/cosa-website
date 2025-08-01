# CoSA Website Setup Instructions

## ✅ **Current Implementation Status**

### **Admin Dashboard (`admin.html`)**
- ✅ **Supabase Integration**: Connected to events table
- ✅ **Image Upload**: Drag-and-drop to Supabase Storage
- ✅ **Event Management**: Create, Edit, Delete events
- ✅ **Form Validation**: All required fields validated
- ✅ **Real-time Updates**: Changes reflect immediately

### **Main Website (`index.html`)**
- ✅ **Dynamic Events**: Fetches from Supabase events table
- ✅ **Empty State**: Shows "No Upcoming Events Currently" when no events
- ✅ **No Admin References**: Clean public interface
- ✅ **Image Display**: Shows event images from Supabase Storage

### **Database Structure**
- ✅ **Events Table**: All required fields implemented
- ✅ **Storage Bucket**: `event-images` for image uploads
- ✅ **Public Access**: No authentication required
- ✅ **RLS Policies**: Proper public read/write access

## 🚀 **Quick Start**

### **1. Database Setup**
Run the SQL script in your Supabase SQL Editor:
```sql
-- Copy and paste the contents of supabase-setup.sql
```

### **2. Local Development**
```bash
# Start local server
python -m http.server 8000

# Or using Node.js
npx serve .
```

### **3. Access URLs**
- **Main Website**: `http://localhost:8000/index.html`
- **Admin Dashboard**: `http://localhost:8000/admin.html`

## 📋 **Testing Checklist**

### **Admin Dashboard Testing**
- [ ] **Add New Event**: Fill form, upload image, save
- [ ] **Image Upload**: Drag-and-drop or click to upload
- [ ] **Edit Event**: Click edit, modify fields, save
- [ ] **Delete Event**: Click delete, confirm removal
- [ ] **Form Validation**: Try submitting with missing fields
- [ ] **Image Preview**: Verify uploaded images display correctly

### **Main Website Testing**
- [ ] **Events Display**: Check if events load from Supabase
- [ ] **Empty State**: Verify "No Upcoming Events Currently" shows when no events
- [ ] **Event Cards**: Check images, dates, registration links
- [ ] **Responsive Design**: Test on mobile and desktop
- [ ] **No Admin Links**: Verify no admin login buttons

### **Database Testing**
- [ ] **Events Table**: Verify events are saved correctly
- [ ] **Image Storage**: Check images upload to Supabase Storage
- [ ] **Public Access**: Confirm no authentication errors
- [ ] **Data Consistency**: Verify admin changes appear on main site

## 🔧 **Troubleshooting**

### **Common Issues**

**1. Supabase Connection Error**
- Check browser console for connection errors
- Verify Supabase URL and API key in `admin.js` and `script.js`
- Ensure Supabase project is active

**2. Image Upload Fails**
- Check if `event-images` bucket exists in Supabase Storage
- Verify storage policies allow public upload
- Check file size (max 5MB)

**3. Events Not Loading**
- Check browser console for fetch errors
- Verify events table exists with correct structure
- Check RLS policies allow public read access

**4. Form Not Saving**
- Check browser console for validation errors
- Verify all required fields are filled
- Check network tab for API errors

### **Debug Steps**
1. **Open Browser Console** (F12)
2. **Check Network Tab** for failed requests
3. **Verify Supabase Client** initialization
4. **Test Database Connection** manually
5. **Check Storage Bucket** permissions

## 📊 **Database Schema**

### **Events Table**
```sql
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    tag TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    image_url TEXT,
    registration_link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **Storage Bucket**
- **Name**: `event-images`
- **Public**: Yes
- **File Size Limit**: 5MB
- **Allowed Types**: PNG, JPG, GIF

## 🎯 **Features Implemented**

### **Admin Dashboard**
- ✅ Drag-and-drop image upload
- ✅ Supabase Storage integration
- ✅ Real-time event management
- ✅ Form validation and error handling
- ✅ Notification system
- ✅ Responsive design

### **Main Website**
- ✅ Dynamic event loading from Supabase
- ✅ Beautiful event cards with images
- ✅ Registration link integration
- ✅ Empty state handling
- ✅ No admin authentication required
- ✅ Mobile-responsive design

### **Database & Storage**
- ✅ Public read/write access
- ✅ Image storage with public URLs
- ✅ Proper RLS policies
- ✅ Sample data for testing
- ✅ Error handling and logging

## 🔄 **Next Steps**

1. **Test All Features**: Run through the testing checklist
2. **Add Sample Events**: Create a few test events via admin
3. **Verify Integration**: Check that changes appear on main site
4. **Deploy**: Upload to hosting service
5. **Monitor**: Check for any console errors or issues

## 📞 **Support**

If you encounter any issues:
1. Check browser console for error messages
2. Verify Supabase project settings
3. Test database connection manually
4. Review network requests in browser dev tools

---

**Status**: ✅ **Ready for Testing**
**Last Updated**: January 2025
**Version**: 1.0.0 