# CoSA - Collegiate Society of Advertising Website

A responsive, infinite-scrolling single-page website for the Collegiate Society of Advertising (CoSA) with the tagline "Live Creative."

## 🎨 Features

### Design & Branding
- **Brand Colors**: Orange (#FF7800), Red-Orange (#EC3B13), Light Beige (#FBF6D9), Yellow (#FFD200)
- **Typography**: Montserrat ExtraBold (brand), Work Sans SemiBold (headings), Karla Regular (body)
- **Responsive Design**: Mobile-first approach with smooth animations
- **Modern UI**: Clean, professional design with hover effects and transitions

### Sections
1. **Hero Section**: Animated tagline with CTA and floating elements
2. **About**: Founding year, mission, and vision
3. **Mission & Vision**: Stylized block quotes with creative layout
4. **What We Do**: 4 icon cards (Campaigns, Trainings, Events, Youth Exposure)
5. **Leadership**: Dynamic officer cards loaded from Supabase or mock data
6. **Events**: Dynamic event cards loaded from Supabase or mock data
7. **Contact**: Netlify-compatible form with Supabase integration
8. **Footer**: Organization info, navigation, and social links

### Technical Features
- **Supabase Integration**: Real-time data fetching for events and contact form
- **Scroll Animations**: Intersection Observer API for reveal effects
- **Mobile Navigation**: Responsive hamburger menu
- **Form Handling**: Dual submission (Supabase + Netlify fallback)
- **Performance Optimized**: Fast loading with modern JavaScript
- **Error Handling**: Graceful fallbacks and user notifications

## 🚀 Quick Start

### Prerequisites
- Modern web browser
- Netlify account (for deployment)
- Supabase account (optional, for backend functionality)

### Local Development

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd CoSA
   ```

2. **Open in your browser**
   ```bash
   # Using Python (if available)
   python -m http.server 8000
   
   # Using Node.js (if available)
   npx serve .
   
   # Or simply open index.html in your browser
   ```

3. **Configure Supabase (Optional)**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Create the following tables:

       **Events Table:**
    ```sql
    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      time TIME,
      location TEXT,
      category TEXT,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
    ```

    **Officers Table:**
    ```sql
    CREATE TABLE officers (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      photo_url TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
    ```

    **Inquiries Table:**
    ```sql
    CREATE TABLE inquiries (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
    ```

   - Update the Supabase credentials in `script.js`:
   ```javascript
   const SUPABASE_URL = 'your-supabase-url';
   const SUPABASE_ANON_KEY = 'your-supabase-anon-key';
   ```

## 📁 Project Structure

```
CoSA/
├── index.html          # Main website
├── script.js           # JavaScript functionality
├── 404.html           # Custom 404 page
├── config.js           # Configuration file
├── netlify.toml       # Netlify configuration
├── test.html          # Test page
└── README.md          # This file
```

## 🎯 Customization

### Brand Colors
Update the CSS custom properties in `index.html`:
```css
:root {
    --cosa-orange: #FF7800;
    --cosa-red-orange: #EC3B13;
    --cosa-light-beige: #FBF6D9;
    --cosa-yellow: #FFD200;
}
```

### Content Updates
- **Hero Section**: Update tagline and CTA in the hero section
- **About Section**: Modify founding year, mission, and vision text
- **Events**: Add/remove events through Supabase or update mock data
- **Contact**: Update email and location information

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding navigation link
3. Include `reveal` class for scroll animations
4. Update mobile menu if needed

## 🌐 Deployment

### Netlify Deployment

1. **Connect to Netlify**
   - Drag and drop the project folder to [netlify.com](https://netlify.com)
   - Or connect your Git repository

2. **Configure Form Handling**
   - Netlify will automatically detect the contact form
   - Forms are processed and can be viewed in the Netlify dashboard

3. **Custom Domain (Optional)**
   - Add your custom domain in Netlify settings
   - Configure DNS settings as instructed

### Environment Variables (Optional)
If using Supabase, add these to your Netlify environment variables:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the SQL commands above to create tables
3. Update the credentials in `script.js`
4. Test the connection by adding some events

### Form Configuration
The contact form supports both Supabase and Netlify:
- **Supabase**: Messages stored in the `inquiries` table
- **Netlify**: Automatic form processing (fallback)

### Performance Optimization
- Images are optimized for web
- CSS and JS are minified via CDN
- Lazy loading implemented for better performance

## 🐛 Troubleshooting

### Common Issues

**Events not loading:**
- Check Supabase credentials in `script.js`
- Verify the `events` table exists in Supabase
- Check browser console for errors

**Form not submitting:**
- Ensure Supabase is configured correctly
- Check Netlify form settings
- Verify form validation

**Animations not working:**
- Ensure JavaScript is enabled
- Check for console errors
- Verify Intersection Observer API support

### Browser Support
- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 79+

## 📱 Mobile Optimization

The website is fully responsive with:
- Mobile-first design approach
- Touch-friendly navigation
- Optimized images and animations
- Fast loading on mobile networks

## 🎨 Design System

### Typography Scale
- **Brand**: Montserrat ExtraBold (800)
- **Headings**: Work Sans SemiBold (600)
- **Body**: Karla Regular (400)

### Spacing
- Consistent 8px grid system
- Responsive padding and margins
- Mobile-optimized spacing

### Animations
- Smooth scroll behavior
- Intersection Observer animations
- Hover effects and transitions
- Floating elements in hero section

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for the Collegiate Society of Advertising (CoSA).

## 📞 Support

For questions or support:
- Email: info@cosa.org
- Website: [Your deployed URL]

---

**Live Creative** - Collegiate Society of Advertising
