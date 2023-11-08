import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import {Link, useNavigate} from 'react-router-dom';
import infoIcon from '../assets/info.svg';
import homeIcon from '../assets/home.svg';
import phoneIcon from '../assets/phone.svg';
import mailIcon from '../assets/mail.svg';
import Container from '../components/Container';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {sendEnq} from '../features/auth/authSlice';


const Contact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const enqSchema = yup.object({
    name: yup.string().required('Name must required'),
    email: yup.string().email('Invalid Email').required('Email must required'),
    mobile: yup.number().min(10,'Invalid Number').required('Number must required'),
    comment: yup.string().required('Comment must required'),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      comment: '',
    },
    validationSchema: enqSchema,
    onSubmit: value =>{
      dispatch(sendEnq(value));
      setTimeout(()=>{
      formik.resetForm();
      navigate(-1);
      },400)

    }
  })


  return (
    <>
     <Meta title="Contact Us"/>
     <BreadCrumb title="Contact Us"/>
     <Container class1="contact-wrapper py-5 set-bg">
     <div className="contact-box">
      <div className=" rounded-md box-shadow-dim bg-white p-4">
        <div className="grid grid-cols-12 gap-6 ">
          <div className="contact col-span-6 ">
            <form action="none" className='flex  justify-start gap-2 flex-col' onSubmit={formik.handleSubmit}>
            <h4 className="text-2xl font-medium contact-title">Contact</h4>
            <input className='contact-input text-md font-medium py-2 px-2 rounded-md' type="text" placeholder='Name' name="name" onChange={formik.handleChange("name")} onBlur={formik.handleBlur('name')} value={formik.values.name} />
            <div className="error">
            {formik.touched.name && formik.errors.name}
            </div>
            <input className='contact-input text-md font-medium py-2 px-2 rounded-md' type="text" placeholder='Email*'name="email" onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')} value={formik.values.email} />
            <div className="error">
            {formik.touched.email && formik.errors.email}
            </div>
             <input className='contact-input text-md font-medium py-2 px-2 rounded-md' type="text" placeholder='Phone Number' name="mobile" onChange={formik.handleChange('mobile')} onBlur={formik.handleBlur('mobile')} value={formik.values.mobile} />
            <div className="error">
            {formik.touched.mobile && formik.errors.mobile}
            </div>
            <textarea className='contact-input text-md font-medium py-2 px-2 pb-16 rounded-md' type="text" placeholder='Comment' name="comment" onChange={formik.handleChange('comment')} onBlur={formik.handleBlur('comment')} value={formik.values.comment} />
            <div className="error">
            {formik.touched.comment && formik.errors.comment}
            </div>
            <button type="submit" className="bg-slate-800 w-fit text-center mt-4 text-white font-bold py-2 px-3 rounded-full hover:bg-orange-400 dark:hover:bg-orange-500">Send</button>
            </form>
          </div>
          <div className="get-in-touch col-span-6 flex justify-start gap-4 flex-col">
          <h4 className="text-2xl font-medium contact-title capitalize">Get in touch with us</h4>
          <Link className='flex gap-2 items-center'> <img className="h-5" src={homeIcon} alt="Home Icon" />Janakpurdham, Nepal</Link>
          <Link className='flex gap-2 items-center' to="+977-9803459918"><img className="h-5" src={phoneIcon} alt="Phone Icon" />+977-9803459918</Link>
          <Link  className='flex gap-2 items-center'to="eMithila@gmail.com"><img className="h-5" src={mailIcon} alt="Mail Icon" />eMithila@gmail.com</Link>
          <Link className='flex gap-2 items-center' to="everyday-6AM to 9PM"><img className="h-5" src={infoIcon} alt="info Icon" />Everyday 6AM to 9PM</Link>
            

          </div>
        </div>

      </div>
     </div>
     </Container>
    </>
  )
}

export default Contact
