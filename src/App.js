import { useMemo, useState } from 'react';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const initialRegisterState = {
  name: '',
  email: '',
  password: '',
};

const initialLoginState = {
  email: '',
  password: '',
};

function App() {
  const [activeTab, setActiveTab] = useState('register');
  const [registerForm, setRegisterForm] = useState(initialRegisterState);
  const [loginForm, setLoginForm] = useState(initialLoginState);
  const [registerStatus, setRegisterStatus] = useState({ type: '', message: '' });
  const [loginStatus, setLoginStatus] = useState({ type: '', message: '' });
  const [authUser, setAuthUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState({ register: false, login: false });

  const welcomeMessage = useMemo(() => {
    if (!authUser) {
      return 'Create a new account or log in with your existing details.';
    }

    return `Welcome back, ${authUser.name}. Your account is connected to MongoDB.`;
  }, [authUser]);

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const submitRegister = async (event) => {
    event.preventDefault();
    setRegisterStatus({ type: '', message: '' });
    setIsSubmitting((current) => ({ ...current, register: true }));

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      setRegisterStatus({ type: 'success', message: data.message });
      setAuthUser(data.user);
      setRegisterForm(initialRegisterState);
      setActiveTab('login');
      setLoginForm((current) => ({
        ...current,
        email: data.user.email,
      }));
    } catch (error) {
      setRegisterStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting((current) => ({ ...current, register: false }));
    }
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    setLoginStatus({ type: '', message: '' });
    setIsSubmitting((current) => ({ ...current, login: true }));

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      setLoginStatus({ type: 'success', message: `${data.message} Token generated successfully.` });
      setAuthUser(data.user);
      setLoginForm(initialLoginState);
    } catch (error) {
      setLoginStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting((current) => ({ ...current, login: false }));
    }
  };

  return (
    <main className="auth-shell">
      <section className="hero-panel">
        <p className="eyebrow">React + Node + MongoDB</p>
        <h1>Registration and login forms with separate frontend and backend.</h1>
        <p className="hero-copy">{welcomeMessage}</p>
        <div className="hero-points">
          <div>
            <strong>Frontend</strong>
            <span>React form validation, tab switching, API integration</span>
          </div>
          <div>
            <strong>Backend</strong>
            <span>Express routes, password hashing, MongoDB persistence</span>
          </div>
        </div>
      </section>

      <section className="form-panel">
        <div className="tab-row" role="tablist" aria-label="Authentication forms">
          <button
            type="button"
            className={activeTab === 'register' ? 'tab-button active' : 'tab-button'}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
          <button
            type="button"
            className={activeTab === 'login' ? 'tab-button active' : 'tab-button'}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
        </div>

        {activeTab === 'register' ? (
          <form className="auth-form" onSubmit={submitRegister}>
            <h2>Create account</h2>
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={registerForm.name}
              onChange={handleRegisterChange}
              minLength="3"
              required
            />

            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              required
            />

            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              minLength="6"
              required
            />

            {registerStatus.message ? (
              <p className={`status-message ${registerStatus.type}`}>{registerStatus.message}</p>
            ) : null}

            <button type="submit" className="submit-button" disabled={isSubmitting.register}>
              {isSubmitting.register ? 'Creating account...' : 'Register'}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={submitLogin}>
            <h2>Sign in</h2>
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={loginForm.email}
              onChange={handleLoginChange}
              required
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={loginForm.password}
              onChange={handleLoginChange}
              minLength="6"
              required
            />

            {loginStatus.message ? (
              <p className={`status-message ${loginStatus.type}`}>{loginStatus.message}</p>
            ) : null}

            <button type="submit" className="submit-button" disabled={isSubmitting.login}>
              {isSubmitting.login ? 'Signing in...' : 'Login'}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

export default App;
