import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Hero from '../components/Hero/Hero';
import Popular from '../components/Popular/Popular';
import Offers from '../components/Offers/Offers';
import NewCollections from '../components/NewCollections/NewCollections';
import NewsLetter from '../components/NewsLetter/NewsLetter';
import Swal from 'sweetalert2';


const Shop = () => {
  const { user, isAuthenticated } = useAuth0();
  const [showMessage, setShowMessage] = useState(false);

  // ✅ Alert for normal login via localStorage (like from "Continue" button)
useEffect(() => {
  const justLoggedIn = localStorage.getItem("loginSuccess");
  if (justLoggedIn === "true") {
    Swal.fire({
      icon: 'success',
      title: 'Welcome!',
      text: '✅ You are successfully logged in. Buy anything you want!',
      confirmButtonColor: '#3085d6',
    });
    localStorage.removeItem("loginSuccess");
  }
}, []);



  // ✅ Welcome bar for Auth0 login (GitHub/Google)
  useEffect(() => {
    if (isAuthenticated && !sessionStorage.getItem('loginShown')) {
      setShowMessage(true);
      sessionStorage.setItem('loginShown', 'true');
      setTimeout(() => setShowMessage(false), 3000); // hide after 3 sec
    }
  }, [isAuthenticated]);

  return (
    <div>
      {showMessage && (
        <div style={{
          backgroundColor: '#d2f4d2',
          padding: '10px',
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: '15px'
        }}>
          ✅ Welcome, {user?.name}! You are successfully logged in.
        </div>
      )}
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
};

export default Shop;