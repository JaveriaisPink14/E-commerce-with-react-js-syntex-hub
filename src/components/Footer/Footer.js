import footer_logo from '../Assets/logo.png'
import instagram_icon from '../Assets/instagram_icon.jpg'
import pinterester_icon from '../Assets/pinterester_icon.jpg'
import whatsapp_icon from '../Assets/whatsapp_icon.jpg'
import './Footer.css';
import { useEffect } from 'react';


const Footer = () => {
  
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
  <div className="footer-icons-container">
    <img src={instagram_icon} alt="" />
  </div>
  <div className="footer-icons-container">
    <img src={pinterester_icon} alt="" />
  </div>
  <div className="footer-icons-container">
    <img src={whatsapp_icon} alt="" />
  </div>
</div>
<div className="footer-copyright">
  <hr />
  <p>Copyright @ 2025 - All Right Reserved </p>
</div>
    </div>
  )
}

export default Footer