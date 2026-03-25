const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildErrorState(entries) {
  return Object.fromEntries(entries.filter(([, value]) => value));
}

export function validateRegisterForm(form) {
  return buildErrorState([
    [
      'name',
      !form.name.trim()
        ? 'Full name is required.'
        : form.name.trim().length < 3
          ? 'Full name must be at least 3 characters long.'
          : '',
    ],
    [
      'email',
      !form.email.trim()
        ? 'Email address is required.'
        : !emailPattern.test(form.email.trim())
          ? 'Please enter a valid email address.'
          : '',
    ],
    [
      'password',
      !form.password
        ? 'Password is required.'
        : form.password.length < 6
          ? 'Password must be at least 6 characters long.'
          : '',
    ],
  ]);
}

export function validateLoginForm(form) {
  return buildErrorState([
    [
      'email',
      !form.email.trim()
        ? 'Email address is required.'
        : !emailPattern.test(form.email.trim())
          ? 'Please enter a valid email address.'
          : '',
    ],
    [
      'password',
      !form.password
        ? 'Password is required.'
        : form.password.length < 6
          ? 'Password must be at least 6 characters long.'
          : '',
    ],
  ]);
}
