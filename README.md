# Teens 4 Teens Website

A modern, responsive website for Teens 4 Teens, an organization dedicated to providing menstrual products and education to girls worldwide. The website features a beautiful design with interactive elements, global impact visualization, and comprehensive user engagement tools.

## Features

### **Core Functionality**
- **Multi-Page Architecture**: Homepage, Login, Register, Donate, and Take Action pages
- **Responsive Design**: Mobile-first design that works perfectly on all devices
- **User Authentication**: Complete login and registration system with client-side storage
- **Interactive Elements**: Testimonials carousel, functional chatbot, and smooth scrolling

### **Global Impact Visualization**
- **Interactive World Map**: Shows T4T's global presence across North America, Africa, and Asia
- **Impact Statistics**: Displays key metrics like girls helped, volunteers, and school partnerships
- **Visual Storytelling**: Engaging way to showcase worldwide reach and impact

### **User Engagement**
- **Menstrual Health Quiz**: Interactive quiz feature (coming soon) to educate users
- **Donation System**: Complete payment form with multiple donation options
- **Take Action Hub**: Central location for user engagement and involvement opportunities
- **Contact Forms**: Easy communication channels for users

### **Design & UX**
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: Optimized loading and smooth interactions
- **Brand Consistency**: Cohesive pink theme throughout the site

## Pages

- **`index.html`**: Main homepage with hero section, global impact map, and organization overview
- **`login.html`**: User login page with form validation
- **`register.html`**: User registration page with comprehensive form
- **`donate.html`**: Donation page with payment options and impact calculator
- **`take-action.html`**: Engagement hub with ways to get involved

## Project Structure

```
T4T Website/
├── index.html                # Main homepage with world map
├── login.html               # Login page
├── register.html            # Registration page
├── donate.html              # Donation page
├── take-action.html         # Take Action page
├── styles.css               # Main stylesheet with responsive design
├── login.css                # Login/registration specific styles
├── config/
│   └── database.js          # IndexedDB database configuration
├── js/
│   ├── auth.js              # Authentication logic
│   ├── login.js             # Login page functionality
│   ├── register.js          # Registration page functionality
│   └── main.js              # Homepage JavaScript with world map interactions
├── img/
│   └── logo.png             # Site logo
└── README.md                # This documentation file
```

## Key Features in Detail

### **World Map Integration**
- Interactive pins showing T4T's presence across continents
- Hover effects with continent names
- Responsive design that works on all screen sizes
- Smooth animations and accessibility features

### **Menstrual Health Quiz**
- Placeholder feature with alert notification
- Future implementation planned with interactive questions
- Educational content about menstrual health and puberty
- Personalized results and recommendations

### **Donation System**
- Multiple donation amount options
- Custom amount input with real-time formatting
- Complete payment form with validation
- Security features and impact calculator

### **User Authentication**
- Client-side user management using IndexedDB
- Form validation and error handling
- Secure password requirements
- Session management

## Getting Started

### **Quick Start**
Simply open `index.html` in your web browser to view the website.

### **Local Development Server** (Recommended)
For the best experience and to ensure all JavaScript features work correctly:

```bash
# Using Python
python -m http.server

# Using Node.js (requires 'serve' package)
npx serve .

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Test Accounts

The following mock user accounts are available for testing:

| Email                 | Password     | Role      |
| --------------------- | ------------ | --------- |
| admin@teens4teens.net | admin123     | Admin     |
| volunteer@example.com | volunteer123 | Volunteer |
| student@example.com   | student123   | Student   |

## Technologies Used

- **HTML5**: Semantic markup and modern structure
- **CSS3**: Flexbox, Grid, Animations, and responsive design
- **Vanilla JavaScript**: ES6+ features and modern APIs
- **IndexedDB**: Client-side database for user data storage
- **Web APIs**: Intersection Observer, Local Storage, and more

## Browser Support

Optimized for modern browsers with full support for:

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)

## Accessibility Features

- **Keyboard Navigation**: Full tab navigation support
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear visual focus indicators
- **Color Contrast**: WCAG compliant color schemes
- **Mobile Accessibility**: Touch-friendly interactions

## Performance Optimizations

- **Lazy Loading**: Images and content load as needed
- **CSS Optimizations**: Efficient selectors and minimal reflows
- **JavaScript Efficiency**: Event delegation and optimized animations
- **Responsive Images**: Appropriate sizing for different devices

## Future Enhancements

- **Menstrual Health Quiz**: Full interactive implementation
- **Chapter Locator**: Find local T4T chapters
- **Impact Calculator**: Personalized impact visualization
- **Mobile App**: Native mobile application
- **Volunteer Portal**: Enhanced volunteer management
- **Analytics Dashboard**: Impact tracking and reporting

## Contact Information

- **Email**: info@teens4teens.net
- **Website**: https://www.teens4teens.net/
- **Mission**: Empowering girls worldwide through menstrual health education and access to products

## Contributing

This website is designed to support Teens 4 Teens' mission of providing menstrual products and education to girls worldwide. For questions about the organization or to get involved, please visit the official website or contact the organization directly.

---

*Built with ❤️ to support menstrual health equity worldwide* 