import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const location = useLocation();
  const pathname = location.pathname;
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[pathname])
  return (
    <>
    <Header/>
    <ToastContainer
      position="top-right"
      autoClose={500}
      hideProgressBar={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    <Outlet/>
    <Footer/>
     
    </>
  )
}

export default Layout
