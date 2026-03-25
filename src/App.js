import { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [activeView, setActiveView] = useState('register');

  const welcomeMessage = authUser
    ? `Welcome back, ${authUser.name}. Your account is connected to MongoDB.`
    : 'Create an account first, then switch to login with the same credentials to verify the full auth flow.';

  return (
    <main className="auth-shell">
      <section className="hero-panel">
        <p className="eyebrow">React + Node + MongoDB</p>
        <h1>Registration and login forms with separate frontend and backend.</h1>
        <p className="hero-copy">{welcomeMessage}</p>
        <div className="hero-points">
          <div>
            <strong>Frontend</strong>
            <span>Separate register and login forms with client-side validation and API integration</span>
          </div>
          <div>
            <strong>Backend</strong>
            <span>Express routes, request validation, password hashing, MongoDB persistence</span>
          </div>
        </div>
      </section>

      <section className="form-panel">
        <div className="auth-card">
          <div className="view-switcher" role="tablist" aria-label="Authentication forms">
            <button
              type="button"
              className={activeView === 'register' ? 'view-tab active' : 'view-tab'}
              onClick={() => setActiveView('register')}
            >
              Register
            </button>
            <button
              type="button"
              className={activeView === 'login' ? 'view-tab active' : 'view-tab'}
              onClick={() => setActiveView('login')}
            >
              Login
            </button>
          </div>

          {authUser ? (
            <div className="session-banner">
              <strong>Signed in as {authUser.name}</strong>
              <span>{authUser.email}</span>
            </div>
          ) : null}

          {activeView === 'register' ? (
            <RegisterForm
              apiBaseUrl={API_BASE_URL}
              onRegisterSuccess={(user) => {
                setRegisteredEmail(user.email);
                setAuthUser(null);
                setActiveView('login');
              }}
            />
          ) : (
            <LoginForm
              apiBaseUrl={API_BASE_URL}
              registeredEmail={registeredEmail}
              onLoginSuccess={setAuthUser}
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
