// src/components/navbar/Navbar.js
import React, { useState, useContext } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.jpg';
import { ShopContext } from '../../context/ShopContext';
import { LoginContext } from '../../context/LoginContext';
import { useAuth0 } from '@auth0/auth0-react';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [menu, setMenu] = useState("Shop");
  const { cartItems } = useContext(ShopContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { logout, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  const githubUser = JSON.parse(localStorage.getItem("githubUser"));

  const getCartCount = () => {
    let count = 0;
    for (let key in cartItems) {
      count += cartItems[key];
    }
    return count;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('githubUser');
  };

  const handleAuth0Logout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    sessionStorage.removeItem('loginShown');
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>

      {/* ✅ Fixed the duplicate <ul> */}
    <ul className="nav-menu">
  {["Shop", "Men", "Women", "Kids", "Analytics", "Style Me", "About"].map((item) => (
    <li key={item} onClick={() => setMenu(item)}>
      <Link to={
        item === "Shop" ? "/" :
        item === "Analytics" ? "/products/analytics" :
        item === "Style Me" ? "/styleme" :
        item === "About" ? "/about" :
        `/${item.toLowerCase()}`
      }>
        {item === "About" ? "About Us" : item}
      </Link>
      {menu === item ? <hr /> : null}
    </li>
  ))}

  <li onClick={() => setMenu("Help")}>
    <Link to="/help">Help & Support</Link>
    {menu === "Help" ? <hr /> : null}
  </li>
</ul>


      <div className="nav-login-cart">
        {/* ✅ GitHub Profile Display */}
        {isLoggedIn && githubUser && (
          <div className="profile-info">
            <span style={{ fontWeight: 'bold', marginRight: '10px' }}>
              Hi, {githubUser.name}
            </span>
            <img
              src={githubUser.avatar_url}
              alt="Profile"
              className="profile-icon"
            />
          </div>
        )}

        {/* ✅ Auth0 Profile Display */}
        {isAuthenticated && user && (
          <div className="profile-info">
            <span style={{ fontWeight: 'bold', marginRight: '10px' }}>
              Hi, {user.name.split(" ")[0]}
            </span>
            <img
              src={user.picture}
              alt="Profile"
              className="profile-icon"
            />
          </div>
        )}

        {/* ✅ Logout with SweetAlert */}
        {isAuthenticated ? (
          <button onClick={() => {
            Swal.fire({
              title: 'Are you sure?',
              text: "You are about to log out.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, logout'
            }).then((result) => {
              if (result.isConfirmed) {
                handleAuth0Logout();
              }
            });
          }}>Logout</button>
        ) : isLoggedIn ? (
          <button onClick={() => {
            Swal.fire({
              title: 'Are you sure?',
              text: "You are about to log out.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, logout'
            }).then((result) => {
              if (result.isConfirmed) {
                handleLogout();
              }
            });
          }}>Logout</button>
        ) : (
          // ✅ Simple Login without swal
          <button onClick={() => navigate('/login')}>Login</button>
        )}

        {/* ✅ Cart Section */}
        <Link to='/Cart'>
          <img src={cart_icon} alt="cart" />
        </Link>
        <div className="nav-cart-count">{getCartCount()}</div>
      </div>
    </div>
  );
};

export default Navbar;
