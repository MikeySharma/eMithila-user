import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import * as yup from 'yup';
import { useFormik } from 'formik';
import {useNavigate} from 'react-router-dom';
import {registerUser} from '../features/auth/authSlice';
import {useDispatch} from 'react-redux';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let authSchema = yup.object({
    firstname: yup.string().required('First name must Required'),
    lastname : yup.string().required('Last name must required'),
    email : yup.string().email('Email must be valid').required('Email must required'),
    mobile: yup.number().required('Number must required'),
    password: yup.string().required('Password must be requred'),
  })

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      password: '',
    },
    validationSchema: authSchema,
    onSubmit: (value) =>{
      dispatch(registerUser(value));
      navigate(-1);
      formik.resetForm();
    }
  })

  return (
    <>
      <Meta title="Signup" />
      <BreadCrumb title="Signup" />
      <Container class1="signup-wrapper py-16 set-bg">
        <div className=" flex items-center justify-center">
          <div className="signup-box rounded-md bg-white p-2 w-fit box-shadow-dim">
            <h3 className="text-xl font-medium text-center my-3">Create Account</h3>
            <form className="form-box flex justify-center gap-4 flex-col" action="" onSubmit={formik.handleSubmit}>
              <input className=" text-md font-normal rounded-md p-2 w-96" type="text" name="firstname" placeholder='First Name' onChange={formik.handleChange('firstname')} onBlur={formik.handleBlur('firstname')} value={formik.values.firstname}  />
              <div className="error">
              {formik.touched.firstname && formik.errors.firstname}
              </div>
              <input className=" text-md font-normal rounded-md p-2 w-96" type="text" name="lastname" placeholder='Last Name' onChange={formik.handleChange('lastname')} onBlur={formik.handleBlur('lastname')} value={formik.values.lastname} />
               <div className="error">
              {formik.touched.lastname && formik.errors.lastname}
              </div>
              <input className=" text-md font-normal rounded-md p-2 w-96" type="email" name="email" placeholder='Email' onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')} value={formik.values.email} />
               <div className="error">
              {formik.touched.email && formik.errors.email}
              </div>
              <input className=" text-md font-normal rounded-md p-2 w-96" type="number" name="mobile" placeholder='Mobile Number' onChange={formik.handleChange('mobile')} onBlur={formik.handleBlur('mobile')} value={formik.values.mobile} />
               <div className="error">
              {formik.touched.mobile && formik.errors.mobile}
              </div>
              <input className=" text-md font-normal rounded-md p-2 w-96" type="password" name="password" placeholder='Password' onChange={formik.handleChange('password')} onBlur={formik.handleBlur('password')} value={formik.values.password} />
               <div className="error">
              {formik.touched.password && formik.errors.password}
              </div>
              <div className="form-buttons flex items-center justify-center gap-8 mb-4">
                <button type="submit" className="bg-slate-800 w-fit text-center text-white font-bold py-2 px-3 rounded-full hover:bg-orange-400 dark:hover:bg-orange-500">Create</button>

              </div>
            </form>

          </div>
        </div>

      </Container>
    </>
  )
}

export default Signup
