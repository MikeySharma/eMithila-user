import {useEffect, useState} from 'react'
import Meta from '../components/Meta';
import ArrowIcon from '../assets/down-arrow-5-svgrepo-com.svg';
import { Link, useNavigate} from 'react-router-dom';
import Container from '../components/Container';
import {useDispatch, useSelector} from 'react-redux';
import {getUserCart, createOrder, emptyCart} from '../features/auth/authSlice';
import * as yup from 'yup';
import {useFormik} from 'formik';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState();
  const [orderData, setOrderData] = useState(null);

  useEffect(()=>{
    dispatch(getUserCart());
  },[])

  const cartState = useSelector((state)=> state.auth.cart);

  useEffect(()=>{
    if(cartState !== undefined && cartState.length !==0){
      let sum = 0;
      cartState.forEach((elem)=>{
        sum = sum + Number(elem?.quantity * elem?.price);
        setTotalAmount(sum);
      })
       const data = cartState?.map((elem)=>{
       return{
      product: elem?._id,
      color: elem?.color,
      count: elem?.quantity,
      title: elem?.productId[0]?.title,
      brand: elem?.productId[0]?.brand,
        }
      })
       setOrderData(data);
    }
  },[cartState])

 

  const handleOrder = (e)=>{
    if(e !== undefined){
        const uploadData = {
      shippingInfo : e ,
      orderItems : orderData,
      paymentInfo: 'Cash On Delivery',
      totalprice: totalAmount,
      totalpriceAfterDiscount: totalAmount,
    } 
    dispatch(createOrder(uploadData));
    setTimeout(()=>{
    navigate('/');
    dispatch(emptyCart());

  }, 200)

    }
  
}

  const orderSchema = yup.object({
    country: yup.string().required('country must required'),
    firstname: yup.string().required('FirstName must required'),
    lastname: yup.string().required('Last Name must required'),
    address: yup.string().required('Address Must required'),
    other: yup.string().required('This field is required'),
    city: yup.string().required('City must required'),
    province: yup.string().required('Province must required'),
    pin: yup.number().required('ZipCode must required'),
  })


  const formik = useFormik({
    initialValues: {
      country: '',
      firstname: '',
      lastname: '',
      address: '',
      other: '',
      city: '',
      province: '',
      pin: '',
    },
    validationSchema: orderSchema,
    onSubmit: value =>{
      handleOrder(value);
      formik.resetForm()
    }
  })


  return (
    <>
      <Meta title="Checkout" />
      <Container class1="checkout-wrapper set-bg py-5">
        <div className=" grid grid-cols-12">
          <div className="col-span-6 px-20 border-r-2 border-gray-200">
            <h3 className="website-name text-2xl font-medium ">eMithila</h3>
         {/*   <nav className="flex my-5" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/cart" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-600 dark:hover:text-gray-600 ">
                    Cart
                  </Link>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Information</span>
                  </div>
                </li>
                
                <li>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-gray-600">Shipping</a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <Link to="/checkout" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-gray-600">Payment</Link>
                  </div>
                </li>
              
              </ol>
            </nav>*/}
            <h4 className="text-md font-medium py-2">Contact Information</h4>
            <p className='text-sm font-normal pb-1'>Navdeep Dahiya(example@gmail.com)</p>
            <p className='text-sm font-normal mb-6'>Log out</p>
            <h4 className='text-md font-medium py-2'>Shipping Address</h4>
            <form action="" className='checkout-form flex flex-wrap gap-3'onSubmit={formik.handleSubmit}>
              <div className="w-full">

                <select className="rounded-md p-1 py-2 w-full" name='country' onChange={formik.handleChange('country')} onBlur={formik.handleBlur('country')} value={formik.values.country}>
                  <option value="" hidden >Select Your Country</option>
                  <option value="nepal">Nepal</option>

                </select>
                <div className="error mt-2">
                  {formik.touched.country && formik.errors.country}
                </div>
              </div>


              <div className="grow">
                <input type="text" placeholder="First Name" className="w-full p-1 py-2 rounded-md" name="firstname" onChange={formik.handleChange('firstname')} onBlur={formik.handleBlur('firstname')} value={formik.values.firstname} />
                <div className="error mt-2">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                 </div>

              <div className="grow">
                <input type="text" placeholder="Last Name" className="w-full p-1 py-2 rounded-md" name="lastname" onChange={formik.handleChange('lastname')} onBlur={formik.handleBlur('lastname')} value={formik.values.lastname} />
                <div className="error mt-2">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
              </div>
              <div className="w-full">
                <input type="text" placeholder="Address" className="w-full p-1 py-2 rounded-md" name="address" onChange={formik.handleChange('address')} onBlur={formik.handleBlur('address')} value={formik.values.address} />
                <div className="error mt-2">
                  {formik.touched.address && formik.errors.address}
                </div>
              </div>
              <div className="w-full">
                <input type="text" placeholder="Street/Chowk/Apartment" className="w-full p-1 py-2 rounded-md" name="other" onChange={formik.handleChange('other')} onBlur={formik.handleBlur('other')} value={formik.values.other}/>
                <div className="error mt-2">
                  {formik.touched.other && formik.errors.other}
                </div>
              </div>
              <div className="w-1/4">
                <input type="text" placeholder="City" className="w-full p-1 py-2 rounded-md" name="city" onChange={formik.handleChange('city')} onBlur={formik.handleBlur('city')} value={formik.values.city}/>
                <div className="error mt-2">
                  {formik.touched.city && formik.errors.city}
                </div>
              </div>
              <div className="grow">
                <select className="rounded-md p-1 py-2 w-full " name="province" onChange={formik.handleChange('province')} onBlur={formik.handleBlur('province')} value={formik.values.province}>
                  <option value="" hidden>Select Province</option>
                  <option value="1">Province 1</option>
                  <option value="2">Province 2</option>
                  <option value="3">Province 3</option>
                  <option value="4">Province 4</option>
                  <option value="5">Province 5</option>
                  <option value="6">Province 6</option>
                  <option value="7">Province 7</option>


                </select>
                <div className="error mt-2">
                  {formik.touched.province && formik.errors.province}
                </div>
              </div>
              <div className="w-1/4">
                <input type="text" placeholder="ZipCode" className="w-full p-1 py-2 rounded-md" name="pin" onChange={formik.handleChange('pin')} onBlur={formik.handleBlur('pin')} value={formik.values.pin} />
                  <div className="error mt-2">
                  {formik.touched.pin && formik.errors.pin}
                </div>
              </div>
              <div className="w-full flex items-center border-b-2 border-gray-300 pb-12 justify-between mt-12">
                <Link to="/cart" className="prev-btn flex text-gray-700 items-center justify-start gap-3 "><span className='flex items-center justify-center'><img src={ArrowIcon} alt=" back arrow" /></span>Return to cart</Link>
                <button type="submit" className="bg-red-600 w-fit text-center text-sm text-white font-medium py-2 px-3 rounded-sm hover:bg-red-700 dark:hover:bg-red-800">Cash On Delivery</button>

              </div>
              <p className="text-sm font-normal">
                All rights reserved eMithila
              </p>


            </form>
          </div>
          <div className="col-start-8 col-span-4">
            <div className="product-container flex flex-col gap-2 py-5 border-b-2 border-gray-200">
            {cartState && cartState?.map((elem)=>{
              return (
               <div key={elem._id} className="product flex items-center justify-between gap-4 ">
                <div className="product-img border-2 border-gray-200 w-fit p-1 bg-white relative">
                  <span className="rounded-full absolute bg-gray-600 text-white px-2 text-sm font-normal">{elem?.quantity}</span>
                  <img className="h-20 w-24" src={elem?.productId[0]?.images[0]?.url} alt="product image" />
                </div>
                <div className="product-info grow flex flex-col  gap-4 mt-0">
                  <h4 className='text-sm font-medium text-gray-700'>{elem?.productId[0]?.title && elem?.productId[0]?.title?.length >= 40 ? elem?.productId[0]?.title?.substring(0, 40) + '...' : elem?.productId[0]?.title }</h4>
                  <p className="text-sm font-normal">{elem?.color}</p>
                </div>
                <h5 className="price text-sm font-normal text-gray-700">${elem.price * elem?.quantity}</h5>
              </div>
              )
            })}
             
            </div>
            <div className="sub-total py-5 border-b-2 border-gray-200 flex items-center justify-between ">
              <div className='flex flex-col  gap-2'>
                <h6>Subtotal</h6>
                <h6>Delivery Charge</h6>
              </div>
              <div className='flex flex-col  gap-2 items-end'>
                <h5 className="price text-sm font-normal text-gray-700">$ {totalAmount && totalAmount}</h5>
                <h5 className="price text-sm font-normal text-gray-700">$ 5.00</h5>

              </div>
            </div>
              <div className="total py-5  flex items-center justify-between ">
                <h6>Total</h6>
                <h6><small>USD </small><span className='ml-2 text-md font-medium text-gray-700'>$ {totalAmount && totalAmount + 5}</span></h6>
              </div>
          </div>
        </div>

      </Container>

    </>
  )
}

export default Checkout
