import { useState } from 'react';
import { validateRegisterForm } from '../utils/validation';

const initialRegisterState = {
  name: '',
  email: '',
  password: '',
};

function RegisterForm({ apiBaseUrl, onRegisterSuccess }) {
  const [form, setForm] = useState(initialRegisterState);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationMessage = validateRegisterForm(form);
    if (validationMessage) {
      setStatus({ type: 'error', message: validationMessage });
      return;
    }

    setStatus({ type: '', message: '' });
    setIsSubmitting(true);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };

      const response = await fetch(`${apiBaseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

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
        minLength="3"
        required
      />

      <label htmlFor="register-email">Email address</label>
      <input
        id="register-email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="register-password">Password</label>
      <input
        id="register-password"
        name="password"
        type="password"
        placeholder="Create a password"
        value={form.password}
        onChange={handleChange}
        minLength="6"
        required
      />

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
