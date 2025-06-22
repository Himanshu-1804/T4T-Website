# Teens 4 Teens Website Replica

This project is a modern, responsive replica of the official Teens 4 Teens website, built with additional features to showcase a complete user experience. It includes a full authentication system, a donation page, a take action page, and interactive elements like a chatbot and testimonials carousel.

## Features

-   **Multi-Page Architecture**: Includes separate pages for Home, Login, Register, Donate, and Take Action.
-   **Responsive Design**: A mobile-first design that looks great on all devices, built with modern CSS.
-   **User Authentication**: A complete, mock authentication system with login and registration functionality.
-   **Interactive Elements**: Includes a testimonials carousel, a functional chatbot, and smooth scrolling.
-   **Donation Page**: A dedicated page for donations with a complete payment form.
-   **Take Action Page**: A central hub for user engagement with impact stories and ways to get involved.
-   **Client-Side Database**: Uses IndexedDB to store and manage mock user data, chapters, and donations.

## Pages

-   `index.html`: The main homepage with an overview of the organization.
-   `login.html`: The user login page.
-   `register.html`: The user registration page.
-   `donate.html`: The donation page with payment options.
-   `take-action.html`: The "Take Action" page with engagement opportunities.

## Project Structure

```
T4T Website/
├── index.html                # Main homepage
├── login.html               # Login page
├── register.html            # Registration page
├── donate.html              # Donation page
├── take-action.html         # Take Action page
├── styles.css               # Main stylesheet
├── login.css                # Login/registration styles
├── config/database.js       # IndexedDB database configuration
├── js/
│   ├── auth.js              # Authentication logic
│   ├── login.js             # Login page functionality
│   ├── register.js          # Registration page functionality
│   └── main.js              # Homepage JavaScript
├── img/
│   └── logo.png             # Site logo
└── README.md                # This documentation file
```

## Getting Started

To view the website, simply open the `index.html` file in your web browser. For the best experience and to ensure all JavaScript features work correctly, it's recommended to serve the files using a local web server.

```bash
# Using Python
python -m http.server

# Using Node.js (requires 'serve' package)
npx serve .
```

Then, navigate to `http://localhost:8000` (or the appropriate port) in your browser.

## Test Accounts

The following mock user accounts are available for testing:

| Email                 | Password     | Role      |
| --------------------- | ------------ | --------- |
| admin@teens4teens.net | admin123     | Admin     |
| volunteer@example.com | volunteer123 | Volunteer |
| student@example.com   | student123   | Student   |

## Technologies Used

-   **HTML5**
-   **CSS3** (Flexbox, Grid, Animations)
-   **Vanilla JavaScript**
-   **IndexedDB** for client-side storage

## Browser Support

This website is optimized for the latest versions of modern browsers:

-   Chrome
-   Firefox
-   Safari
-   Edge

## Contact

- Email: info@teens4teens.net
- Website: https://www.teens4teens.net/ 