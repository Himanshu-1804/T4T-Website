// Login Page Functionality

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rememberCheckbox = document.getElementById('remember');

  // Form submission
  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;

    // Validate inputs
    if (!validateForm(email, password)) {
      return;
    }

    // Attempt login
    const success = await authManager.login(email, password);
    
    if (success && remember) {
      // Store remember me preference
      localStorage.setItem('t4t_remember', 'true');
    }
  });

  // Real-time validation
  emailInput.addEventListener('blur', function() {
    validateEmail(this.value);
  });

  passwordInput.addEventListener('blur', function() {
    validatePassword(this.value);
  });

  // Enter key support
  passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      loginForm.dispatchEvent(new Event('submit'));
    }
  });

  // Google OAuth (mock)
  const googleBtn = document.querySelector('.btn-google');
  if (googleBtn) {
    googleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      handleGoogleLogin();
    });
  }

  // Forgot password
  const forgotPasswordLink = document.querySelector('.forgot-password');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      handleForgotPassword();
    });
  }
});

function validateForm(email, password) {
  let isValid = true;

  // Validate email
  if (!validateEmail(email)) {
    isValid = false;
  }

  // Validate password
  if (!validatePassword(password)) {
    isValid = false;
  }

  return isValid;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    showFieldError('email', 'Email is required');
    return false;
  }
  
  if (!emailRegex.test(email)) {
    showFieldError('email', 'Please enter a valid email address');
    return false;
  }
  
  clearFieldError('email');
  return true;
}

function validatePassword(password) {
  if (!password) {
    showFieldError('password', 'Password is required');
    return false;
  }
  
  if (password.length < 6) {
    showFieldError('password', 'Password must be at least 6 characters');
    return false;
  }
  
  clearFieldError('password');
  return true;
}

function showFieldError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const errorDiv = document.getElementById(`${fieldName}-error`);
  
  // Remove existing error
  if (errorDiv) {
    errorDiv.remove();
  }
  
  // Add error styling
  field.classList.add('error');
  
  // Create error message
  const errorElement = document.createElement('div');
  errorElement.id = `${fieldName}-error`;
  errorElement.className = 'field-error';
  errorElement.textContent = message;
  
  // Insert after the field
  field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearFieldError(fieldName) {
  const field = document.getElementById(fieldName);
  const errorDiv = document.getElementById(`${fieldName}-error`);
  
  // Remove error styling
  field.classList.remove('error');
  
  // Remove error message
  if (errorDiv) {
    errorDiv.remove();
  }
}

async function handleGoogleLogin() {
  try {
    // Show loading state
    const googleBtn = document.querySelector('.btn-google');
    googleBtn.classList.add('loading');
    googleBtn.disabled = true;
    
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful Google login
    const mockUser = {
      id: 'google_' + Math.random().toString(36).substr(2, 9),
      email: 'user@gmail.com',
      firstName: 'Google',
      lastName: 'User',
      role: 'student'
    };
    
    // Store session
    localStorage.setItem('t4t_token', 'google_token_' + Math.random().toString(36).substr(2, 9));
    localStorage.setItem('t4t_user', JSON.stringify(mockUser));
    
    // Update auth manager
    authManager.currentUser = mockUser;
    authManager.isAuthenticated = true;
    
    // Show success message
    authManager.showMessage('Google login successful!', 'success');
    
    // Redirect
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
    
  } catch (error) {
    console.error('Google login error:', error);
    authManager.showMessage('Google login failed. Please try again.', 'error');
  } finally {
    // Reset button state
    const googleBtn = document.querySelector('.btn-google');
    googleBtn.classList.remove('loading');
    googleBtn.disabled = false;
  }
}

function handleForgotPassword() {
  const email = document.getElementById('email').value.trim();
  
  if (!email) {
    authManager.showMessage('Please enter your email address first', 'error');
    return;
  }
  
  if (!authManager.validateEmail(email)) {
    authManager.showMessage('Please enter a valid email address', 'error');
    return;
  }
  
  // Show success message (in real app, this would send a reset email)
  authManager.showMessage('Password reset email sent! Check your inbox.', 'success');
}

// Add CSS for field errors
const style = document.createElement('style');
style.textContent = `
  .field-error {
    color: #c62828;
    font-size: 0.9rem;
    margin-top: 5px;
  }
  
  .form-group input.error {
    border-color: #c62828;
  }
  
  .message {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 0.9rem;
  }
  
  .error-message {
    background: #ffebee;
    color: #c62828;
  }
  
  .success-message {
    background: #e8f5e8;
    color: #2e7d32;
  }
`;
document.head.appendChild(style); 