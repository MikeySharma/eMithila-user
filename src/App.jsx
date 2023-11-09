import React from 'react';
import "./App.css";
import "./mobile.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Home from "./pages/Home";
import OurStore from './pages/OurStore';
import Blog from './pages/Blog';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndCondition from './pages/TermsAndCondition';
import ShippingPolicy from './pages/ShippingPolicy';
import RefundPolicy from './pages/RefundPolicy';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import {PrivateRoutes} from './components/privateRoutes';

const App = () => {
  return (
    <>
    <Router>
    <Routes>
      <Route path ="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="about" element={<About/>} />
        <Route path="contact" element={<Contact/> } />
        <Route path="product" element={<OurStore/>}/>
        <Route path="product/search/q=:id" element={<OurStore/>}/>
        <Route path="product/:id" element={<SingleProduct/>}/>
        <Route path="blog" element={<Blog/>} />
        <Route path="blog/:id" element={<SingleBlog/>}/>
        <Route path="compare-product" element={<CompareProduct/>}/>
        <Route path="wishlist" element={<PrivateRoutes><Wishlist/></PrivateRoutes>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="forgot-password" element={<ForgotPassword/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="reset-password" element={<ResetPassword/>}/>
        <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="terms-and-conditions" element={<TermsAndCondition/>}/>
        <Route path="shipping-policy" element={<ShippingPolicy/>}/>
        <Route path="refund-policy" element={<RefundPolicy/>}/>
        <Route path="cart" element={<PrivateRoutes><Cart/></PrivateRoutes>}/>
      </Route>
      <Route path="/checkout" element={<Checkout/>}/>

    </Routes>
    </Router>
    </>
  )
}

export default App
