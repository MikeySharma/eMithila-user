import {useEffect, useState} from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import DeleteIcon from '../assets/delete.svg';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import {useDispatch, useSelector}  from 'react-redux';
import {getUserCart, removeFromCart} from '../features/auth/authSlice';
import Color from '../components/Color';

const Cart = () => {
    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(null);
    useEffect(()=>{
        dispatch(getUserCart());
    },[])

    const cartState = useSelector((state)=> state.auth.cart);

    const removeProdFromCart = (e)=>{
        dispatch(removeFromCart({cartProductId : e}));
        setTimeout(()=>{
        dispatch(getUserCart());

    }, 200)

    }
    
    useEffect(()=>{
        if(cartState !==undefined){
            let sum = 0;
            cartState.forEach((elem)=>{
                sum = sum + Number(elem?.quantity * elem?.price);
                setTotalAmount(sum);
            })
        }
    },[cartState])

    return (
        <>
            <Meta title="Cart" />
            <BreadCrumb title="Cart" />
            <Container class1="cart-wrapper py-5 set-bg">
                <div className="cart-header grid grid-cols-12 border-b-2 border-gray-200 py-2">
                    <h4 className="col-span-6">Product</h4>
                    <h4 className="col-span-2">Price</h4>
                    <h4 className="col-span-2">Quantity</h4>
                    <h4 className="col-span-2">Total</h4>
                </div>{
                    cartState && cartState?.map((elem)=>{
               return <div key={elem._id} className="cart-body grid grid-cols-12 border-b-2 border-gray-200 py-2">
                    <div className="col-span-6 cart-product flex items-center gap-4 p-2">
                        <div className="flex items-center justify-center">
                            <img className="h-24  w-24" src={elem?.productId[0]?.images[0]?.url} alt="product image" />
                        </div>
                        <div className="cart-product-desc">
                            <h5 className="text-sm font-normal">{elem?.productId[0]?.title !== undefined && elem?.productId[0]?.title.length >=30 ? elem?.productId[0]?.title.substring(0, 30) + '...' : elem?.productId[0]?.title}</h5>
                            <h5 className="text-sm font-normal">Category : {elem?.productId[0]?.category && elem?.productId[0]?.category} </h5>
                            <h5 className="text-sm font-normal mt-2">Color:  <span className=" ml-2 px-2 rounded-full border-2 border-gray-400" style={{backgroundColor : elem.color && elem.color}}></span></h5>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <div className="product-price text-sm font-medium">
                            $ {elem?.price && elem?.price}
                        </div>
                    </div>

                    <div className="col-span-2 flex items-center">
                        <div className="product-quan text-sm font-normal flex items-center gap-3">
                            <div className="bg-white rounded-sm border-2 border-gray-200 flex items-center gap-1 w-16 justify-between">

                                <div className="product-quantity w-full flex items-center">
                                    {elem?.quantity && elem?.quantity}
                                </div>
                            </div>
                            <button onClick={()=> removeProdFromCart(elem?._id && elem?._id)} className="del-icon rounded-full bg-gray-200"><img className="h-6 p-1 w-6 cursor-pointer" src={DeleteIcon} alt="delete Icon" /></button>

                        </div>
                    </div>

                    <div className="col-span-2 flex items-center ">
                        <p className="total">$ {elem?.price * elem?.quantity}</p>
                    </div>
                </div>
            })}
                <div className="grid grid-cols-12 py-2">
                    <div className=" col-span-12 flex items-center justify-between">
                        <Link to="/product" className="bg-slate-800 w-fit text-center mt-2 text-white font-medium py-2 px-3 rounded-full hover:bg-orange-400 dark:hover:bg-orange-500">Continue Shopping</Link>
                       {(totalAmount !==0 && totalAmount !== null) ?
                    <div className="total flex  flex-col">
                            <h4 className='text-md font-medium'>SubTotal : $ {totalAmount}</h4>
                            <p className='text-sm font-normal py-1'>Taxes and shipping calculated at checkout</p>
                            <Link to="/checkout" className="bg-slate-800 w-fit text-center mt-2 text-white font-medium py-2 px-3 rounded-full hover:bg-orange-400 dark:hover:bg-orange-500">Check Out</Link>
                        </div> : ''
                    }
                    </div>

                </div>
            </Container>
        </>
    )
}

export default Cart
