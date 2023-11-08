import {useEffect} from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import crossIcon from '../assets/cross.svg';
import Color from '../components/Color';
import Container from '../components/Container';
import {useDispatch, useSelector} from 'react-redux';
import {getCompareProducts} from '../features/auth/authSlice';
import {removeFromCompare} from '../features/products/productSlice';

const CompareProduct = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCompareProducts());
  },[])
  const compareProducts = useSelector((state)=> state.auth.compare);
  const removedCompare = useSelector(state => state.product.removedCompare);

  useEffect(()=>{
    dispatch(getCompareProducts());
  },[removedCompare])
    return (
        <>
            <Meta title="Compare Product" />
            <BreadCrumb title="Compare Prodcut" />
            <Container class1="compare-product-wrapper set-bg py-5">
                <div className="grid grid-cols-12 gap-4">
                  {compareProducts !==undefined && compareProducts?.map((elem)=>{
                    return (  
                        <div key={elem?._id} className="compare-product flex items-center justify-center flex-col col-span-2">
                        <div className="compare-product-img relative h-48 flex items-center justify-center overflow-hidden bg-white p-2 rounded-md">
                            <img src={elem?.productId?.images && elem?.productId?.images[0]?.url} alt="product images" />
                            <img onClick={()=> dispatch(removeFromCompare(elem?._id))} className="absolute top-0 right-0 h-10 cursor-pointer" src={crossIcon} alt="cross icon" />
                        </div>
                        <div className="compare-product-content flex flex-col gap-1  p-2">
                            <div className="product-title  text-md font-medium">
                                {elem?.productId?.title && elem?.productId?.title?.length >= 40 ? elem?.productId?.title?.substring(0, 40) + '...' : elem?.productId?.title}
                            </div>
                            <div className=" flex items-center justify-between text-md font-medium py-2 border-b-2 border-gray-400">
                                <span>Price:</span><span className="product-price">${elem?.productId?.price && elem?.productId?.price}</span>
                            </div>
                            <div className=" flex items-center justify-between text-md font-medium py-2 border-b-2 border-gray-400">
                                <span>Brand:</span><span className="product-desc">{elem?.productId?.brand && elem?.productId?.brand}</span>
                            </div>
                            <div className=" flex items-center justify-between text-md font-medium py-2 border-b-2 border-gray-400">
                                <span>Type:</span><span className="product-desc">{elem?.productId?.category && elem?.productId?.category}</span>
                            </div>
                            <div className=" flex items-center justify-between text-md font-medium py-2 border-b-2 border-gray-400">
                                <span>Color:</span>
                                <Color color={elem?.productId?.color && elem?.productId?.color}/>
                            </div>
                            {/*<div className=" flex items-center justify-between text-md font-medium py-2">
                               <span>Size:</span><span className="product-desc">S M L</span>
                             </div>*/}
                        </div>

                    </div>
                    )
                  }) }
                </div>

            </Container>
        </>
    )
}

export default CompareProduct
