import { useEffect, useState } from 'react';
import { loginUser } from '../utils/authApi';
import { validateLoginForm } from '../utils/validation';

const initialLoginState = {
  email: '',
  password: '',
};

function LoginForm({ apiBaseUrl, registeredEmail = '', onLoginSuccess }) {
  const [form, setForm] = useState({
    ...initialLoginState,
    email: registeredEmail,
  });
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

  useEffect(() => {
    if (!registeredEmail) {
      return;
    }

    setForm((current) => ({
      ...current,
      email: registeredEmail,
    }));
  }, [registeredEmail]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateLoginForm(form);
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
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };

      const data = await loginUser(apiBaseUrl, payload);

      setStatus({ type: 'success', message: `${data.message} Token generated successfully.` });
      setForm(initialLoginState);
      onLoginSuccess?.(data.user);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="form-copy">
        <p className="form-kicker">Login</p>
        <h2>Sign in</h2>
        <p>Use the same credentials to confirm the API and database connection.</p>
      </div>

      <label htmlFor="login-email">Email address</label>
      <input
        id="login-email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={form.email}
        onChange={handleChange}
        aria-invalid={Boolean(errors.email)}
        required
      />
      {errors.email ? <p className="field-message error">{errors.email}</p> : null}

      <label htmlFor="login-password">Password</label>
      <input
        id="login-password"
        name="password"
        type="password"
        placeholder="Enter your password"
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
        {isSubmitting ? 'Signing in...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;
