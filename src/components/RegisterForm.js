import { useState } from 'react';
import { registerUser } from '../utils/authApi';
import { validateRegisterForm } from '../utils/validation';

const initialRegisterState = {
  name: '',
  email: '',
  password: '',
};

function RegisterForm({ apiBaseUrl, onRegisterSuccess }) {
  const [form, setForm] = useState(initialRegisterState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateRegisterForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({ type: 'error', message: 'Please fix the highlighted fields and try again.' });
      return;
    }

    setErrors({});
    setStatus({ type: '', message: '' });
    setIsSubmitting(true);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };

      const data = await registerUser(apiBaseUrl, payload);

      setStatus({ type: 'success', message: data.message });
      setForm(initialRegisterState);
      onRegisterSuccess?.(data.user);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="form-copy">
        <p className="form-kicker">Register</p>
        <h2>Create account</h2>
        <p>Start with your basic details and save a new user in the database.</p>
      </div>

      <label htmlFor="register-name">Full name</label>
      <input
        id="register-name"
        name="name"
        type="text"
        placeholder="Enter your full name"
        value={form.name}
        onChange={handleChange}
        aria-invalid={Boolean(errors.name)}
        minLength="3"
        required
      />
      {errors.name ? <p className="field-message error">{errors.name}</p> : null}

      <label htmlFor="register-email">Email address</label>
      <input
        id="register-email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={form.email}
        onChange={handleChange}
        aria-invalid={Boolean(errors.email)}
        required
      />
      {errors.email ? <p className="field-message error">{errors.email}</p> : null}

      <label htmlFor="register-password">Password</label>
      <input
        id="register-password"
        name="password"
        type="password"
        placeholder="Create a password"
        value={form.password}
        onChange={handleChange}
        aria-invalid={Boolean(errors.password)}
        minLength="6"
        required
      />
      {errors.password ? <p className="field-message error">{errors.password}</p> : null}

      {status.message ? (
        <p className={`status-message ${status.type}`}>{status.message}</p>
      ) : null}

      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Register'}
      </button>
    </form>
  );
}

export default RegisterForm;
