import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import {Link} from 'react-router-dom';
import Container from '../components/Container';
import * as yup from 'yup';
import {useFormik} from 'formik';

const ForgotPassword = () => {
  const schema = yup.object({
    email: yup.string().email('Invalid Email').required('Email must required')
  })
  const formik = useFormik({
    initialValues:{
      email: '',
    },
    validationSchema: schema,
    onSubmit: value =>{
      alert(JSON.stringify(value));
    }
  })
  return (
    <>
      <Meta title="Forgot Password"/>
      <BreadCrumb title="Forgot Password"/>
      <Container class1="forgot-password-wrapper set-bg py-28">
        <div className=" flex items-center justify-center">
          <div className="forgot-password-container rounded-md p-4 bg-white box-shadow-dim">
          <h3 className="text-xl font-medium text-center my-2">Reset Your Password</h3>
          <h5 className="text-sm font-medium text-center mb-3">We will send you an email to reset your password</h5>
            <form className="form-box flex justify-center gap-4 flex-col mt-8" action="" onSubmit={formik.handleSubmit}>
            <input className=" text-md font-normal rounded-md p-2" type="email" name="email" placeholder='Email' onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')} value={formik.values.email} />
            <div className="error my-2">{ formik.touched.email && formik.errors.email}</div>
            <div className=" flex items-center justify-center flex-col gap-3 mb-4">
                <button type="submit" className="bg-slate-800 w-28 text-center mt-2 text-white font-bold py-2 px-3 rounded-full hover:bg-orange-400 dark:hover:bg-orange-500">Submit</button>
                <Link to="/login" className=" w-28 text-center  font-bold py-2 px-3">Cancel</Link>
               
              </div>


          </form>
          </div>
        </div>


      </Container>
    </>
  )
}

export default ForgotPassword
