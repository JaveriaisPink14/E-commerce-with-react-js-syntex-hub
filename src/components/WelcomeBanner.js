// src/components/WelcomeBanner.js
import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

const WelcomeBanner = () => {
  const { userInfo } = useContext(LoginContext);

  if (!userInfo) return null;

  return (
    <div style={{
      backgroundColor: '#e0ffe0',
      padding: '12px',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '16px'
    }}>
      Welcome, {userInfo.name}
    </div>
  );
};

export default WelcomeBanner;
