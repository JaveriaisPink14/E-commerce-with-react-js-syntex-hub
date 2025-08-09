import React, { useContext } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import GithubLogin from '../components/GithubLogin';
import GoogleLogin from '../components/GoogleLogin';
import { useAuth0 } from '@auth0/auth0-react';

const LoginSignup = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(LoginContext);
  const { isAuthenticated } = useAuth0();

  const handleContinue = () => {
    setIsLoggedIn(true);
    localStorage.setItem("loginSuccess", "true");

    navigate('/');
  };

  if (isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>You are already logged in.</p>
      </div>
    );
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name' />
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' />
        </div>

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        <button onClick={handleContinue}>Continue</button>

        <p className="loginsignup-login">
          Already have an account? <span>Login here</span>
        </p>

        <div className="or-divider">
          <hr /><span>OR</span><hr />
        </div>

        <GoogleLogin />
        <GithubLogin />
      </div>
    </div>
  );
};

export default LoginSignup;