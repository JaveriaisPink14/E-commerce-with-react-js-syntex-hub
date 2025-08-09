import React, { useContext } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import googleLogo from './Assets/google-icon.png';
import './GithubLogin.css'; // Reusing styles
import { LoginContext } from '../context/LoginContext'; // ✅ Added

const GoogleLoginButton = () => {
  const { setIsLoggedIn } = useContext(LoginContext); // ✅ Added

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Sign In Success", tokenResponse);
      setIsLoggedIn(true); // ✅ Set context state
      localStorage.setItem("isLoggedIn", "true"); // ✅ Persist on reload
      // You can now send tokenResponse.access_token to your backend
    },
    onError: () => {
      console.log("Google Sign In Error");
    },
    flow: 'implicit', // or 'auth-code' if you're using backend
  });

  return (
    <div className="github-login-wrapper">
      <button onClick={() => login()}>
        <img src={googleLogo} alt="Google" />
        Continue with Google
      </button>
    </div>
  );
};

const GoogleLogin = () => {
  return (
    <GoogleOAuthProvider clientId='386987413311-fnhg61e7l8lg0g463aobeujpmmbbol1j.apps.googleusercontent.com'>
      <GoogleLoginButton />
    </GoogleOAuthProvider>
  );
};

export default GoogleLogin;
