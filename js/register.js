// Registration Page Functionality

document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const ageInput = document.getElementById('age');

  // Form submission
  registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(registerForm);
    const userData = {
      firstName: formData.get('firstName').trim(),
      lastName: formData.get('lastName').trim(),
      email: formData.get('email').trim(),
      age: parseInt(formData.get('age')),
      school: formData.get('school').trim(),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      terms: formData.get('terms') === 'on',
      newsletter: formData.get('newsletter') === 'on'
    };

    // Validate form
    if (!validateRegistrationForm(userData)) {
      return;
    }

    // Attempt registration
    await authManager.register(userData);
  });

  // Real-time validation
  const inputs = registerForm.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
  });

  // Password confirmation validation
  confirmPasswordInput.addEventListener('input', function() {
    validatePasswordConfirmation();
  });

  // Age validation
  ageInput.addEventListener('input', function() {
    validateAge(this.value);
  });

  // Terms checkbox validation
  const termsCheckbox = document.getElementById('terms');
  termsCheckbox.addEventListener('change', function() {
    validateTerms();
  });

  // Google OAuth (mock)
  const googleBtn = document.querySelector('.btn-google');
  if (googleBtn) {
    googleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      handleGoogleSignup();
    });
  }
});

function validateRegistrationForm(userData) {
  let isValid = true;

  // Validate each field
  if (!validateFieldByName('firstName', userData.firstName)) isValid = false;
  if (!validateFieldByName('lastName', userData.lastName)) isValid = false;
  if (!validateFieldByName('email', userData.email)) isValid = false;
  if (!validateFieldByName('age', userData.age)) isValid = false;
  if (!validateFieldByName('password', userData.password)) isValid = false;
  if (!validatePasswordConfirmation()) isValid = false;
  if (!validateTerms()) isValid = false;

  return isValid;
}

function validateField(field) {
  const fieldName = field.name;
  const value = field.value.trim();

  switch (fieldName) {
    case 'firstName':
    case 'lastName':
      return validateName(fieldName, value);
    case 'email':
      return validateEmail(value);
    case 'age':
      return validateAge(value);
    case 'password':
      return validatePassword(value);
    case 'confirmPassword':
      return validatePasswordConfirmation();
    default:
      return true;
  }
}

function validateFieldByName(fieldName, value) {
  const field = document.getElementById(fieldName);
  if (!field) return true;
  
  field.value = value;
  return validateField(field);
}

function validateName(fieldName, value) {
  if (!value) {
    showFieldError(fieldName, `${fieldName === 'firstName' ? 'First name' : 'Last name'} is required`);
    return false;
  }
  
  if (value.length < 2) {
    showFieldError(fieldName, `${fieldName === 'firstName' ? 'First name' : 'Last name'} must be at least 2 characters`);
    return false;
  }
  
  if (!/^[a-zA-Z\s]+$/.test(value)) {
    showFieldError(fieldName, `${fieldName === 'firstName' ? 'First name' : 'Last name'} can only contain letters`);
    return false;
  }
  
  clearFieldError(fieldName);
  return true;
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

function validateAge(age) {
  const ageNum = parseInt(age);
  
  if (!age || isNaN(ageNum)) {
    showFieldError('age', 'Age is required');
    return false;
  }
  
  if (ageNum < 13 || ageNum > 25) {
    showFieldError('age', 'Age must be between 13 and 25');
    return false;
  }
  
  clearFieldError('age');
  return true;
}

function validatePassword(password) {
  if (!password) {
    showFieldError('password', 'Password is required');
    return false;
  }
  
  if (password.length < 8) {
    showFieldError('password', 'Password must be at least 8 characters');
    return false;
  }
  
  // Check for at least one uppercase, one lowercase, and one number
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  
  if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    showFieldError('password', 'Password must contain uppercase, lowercase, and number');
    return false;
  }
  
  clearFieldError('password');
  return true;
}

function validatePasswordConfirmation() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  if (!confirmPassword) {
    showFieldError('confirmPassword', 'Please confirm your password');
    return false;
  }
  
  if (password !== confirmPassword) {
    showFieldError('confirmPassword', 'Passwords do not match');
    return false;
  }
  
  clearFieldError('confirmPassword');
  return true;
}

function validateTerms() {
  const termsCheckbox = document.getElementById('terms');
  
  if (!termsCheckbox.checked) {
    showFieldError('terms', 'You must agree to the Terms of Service and Privacy Policy');
    return false;
  }
  
  clearFieldError('terms');
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
  if (field) {
    field.classList.add('error');
  }
  
  // Create error message
  const errorElement = document.createElement('div');
  errorElement.id = `${fieldName}-error`;
  errorElement.className = 'field-error';
  errorElement.textContent = message;
  
  // Insert after the field or its container
  if (field) {
    if (field.type === 'checkbox') {
      // For checkboxes, insert after the label
      const label = field.closest('.checkbox-label');
      if (label) {
        label.parentNode.insertBefore(errorElement, label.nextSibling);
      }
    } else {
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
  }
}

function clearFieldError(fieldName) {
  const field = document.getElementById(fieldName);
  const errorDiv = document.getElementById(`${fieldName}-error`);
  
  // Remove error styling
  if (field) {
    field.classList.remove('error');
  }
  
  // Remove error message
  if (errorDiv) {
    errorDiv.remove();
  }
}

async function handleGoogleSignup() {
  try {
    // Show loading state
    const googleBtn = document.querySelector('.btn-google');
    googleBtn.classList.add('loading');
    googleBtn.disabled = true;
    
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful Google signup
    const mockUser = {
      firstName: 'Google',
      lastName: 'User',
      email: 'user@gmail.com',
      age: 18,
      school: 'High School',
      newsletter: true
    };
    
    // Show success message
    authManager.showMessage('Google signup successful! Please complete your profile.', 'success');
    
    // Redirect to profile completion
    setTimeout(() => {
      window.location.href = 'complete-profile.html';
    }, 2000);
    
  } catch (error) {
    console.error('Google signup error:', error);
    authManager.showMessage('Google signup failed. Please try again.', 'error');
  } finally {
    // Reset button state
    const googleBtn = document.querySelector('.btn-google');
    googleBtn.classList.remove('loading');
    googleBtn.disabled = false;
  }
}

// Password strength indicator
document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      updatePasswordStrength(this.value);
    });
  }
});

function updatePasswordStrength(password) {
  const strengthIndicator = document.getElementById('password-strength');
  if (!strengthIndicator) return;
  
  let strength = 0;
  let feedback = '';
  
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  switch (strength) {
    case 0:
    case 1:
      feedback = 'Very Weak';
      strengthIndicator.className = 'strength-very-weak';
      break;
    case 2:
      feedback = 'Weak';
      strengthIndicator.className = 'strength-weak';
      break;
    case 3:
      feedback = 'Fair';
      strengthIndicator.className = 'strength-fair';
      break;
    case 4:
      feedback = 'Good';
      strengthIndicator.className = 'strength-good';
      break;
    case 5:
      feedback = 'Strong';
      strengthIndicator.className = 'strength-strong';
      break;
  }
  
  strengthIndicator.textContent = feedback;
} 