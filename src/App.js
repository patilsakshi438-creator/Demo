import { useMemo, useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const welcomeMessage = useMemo(() => {
    if (!authUser) {
      return 'Register a new user and then log in with the same credentials to verify your frontend and backend integration.';
    }

    return `Welcome back, ${authUser.name}. Your account is connected to MongoDB.`;
  }, [authUser]);

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
        <div className="form-grid">
          <RegisterForm
            apiBaseUrl={API_BASE_URL}
            onRegisterSuccess={(user) => {
              setAuthUser(user);
              setRegisteredEmail(user.email);
            }}
          />
          <LoginForm
            apiBaseUrl={API_BASE_URL}
            registeredEmail={registeredEmail}
            onLoginSuccess={setAuthUser}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
