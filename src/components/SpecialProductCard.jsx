import React from 'react'
import ReactStars from "react-rating-stars-component";
import {Link} from 'react-router-dom';

const SpecialProductCard = (props) => {
    const {title, brand, price, rating, quantity, images, id} = props;
    return (
        <div className="special-product col-span-4 box-shadow-dim rounded-md overflow-hidden bg-white p-4">
            <div className="flex justify-between h-full gap-4">
                <div className="special-product-img  h-full w-full">
                {images && images?.slice(0,2)?.map((elem)=>{
                   return  <img key={elem.public_id} className="h-1/2 rounded-md" src={elem.url} alt="special product img" />

                })
                }
                </div>
                <div className="special-product-content">
                    <h6 className="brand text-md font-medium">{brand}</h6>
                    <h5 className="title  mt-2 text-xl font-medium">
                        {title && title.substring(0, 40)}...
                    </h5>
                    <ReactStars
                            count={5}
                            value={parseInt(rating)}
                            size={22}
                            isHalf={true}
                            edit={false}
                            activeColor="#ffd700"
                        />
                    <p className="price my-2">
                        <span className="red-p text-orange-700" >{price}</span>
                         {/*&nbsp; <strike>$200</strike>*/}
                    </p>
                    <div className="discount-till flex items-center gap-4">
                        <p className="mb-3">

                            <span className="py-2 font-normal">
                            <b>5</b> days
                            </span>
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-red-500 p-1.5  text-sm font-medium text-white rounded-full">05</span>:
                            <span className="bg-red-500 p-1.5  text-sm font-medium text-white rounded-full">21</span>:
                            <span className="bg-red-500 p-1.5 text-sm font-medium text-white rounded-full">23</span>
                        </div>

                    </div>
                    <div className="progress-bar">
                        <p>Products : {quantity}</p>

                        <div className="w-full mt-2 bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                            <div className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500" style={{ width: "45%" }}></div>
                        </div>
                    </div>
                    <Link to={`product/${id}`} className="bg-slate-800  text-white font-bold py-2 px-3 rounded-full hover:bg-orange-500 dark:hover:bg-orange-600">Read More</Link>
                </div>


            </div>

        </div>
    )
}

export default SpecialProductCard
