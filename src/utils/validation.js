const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegisterForm(form) {
  if (!form.name.trim()) {
    return 'Full name is required.';
  }

  if (form.name.trim().length < 3) {
    return 'Full name must be at least 3 characters long.';
  }

  if (!form.email.trim()) {
    return 'Email address is required.';
  }

  if (!emailPattern.test(form.email.trim())) {
    return 'Please enter a valid email address.';
  }

  if (!form.password) {
    return 'Password is required.';
  }

  if (form.password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }

  return '';
}

export function validateLoginForm(form) {
  if (!form.email.trim()) {
    return 'Email address is required.';
  }

  if (!emailPattern.test(form.email.trim())) {
    return 'Please enter a valid email address.';
  }

  if (!form.password) {
    return 'Password is required.';
  }

  if (form.password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }

  return '';
}
