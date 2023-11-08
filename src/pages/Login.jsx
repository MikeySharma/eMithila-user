import {useEffect} from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {resetState, loginUser} from '../features/auth/authSlice';
import * as yup from 'yup';
import {useFormik} from 'formik';


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state)=> state.auth);
  const {user, isSuccess, isError, loggedUser} = authState;
  useEffect(()=>{
    if(user && isSuccess){
    toast.success('User registered Successfully');
    dispatch(resetState());
    }else if(isError){
      toast.error('Something went wrong');
    }
  },[user])

  useEffect(()=>{
    if(loggedUser && isSuccess){
      toast.success('Logged In');
      navigate('../')
    }else if(isError){
      toast.error('Something went wrong');
    }
  },[loggedUser])

  const loginSchema = yup.object({
    email: yup.string().email('Invalid Email').required('Email Required'),
    password: yup.string().required('Password Required'),
  })
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (value)=>{
      dispatch(loginUser(value));
      formik.resetForm();
    }
  })
  return (
    <>
      <Meta title="Login" />
      <BreadCrumb title="Login" />
      <Container class1="login-wrapper py-28 set-bg">
        <div className=" flex items-center justify-center">
          <div className="login-box rounded-md bg-white p-2 w-fit box-shadow-dim">
            <h3 className="text-xl font-medium text-center my-3">Login</h3>
            <form className="form-box flex justify-center gap-4 flex-col" action="" onSubmit={formik.handleSubmit}>
              <input className=" text-md font-normal rounded-md p-2 w-96" type="email" name="email" placeholder='Email' onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')} value={formik.values.email} />
              <div className="error">
              {formik.touched.email && formik.errors.email}
              </div>
              <input className=" text-md font-normal rounded-md p-2 w-96" type="password" name="password" placeholder='Password' onChange={formik.handleChange('password')} onBlur={formik.handleBlur('password')} value={formik.values.password}/>
                <div className="error">
              {formik.touched.password && formik.errors.password}
              </div>
              <Link to="/forgot-password"><p className="text-md font-medium px-2">Forgot Your Password?</p></Link>
              <div className="form-buttons flex items-center justify-center gap-8 mb-4">
                <button type="submit" className="bg-slate-800 w-fit text-center mt-4 text-white font-bold py-2 px-3 rounded-full hover:bg-orange-400 dark:hover:bg-orange-500">Log In</button>
                <Link to="/signup" className="bg-orange-400 w-fit text-center mt-4 text-white font-bold py-2 px-3 rounded-full hover:bg-slate-700 dark:hover:bg-slate-800">Sign Up</Link>

              </div>
            </form>

          </div>
        </div>

      </Container>
    </>
  )
}

export default Login
