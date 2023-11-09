import React from 'react';
import {Link} from 'react-router-dom';
import facebookLogo from '../assets/facebook-svgrepo-com.svg';
import pinterestLogo from '../assets/pinterest-180-svgrepo-com.svg';  
import youtubeLogo from '../assets/youtube-svgrepo-com.svg';  
import instagramLogo from '../assets/instagram-167-svgrepo-com.svg';  
import mailerLogo from '../assets/comment-email-mail-message-post-send-svgrepo-com.svg';  

const Footer = () => {
  return (
    <>
      <footer className="container mx-auto p-3">
        <div className="footer-email container">
          <div className="flex items-center justify-around p-4">
            <div className=" flex gap-5 items-center text-white text-md capitalize"><img src={mailerLogo} className='h-9' alt="mailer Logo" /> Sign up for newsletter</div>
            <div className="bg-white rounded-md py-1 px-2">
              <input style={{ width: "30rem" }} className='text-md focus: outline-none' type="text" placeholder="Your Email" />
              <button id="footerInputBtn" className='text-md p-1 text-white rounded'>Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
      <footer className="container mx-auto p-3">
          <div className="about-container grid grid-cols-12 gap-4">
            <div className=" col-span-4">
              <h4 className="text-white text-xl mb-4">Contact Us</h4>
              <div className="footer-links flex flex-col">
                <p className='text-white text-md non-italic'>
                  Janakpurdham, Mithila <br/> Madhesh Pradesh <br/>Nepal
                </p>
                <a href="mobile: +977 9825850687" className="mt-4 text-white text-sm">+977 9825850687</a>
                <a href="emailTo: mikeysharma99@gmail.com" className="mt-4 mb-4 text-white text-sm">mikeysharma99@gmail.com</a>
                <div className="social_icons flex items-center gap-4">
                  <a href="facebook.com" className="bg-gray-600 p-1   rounded-full"><img src={facebookLogo} className='h-8 p-1' alt="facebook Logo" /></a>
                  <a href="pinterest.com" className="bg-gray-600  p-1 rounded-full"><img src={pinterestLogo} className='h-8 p-1' alt="pinterest Logo" /></a>
                  <a href="instagram.com" className="bg-gray-600 p-1  rounded-full"><img src={instagramLogo} className='h-8 p-1' alt="instagram Logo" /></a>
                  <a href="youtube.com" className="bg-gray-600 p-1  rounded-full"><img src={youtubeLogo} className='h-8 p-1' alt="youtube Logo" /></a>
                </div>
            </div>
            <div className=" col-span-3">
              <h4 className="text-white text-xl mb-4">Information</h4>
              <div className="footer-links flex flex-col">
                <Link to="privacy-policy" className='text-white mb-1 text-md  py-2'>Privacy Policy</Link>
                <Link to="refund-policy" className='text-white mb-1 text-md py-2 '>Refund Policy</Link>
                <Link to="shipping-policy" className='text-white mb-1 text-md  py-2'>Shipping Policy</Link>
                <Link to="terms-and-conditions" className='text-white mb-1 text-md py-2 '>Terms Of Use</Link>
              </div>
            </div>
            <div className="col-span-3">
              <h4 className="text-white text-xl mb-4">Account</h4>
              <div className="footer-links flex flex-col">
                <Link className='text-white mb-1 text-md  py-2'>Search</Link>
                <Link className='text-white mb-1 text-md py-2 '>About Us</Link>
                <Link className='text-white mb-1 text-md  py-2'>Faq</Link>
                <Link className='text-white mb-1 text-md py-2 '>Contact</Link>
                <Link className='text-white mb-1 text-md  py-2'>Size Chart</Link>
              </div>
            </div>
            <div className="col-span-2">
              <h4 className="text-white text-xl mb-4">QuickLinks</h4>
              <div className="footer-links flex flex-col">
                <Link className='text-white mb-1 text-md  py-2'>Bed</Link>
                <Link className='text-white mb-1 text-md py-2 '>Chairs</Link>
                <Link className='text-white mb-1 text-md  py-2'>Tables</Link>
                <Link className='text-white mb-1 text-md py-2 '>Door</Link>
                <Link className='text-white mb-1 text-md  py-2'>Kitchen Furniture</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className=" container mx-auto p-3">
          <div className="flex justify-center items-center mb-0 text-white">
            <p>&copy; {new Date().getFullYear()}: Powered By Mithila Youths</p>
          </div>
      </footer>
    </>
  )
}

export default Footer
