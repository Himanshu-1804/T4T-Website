# Teens 4 Teens Website

A modern, responsive website for the Teens 4 Teens nonprofit organization with user authentication and interactive features.

## Features

- **Responsive Design**: Mobile-first with modern CSS Grid/Flexbox
- **User Authentication**: Login/registration with session management
- **Interactive Chatbot**: AI-powered support with keyword recognition
- **Testimonials Carousel**: Auto-advancing with manual controls
- **Contact Form**: Validated with real-time feedback
- **Database Integration**: IndexedDB for client-side data storage

## Project Structure

```
T4T Website/
├── test.html                 # Main homepage
├── login.html               # Login page
├── register.html            # Registration page
├── styles.css               # Main stylesheet
├── login.css                # Login/registration styles
├── config/database.js       # Database configuration
├── js/
│   ├── auth.js              # Authentication logic
│   ├── login.js             # Login functionality
│   ├── register.js          # Registration functionality
│   └── main.js              # Homepage JavaScript
└── README.md                # Documentation
```

## Getting Started

1. Open `test.html` in your browser
2. For development, use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

## Test Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@teens4teens.net | admin123 | Admin |
| volunteer@example.com | volunteer123 | Volunteer |
| student@example.com | student123 | Student |

## Technologies

- HTML5, CSS3, Vanilla JavaScript
- IndexedDB for client-side storage
- Responsive design with modern CSS

## Browser Support

- Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

## Contact

- Email: info@teens4teens.net
- Website: https://www.teens4teens.net/ 