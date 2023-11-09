import {useEffect} from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import crossIcon from '../assets/cross.svg';
import Container from '../components/Container';
import {useDispatch, useSelector} from 'react-redux';
import {getWishlist} from '../features/auth/authSlice';
import {addToWishList} from '../features/products/productSlice';

const Wishlist = () => {
  const dispatch=useDispatch();


  const wishlistState = useSelector((state)=> state.auth.wishlist);
  const addedWishlist = useSelector((state)=> state.product.addedWishlist);

  useEffect(()=>{
    dispatch(getWishlist())
  },[ ,addedWishlist])
  return (
    <>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-product-wrapper set-bg py-5">
        <div className="grid grid-cols-12 gap-4">
        {wishlistState?.length !== 0  ? wishlistState?.map((elem)=>{
          return (
            <div key={elem._id} className="wishlist-product flex items-center justify-center flex-col col-span-2">
            <div className="wishlist-product-img relative h-28 w-full flex items-center justify-center overflow-hidden rounded-md">
              <img className="h-full w-full" src={elem.images[0].url} alt={`${elem.title} images`} />
              <button onClick={()=> dispatch(addToWishList(elem._id))}><img className="absolute top-0 right-0 h-8 cursor-pointer" src={crossIcon} alt="cross icon" /></button>
            </div>
            <div className="wishlist-product-content bg-white w-full flex flex-col gap-1  p-2">
              <div className="product-title pt-4 text-md font-bold">
                {elem.title}
              </div>
              <div className=" flex items-center justify-start text-md font-medium py-2">
                <span className="product-price">${elem.price}</span>
              </div>
            </div>
          </div>
          )
        }) : (<div className="text-center text-xl col-span-12">No Data</div>)}
          
        </div>
      </Container>
    </>
  )
}

export default Wishlist
