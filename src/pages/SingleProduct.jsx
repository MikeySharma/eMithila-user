import { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Magnifier from "react-magnifier";
import Color from '../components/Color';
import ReactStars from "react-rating-stars-component";
import CompareIcon from '../assets/code-compare.svg';
import wishlistIcon from '../assets/black-heart.svg';
import Container from '../components/Container';
import { copyToClipboard } from '../components/Data';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAProduct, addToWishList, rating, getProducts, addToCompare } from '../features/products/productSlice';
import parse from 'html-react-parser';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { addToCart } from '../features/auth/authSlice';

const SingleProduct = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const productId = location.pathname.split('/')[2];
    const [rate, setRate] = useState();
    const [cartColor, setCartColor] = useState();
    const [cartQuantitiy, setCartQuantity] = useState(1);

    useEffect(() => {
        if (productId !== undefined) {
            dispatch(getAProduct(productId));
            dispatch(getProducts());
        }
    }, [productId])


    const getProductState = useSelector((state) => state?.product?.getProduct);
    const { title, brand, category, color, images, price, quantity, totalrating, description, tags, ratings } = getProductState;
    const products = useSelector((state) => state?.product?.products);

    const rateSchema = yup.object({
        rating: yup.number().required('Rate the product'),
        comment: yup.string().required('Comment must required'),

    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            rating: rate,
            comment: '',
        },
        validationSchema: rateSchema,
        onSubmit: value => {
            dispatch(rating({ star: value.rating, comment: value.comment, productId: productId }));
            formik.resetForm();
            dispatch(getAProduct(productId))
        }
    })

    const randomNumber = Math.floor((Math.random() * products?.length));
    const handleCartSubmit = () => {
        if (cartColor === undefined) {
            toast.error('Color must required');
        } else {
            dispatch(addToCart({ productId, color: cartColor, quantity: cartQuantitiy, price: price }))
        }
    }

    return (
        <>
            <Meta title={title ? title : ''} />
            <BreadCrumb title={title ? title : ''} />

            <Container class1="single-product py-5 set-bg">
                <section className="main-product pb-5">
                    <div className=" grid grid-cols-12 gap-4 rounded-md  p-4">
                        <div className="main-product-images bg-white col-span-6">
                            <div className="main-image border-2 overflow-hidden p-1 border-gray-300 rounded-md  ">
                                <div >
                                    {
                                        <Magnifier className="flex items-center justify-center" src={images && images[0]?.url} height={"23.2rem"} width={"full"} />
                                    }
                                </div>

                            </div>
                            <div className="other-images  flex flex-wrap justify-between gap-2 mt-2">
                                <div className=" other-image rounded-md w-fit  cursor-pointer border-2 border-gray-200 p-1"><img src={images && images[1]?.url} alt="watch image" />
                                </div>
                                <div className=" other-image rounded-md w-fit cursor-pointer border-2 border-gray-200 p-1"><img src={images && images[1]?.url} alt="watch image" />
                                </div>
                                <div className=" other-image rounded-md w-fit cursor-pointer border-2 border-gray-200 p-1"><img src={images && images[1]?.url} alt="watch image" />
                                </div>
                                <div className=" other-image rounded-md w-fit cursor-pointer border-2 border-gray-200 p-1"><img src={images && images[1]?.url} alt="watch image" />
                                </div>
                            </div>
                        </div>
                        <div className="product-detail col-span-6">
                            <div className="bg-white border-2 border-gray-200 p-2 rounded-md">
                                <div className="product-content flex flex-col gap-2  p-2">
                                    <div className="product-title  text-xl font-medium">
                                        {title && title}
                                    </div>
                                    <div className=" flex items-center gap-3 py-1">
                                        <div className="price p-2 border-y-2 border-gray-100 w-full flex flex-col">

                                            <div className="product-price text-sm font-medium">${price && price}</div>
                                            <div className="flex gap-4 items-center">
                                                {totalrating !== undefined && <ReactStars
                                                    count={5}
                                                    value={totalrating}
                                                    size={24}
                                                    isHalf={true}
                                                    edit={false}
                                                    activeColor="#ffd700"
                                                />}
                                                <p className="text-sm font-normal mb-0">({ratings?.length} reviews)</p>

                                            </div>

                                            <a className="review-link" href="#review">write a review</a>
                                        </div>
                                    </div>
                                    <div className="border-b-2 border-gray-100 py-2 flex flex-col gap-3">

                                        <div className=" flex items-center gap-2 text-sm font-normal py-1">
                                            <span>Type:</span><span className="product-desc">{category && category}</span>
                                        </div>
                                        <div className=" flex items-center gap-2 text-sm font-normal py-1">
                                            <span>Brand:</span><span className="product-desc">{brand && brand}</span>
                                        </div>
                                        <div className=" flex items-center gap-2 text-sm font-normal py-1">
                                            <span>Category:</span><span className="product-desc">{category && category}</span>
                                        </div>
                                        <div className=" flex items-center gap-2 text-sm font-normal py-1">
                                            <span>Tags:</span><span className="product-desc">{tags && tags}</span>
                                        </div>
                                        <div className=" flex items-center gap-2 text-sm font-normal py-1">
                                            <span>SKU:</span><span className="product-desc">SKU033</span>
                                        </div>
                                        <div className=" flex items-center gap-2 text-sm font-normal py-1">
                                            <span>Availability:</span><span className="product-desc">In Stock</span>
                                        </div>
                                        <div className=" flex  gap-2 text-sm font-normal flex-col py-1">
                                            <span>Color:</span>
                                            <Color color={color} setCartColor={setCartColor} />
                                        </div>
                                        <div className=" flex  gap-2 flex-col text-sm font-normal py-1">
                                            <span>Size:</span>
                                            <div className="flex gap-2 items-center">
                                                <span className="product-desc border-2 border-gray-100 px-1 cursor-pointer  rounded-md ">S</span>
                                                <span className="product-desc border-2 border-gray-100 px-1 cursor-pointer rounded-md ">M</span>
                                                <span className="product-desc border-2 border-gray-100 px-1 cursor-pointer rounded-md ">L</span>
                                            </div>
                                        </div>
                                        <div className=" flex  gap-3 text-sm font-normal flex-row items-center py-1">
                                            <span>Quantity:</span>
                                            <div className="quan-btn flex gap-7 items-center">
                                                <input className="product-quantity border-2 rounded-md border-gray-200 p-1" value={cartQuantitiy} type="number" min={1} max={quantity && quantity} onChange={(e) => setCartQuantity(e.target.value)} />
                                                <button onClick={() => handleCartSubmit()} className="bg-slate-800 w-fit text-center  text-white font-medium py-2 px-3 rounded-full hover:bg-orange-400 dark:hover:bg-orange-400">Add to Cart</button>
                                                <button className="bg-orange-400 w-fit text-center  text-white font-medium py-2 px-3 rounded-full hover:bg-slate-600 dark:hover:bg-slate-800">Buy It Now</button>

                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <button onClick={() => { dispatch(addToCompare(productId)); }} className='flex gap-2 items-center'><img className="h-6 w-6  rounded-full" src={CompareIcon} alt="compare" />
                                                <span className="text-sm font-normal mb-0">
                                                    Add To Compare
                                                </span>
                                            </button>
                                            <button onClick={() => dispatch(addToWishList(productId))} className='flex gap-2 items-center'><img className="h-5 w-5  rounded-full" src={wishlistIcon} alt="wishlist" />
                                                <span className="text-sm font-normal mb-0">
                                                    Add To Wishlist
                                                </span>
                                            </button>

                                        </div>
                                        <div className=" flex flex-col gap-2 text-sm font-normal py-1">
                                            <span>Shippng And Returns:</span>
                                            <span className="product-desc">Free shipping and returns available on all orders! <br /> We shipp all Janakpur domestic orders within <b>1-2 days</b></span>
                                        </div>
                                        <div className=" flex items-center gap-2 text-sm font-normal h-12 py-1">
                                            <span>Product Link:</span><span onClick={() => copyToClipboard(location.pathname)} className="product-desc cursor-pointer">Copy Product Link</span>
                                            <span id="copylink" className=" hidden border-2 border-gray-300 rounded-md p-1 bg-gray-100">copied</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section className="single-product-desc">
                    <div className="container mx-auto">
                        <h3 className="text-2xl font-medium py-5">Description</h3>
                        <div className="desc-holder  bg-white box-shadow-dim p-3 rounded-md">
                            <div className="desc text-md font-normal">{description && parse(description)}</div>
                        </div>
                    </div>
                </section>
                <section className="product-review py-5">
                    <div className="container mx-auto">
                        <h3 className=" text-2xl font-medium mb-2">Reviews</h3>
                        <div id="review" className="product-review-holder rounded-md bg-white box-shadow-dim p-2">
                            <div className="review-head flex flex-col justify-start border-b-2 border-gray-200 pb-2">
                                <h4 className="text-md font-medium mb-2">Customer Reviews</h4>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center justify-start gap-8">
                                        {totalrating !== undefined && <ReactStars
                                            count={5}
                                            value={totalrating}
                                            size={20}
                                            isHalf={true}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />}
                                        <p className="review-total text-sm mb-0 font-medium">Based on {ratings !== undefined && ratings?.length} reviews</p>

                                    </div>
                                    <Link className="underline tex-sm font-normal" >Write a review</Link>
                                </div>

                                <form action="" className=' review-form flex justify-start gap-2 flex-col rounded-sm box-shadow-dim p-2' onSubmit={formik.handleSubmit}>
                                    <h4 className="text-md font-medium contact-title pb-2">Write a review</h4>
                                    <ReactStars
                                        count={5}
                                        value={rate}
                                        size={24}
                                        isHalf={true}
                                        onChange={(e) => setRate(e)}
                                        edit={true}
                                        activeColor="#ffd700"
                                    />
                                    <textarea name="comment" onChange={formik.handleChange('comment')} onBlur={formik.handleBlur('comment')} value={formik.values.comment} className='review-input border-2 border-gray-300 text-md font-medium py-2 px-2 pb-6 rounded-md' type="text" placeholder='Comment' />
                                    <div className="flex justify-end">
                                        <button type="submit" className="bg-slate-800 w-fit text-center mt-2 text-white font-medium py-2 px-3 rounded-full hover:bg-orange-400 dark:hover:bg-orange-500">Submit Review</button>
                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>
                </section>
                <section className="similar-products py-5">
                    <div className="container mx-auto">
                        <h4 className="text-2xl font-medium py-5">You May Also Like</h4>
                        <div className="products grid grid-cols-12 gap-4">
                            {products && products?.slice(4, 8)?.map((elem) => {
                                return <ProductCard key={elem._id} id={elem._id} title={elem.title} rating={elem.totalrating} images={elem.images} price={elem.price} />
                            })

                            }
                        </div>
                    </div>
                </section>

            </Container>
        </>
    )
}

export default SingleProduct
