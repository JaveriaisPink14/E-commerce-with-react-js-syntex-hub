import './App.css';
import Navbar from './components/navbar/Navbar';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import LoginSignup from './pages/LoginSignup';
import Login from './pages/Login';
import Footer from './components/Footer/Footer';
import men_banner from './components/Assets/men_banner.jpg';
import women_banner from './components/Assets/women_banner.jpg';
import kids_banner from './components/Assets/kids_banner.jpg';
import RelatedProducts from './components/Relatedproduct/Relatedproduct';
import CartItem from './components/CartItem/CartItem';
import ProductAnalytics from './pages/ProductAnalytics';
import TestChart from './components/charts/TestChart';
import Payment from './pages/Payment';
import Confirmation  from './pages/Confirmation ';
import GithubLogin from './components/GithubLogin'; // ✅ Adjust path if needed
import StyleMe from './components/StyleMe/StyleMe'; 
import HelpCenter from './components/HelpCenter/HelpCenter'; 
import AboutUs from './pages/AboutUs';
import ContactPage from './components/HelpCenter/ContactPage';
import VirtualAssistant from './components/HelpCenter/VirtualAssistant';
import FAQDetailPage from './components/FAQDetailPage';

import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/Men' element={<ShopCategory banner={men_banner} category="Men" />} />
        <Route path='/Women' element={<ShopCategory banner={women_banner} category="Women" />} />
        <Route path='/Kids' element={<ShopCategory banner={kids_banner} category="Kids" />} />
        <Route path='/product/:ProductId' element={<Product />} />
        <Route path="/related-products" element={<RelatedProducts />} />
        <Route path='/cart' element={<CartItem />} />
        <Route path='/Login' element={<LoginSignup />} />
        <Route path="/products/analytics" element={<ProductAnalytics />} />
        <Route path="/testchart" element={<TestChart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/github-callback" element={<GithubLogin />} />
     <Route path="/virtual-assistant" element={<VirtualAssistant />} />
          
<Route path="/confirmation" element={<Confirmation />} />
         <Route path="/styleme" element={<StyleMe />} />   
         <Route path="/help" element={<HelpCenter />} />
 <Route path="/about" element={<AboutUs />} />
  <Route path="/contact" element={<ContactPage />} />
     <Route path="/faq/returns-policy" element={<FAQDetailPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;