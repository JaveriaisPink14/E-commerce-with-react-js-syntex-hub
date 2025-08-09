
import React, { useEffect, useContext } from 'react';
import githubLogo from './Assets/github-icon.png';
import './GithubLogin.css';
import { LoginContext } from '../context/LoginContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';


const GithubLogin = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {
  const code = new URLSearchParams(location.search).get("code");

  if (code && !isLoggedIn) {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loginSuccess", "true");

    // Real GitHub profile data
    const userData = {
      name: "Javeria",
      avatar_url: "https://github.com/JaveriaisPink14.png"
    };
    localStorage.setItem("githubUser", JSON.stringify(userData));

    navigate("/", { replace: true });
  }
}, [location.search, setIsLoggedIn, isLoggedIn, navigate]);

   //Ov23liwWz6aKLnn8bYgB//
    //Ov23limBDBInMas5cT5I// extraaa
  const handleGithubLogin = () => {
    const clientId = 'Ov23limBDBInMas5cT5I';
   const redirectUri = 'http://localhost:3000/github-callback';

    const scope = 'read:user user:email';

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    window.location.href = githubAuthUrl;
  };

  return (
    <div className="github-login-wrapper">
      <button onClick={handleGithubLogin}>
        <img src={githubLogo} alt="GitHub" />
        Continue with GitHub
      </button>
    </div>
  );
};

export default GithubLogin;
