import { useState } from 'react';
import addCartIcon from '../assets/cart-5-svgrepo-com.svg';
import wishlistIcon from '../assets/black-heart.svg';
import viewIcon from '../assets/view-eye-svgrepo-com.svg';
import compareIcon from '../assets/compare-svgrepo-com.svg';
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from 'react-router-dom';
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, addToCompare } from '../features/products/productSlice';
import { addToCart } from '../features/auth/authSlice';
const ProductCard = (props) => {
    const { grid, id, title, color, description, brand, rating, price, images } = props;
    const location = useLocation();
    const dispatch = useDispatch();


    return (
        <div className={`col-span-${location.pathname === '/product' ? `${grid}` : '2'} box-shadow-dim rounded-md overflow-hidden bg-white`}>
            <div className="product-item relative">
                <div className="product-img flex items-center justify-center h-36 overflow-hidden">
                    {images && images.map((elem) => <img className=" w-full" key={elem.public_id} src={elem.url} alt="product-image" />)
                    }

                </div>

                <div className="product-details p-2">
                    <Link to={location.pathname == "/" ? `/product/${id}` : location.pathname == `/product/${id}` ? `../product/${id}` : `../product/${id}`}>
                        <h6 className="brand text-sm font-medium">{brand}</h6>

                        <h5 className="product-title text-md font-medium">
                            {title?.length >= 40 ? title.substring(0, 40) + '...' : title}
                        </h5>
                        <div className={grid === 12 ? 'product-description' : 'hidden'}>
                            {parse(description ? description : '')}
                        </div>
                            <ReactStars
                                count={5}
                                value={rating && parseInt(rating)}
                                size={22}
                                isHalf={true}
                                edit={false}
                                activeColor="#ffd700"
                            />

                        <p className="product-price text-sm font-medium">${price}</p>
                    </Link>
                    <div className="flex flex-col gap-2 absolute action-bar">
                        <button onClick={() => dispatch(addToCompare(id))}>
                            <img src={compareIcon} alt="compare Icon" className="h-5" />
                        </button>
                        <Link to={location.pathname == "/" ? `/product/${id}` : location.pathname == `/product/${id}` ? `product/${id}` : `../product/${id}`}>
                            <img src={viewIcon} alt="view Icon" className="h-5" />
                        </Link>
                        {color !== undefined &&
                            <button onClick={() => dispatch(addToCart({ productId: id, color: color[0][0], quantity: 1, price: price }))}>
                                <img src={addCartIcon} alt="addCart Icon" className="h-5" />
                            </button>
                        }
                    </div>
                    <div className="wishlist absolute top-2 right-2 ">
                        <button onClick={() => {
                            dispatch(addToWishList(id));
                        }}>
                            <img src={wishlistIcon} alt="wishList Icon" className='h-5' />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductCard
