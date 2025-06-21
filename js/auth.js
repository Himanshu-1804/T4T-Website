// Authentication and User Management

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.init();
  }

  init() {
    // Check for existing session
    this.checkSession();
    // Set up event listeners
    this.setupEventListeners();
  }

  checkSession() {
    const token = localStorage.getItem('t4t_token');
    const userData = localStorage.getItem('t4t_user');
    
    if (token && userData) {
      try {
        this.currentUser = JSON.parse(userData);
        this.isAuthenticated = true;
        this.updateUI();
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.logout();
      }
    }
  }

  setupEventListeners() {
    // Listen for storage changes (for multi-tab logout)
    window.addEventListener('storage', (e) => {
      if (e.key === 't4t_token' && !e.newValue) {
        this.logout();
      }
    });
  }

  async login(email, password) {
    try {
      // Show loading state
      this.showLoading(true);
      
      // Simulate API call
      const response = await this.mockLoginAPI(email, password);
      
      if (response.success) {
        this.currentUser = response.user;
        this.isAuthenticated = true;
        
        // Store session data
        localStorage.setItem('t4t_token', response.token);
        localStorage.setItem('t4t_user', JSON.stringify(response.user));
        
        this.updateUI();
        this.showMessage('Login successful!', 'success');
        
        // Redirect to dashboard or home
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000);
        
        return true;
      } else {
        this.showMessage(response.message, 'error');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      this.showMessage('An error occurred during login', 'error');
      return false;
    } finally {
      this.showLoading(false);
    }
  }

  async register(userData) {
    try {
      this.showLoading(true);
      
      // Validate password
      if (userData.password !== userData.confirmPassword) {
        this.showMessage('Passwords do not match', 'error');
        return false;
      }
      
      if (userData.password.length < 8) {
        this.showMessage('Password must be at least 8 characters', 'error');
        return false;
      }
      
      // Simulate API call
      const response = await this.mockRegisterAPI(userData);
      
      if (response.success) {
        this.showMessage('Registration successful! Please log in.', 'success');
        
        // Redirect to login
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
        
        return true;
      } else {
        this.showMessage(response.message, 'error');
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      this.showMessage('An error occurred during registration', 'error');
      return false;
    } finally {
      this.showLoading(false);
    }
  }

  logout() {
    this.currentUser = null;
    this.isAuthenticated = false;
    
    // Clear session data
    localStorage.removeItem('t4t_token');
    localStorage.removeItem('t4t_user');
    
    this.updateUI();
    this.showMessage('Logged out successfully', 'success');
    
    // Redirect to home page
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }

  updateUI() {
    const loginLink = document.querySelector('a[href="login.html"]');
    const userMenu = document.querySelector('.user-menu');
    
    if (this.isAuthenticated && this.currentUser) {
      if (loginLink) {
        loginLink.textContent = this.currentUser.firstName;
        loginLink.href = 'dashboard.html';
      }
      
      if (userMenu) {
        userMenu.style.display = 'block';
        const userName = userMenu.querySelector('.user-name');
        if (userName) {
          userName.textContent = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
        }
      }
    } else {
      if (loginLink) {
        loginLink.textContent = 'Log In';
        loginLink.href = 'login.html';
      }
      
      if (userMenu) {
        userMenu.style.display = 'none';
      }
    }
  }

  showLoading(show) {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) {
      if (show) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    }
  }

  showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = message;
    
    // Insert at the top of the form
    const form = document.querySelector('form');
    if (form) {
      form.insertBefore(messageDiv, form.firstChild);
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }

  // Mock API calls (replace with real API endpoints)
  async mockLoginAPI(email, password) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user database
    const users = [
      { email: 'admin@teens4teens.net', password: 'admin123', firstName: 'Admin', lastName: 'User', role: 'admin' },
      { email: 'volunteer@example.com', password: 'volunteer123', firstName: 'Sarah', lastName: 'Johnson', role: 'volunteer' },
      { email: 'student@example.com', password: 'student123', firstName: 'Maria', lastName: 'Garcia', role: 'student' }
    ];
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      return {
        success: true,
        user: {
          id: Math.random().toString(36).substr(2, 9),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9)
      };
    } else {
      return {
        success: false,
        message: 'Invalid email or password'
      };
    }
  }

  async mockRegisterAPI(userData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if email already exists
    const existingEmails = ['admin@teens4teens.net', 'volunteer@example.com', 'student@example.com'];
    
    if (existingEmails.includes(userData.email)) {
      return {
        success: false,
        message: 'Email already registered'
      };
    }
    
    // Validate age
    if (userData.age < 13 || userData.age > 25) {
      return {
        success: false,
        message: 'Age must be between 13 and 25'
      };
    }
    
    return {
      success: true,
      message: 'Registration successful'
    };
  }

  // Utility methods
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validatePassword(password) {
    return password.length >= 8;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isUserAuthenticated() {
    return this.isAuthenticated;
  }
}

// Initialize auth manager
const authManager = new AuthManager();

// Export for use in other files
window.authManager = authManager; 