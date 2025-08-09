import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import ShopContextProvider from './context/ShopContext';
import LoginProvider from './context/LoginContext';
import CartContextProvider from './context/CartContext'; // ✅ fixed import

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-gvjhp320lrmf5tvz.us.auth0.com"
    clientId="2Xq4juEv8E4bEnIY2VNr0EH7WfXN4YVb"
    authorizationParams={{ redirect_uri: window.location.origin ,

    }}
  >
    <LoginProvider>
      <ShopContextProvider>
        <CartContextProvider> {/* ✅ fixed here */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartContextProvider>
      </ShopContextProvider>
    </LoginProvider>
  </Auth0Provider>
);
