# Teens 4 Teens Website

A modern, responsive website for the Teens 4 Teens nonprofit organization, featuring user authentication, interactive elements, and a comprehensive content management system.

## 🌟 Features

### Core Website
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Interactive Carousel**: Auto-advancing testimonials with manual controls
- **Smart Chatbot**: AI-powered customer support with keyword recognition
- **Contact Form**: Validated contact form with real-time feedback
- **Smooth Scrolling**: Enhanced navigation experience

### User Authentication System
- **Login/Registration**: Complete user authentication flow
- **Session Management**: Persistent login sessions with localStorage
- **Form Validation**: Real-time client-side validation
- **Google OAuth**: Mock Google sign-in integration
- **Password Recovery**: Forgot password functionality

### Database & Backend
- **IndexedDB Integration**: Client-side database for data persistence
- **Mock API**: Simulated backend endpoints for development
- **User Management**: Complete CRUD operations for users
- **Statistics Tracking**: Donation and impact metrics

## 📁 Project Structure

```
T4T Website/
├── test.html                 # Main homepage
├── login.html               # Login page
├── register.html            # Registration page
├── styles.css               # Main stylesheet
├── login.css                # Login/registration styles
├── config/
│   └── database.js          # Database configuration
├── js/
│   ├── auth.js              # Authentication logic
│   ├── login.js             # Login page functionality
│   ├── register.js          # Registration functionality
│   └── main.js              # Main homepage JavaScript
└── README.md                # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser with IndexedDB support
- Local web server (for development)

### Installation
1. Clone or download the project files
2. Open `test.html` in your browser
3. For development, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 🎨 Design System

### Color Palette
- **Primary**: #E91E63 (Pink)
- **Secondary**: #9C27B0 (Purple)
- **Success**: #2e7d32 (Green)
- **Error**: #c62828 (Red)
- **Text**: #333 (Dark Gray)
- **Background**: #f8f9fa (Light Gray)

### Typography
- **Font Family**: Arial, sans-serif
- **Headings**: Bold, varying sizes (2rem - 3.5rem)
- **Body Text**: 1rem - 1.3rem
- **Line Height**: 1.6

## 🔧 Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid/Flexbox
- **Vanilla JavaScript**: No framework dependencies
- **IndexedDB**: Client-side database storage

### Key Features Implementation

#### Authentication System
```javascript
// Example usage
const authManager = new AuthManager();
await authManager.login(email, password);
await authManager.register(userData);
```

#### Database Operations
```javascript
// Example usage
const dbManager = new DatabaseManager();
await dbManager.createUser(userData);
await dbManager.getStatistics();
```

#### Chatbot Intelligence
The chatbot uses keyword-based responses for common queries:
- Donations and giving
- Volunteering opportunities
- Product information
- School chapters
- Contact information
- Mission and statistics

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🔐 Security Features

- **Password Validation**: Minimum 8 characters with complexity requirements
- **Email Validation**: Proper email format verification
- **Session Management**: Secure token-based authentication
- **Input Sanitization**: XSS prevention measures

## 🧪 Testing

### Test Accounts
Use these mock accounts for testing:

| Email | Password | Role |
|-------|----------|------|
| admin@teens4teens.net | admin123 | Admin |
| volunteer@example.com | volunteer123 | Volunteer |
| student@example.com | student123 | Student |

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🚀 Deployment

### Static Hosting
The website can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Firebase Hosting

### Production Considerations
1. Replace mock APIs with real backend endpoints
2. Implement proper server-side validation
3. Add HTTPS enforcement
4. Configure proper CORS headers
5. Set up monitoring and analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for the Teens 4 Teens nonprofit organization.

## 📞 Support

For technical support or questions:
- Email: info@teens4teens.net
- Website: https://www.teens4teens.net/

## 🔄 Future Enhancements

- [ ] Real backend API integration
- [ ] Payment processing for donations
- [ ] Chapter management dashboard
- [ ] Volunteer scheduling system
- [ ] Product inventory management
- [ ] Email notification system
- [ ] Multi-language support
- [ ] Advanced analytics dashboard 