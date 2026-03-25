const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(email = '') {
  return email.trim().toLowerCase();
}

function validateRegisterPayload(payload = {}) {
  const name = payload.name ? payload.name.trim() : '';
  const email = normalizeEmail(payload.email);
  const password = payload.password || '';

  if (!name || !email || !password) {
    return {
      isValid: false,
      message: 'All fields are required.',
      values: { name, email, password },
    };
  }

  if (name.length < 3) {
    return {
      isValid: false,
      message: 'Full name must be at least 3 characters long.',
      values: { name, email, password },
    };
  }

  if (!emailPattern.test(email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address.',
      values: { name, email, password },
    };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      message: 'Password must be at least 6 characters long.',
      values: { name, email, password },
    };
  }

  return {
    isValid: true,
    values: { name, email, password },
  };
}

function validateLoginPayload(payload = {}) {
  const email = normalizeEmail(payload.email);
  const password = payload.password || '';

  if (!email || !password) {
    return {
      isValid: false,
      message: 'Email and password are required.',
      values: { email, password },
    };
  }

  if (!emailPattern.test(email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address.',
      values: { email, password },
    };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      message: 'Password must be at least 6 characters long.',
      values: { email, password },
    };
  }

  return {
    isValid: true,
    values: { email, password },
  };
}

module.exports = {
  normalizeEmail,
  validateRegisterPayload,
  validateLoginPayload,
};
