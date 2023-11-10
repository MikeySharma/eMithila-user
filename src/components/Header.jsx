import { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import searchIcon from '../assets/search-alt-svgrepo-com.svg';
import compare from '../assets/code-compare-svgrepo-com.svg';
import heart from '../assets/heart-alt-svgrepo-com.svg';
import user from '../assets/user-alt-1-svgrepo-com.svg';
import shoppingCart from '../assets/cart-shopping-svgrepo-com.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getUserCart } from '../features/auth/authSlice';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import { slide as Menu } from 'react-burger-menu';
import CustomModal from './CustomModel';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState(null);
  const [selectOpt, setSelectOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const hideModal = () => {
    setOpen(false);
  };
  const performAction = () => {
    setOpen(false);
    handleLogout()
  }
  const handleItemClick = () => {
    setIsOpen(false);
  };

  const products = useSelector((state) => state?.product?.products)
  const cartState = useSelector((state) => state?.auth?.cart);
  const [customerInfo, setCustomerInfo] = useState();
  useEffect(() => {
    if (localStorage.getItem('customer')) {
      setCustomerInfo(JSON.parse(localStorage.getItem('customer')));
    } else {
      setCustomerInfo(null);
    }
  }, [products])

  useEffect(() => {
    if (cartState !== undefined) {
      let sum = 0;
      cartState.forEach((elem) => {
        sum = sum + Number(elem?.quantity * elem?.price);
        setTotalAmount(sum);
      })
    }
  }, [cartState])

  useEffect(() => {
    dispatch(getUserCart());
  }, [])

  useEffect(() => {
    let data = [];
    products && products?.forEach((item) => {
      data.push({ id: item?._id, name: item?.title })
    })
    setSelectOpt(data);
  }, [products])

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <>
      <div className="container mx-auto">
        <header className="header-top-strip py-1 px-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white mb-0">Free Shipping Over $100 & Free Returns</p>
            </div>
            <div>
              <p className="text-white mb-0">Hotline: <a className="text-white" href="+977 9825850687">+977-9825850687</a></p>
            </div>
          </div>
        </header>
      </div>

      <div className="container  mx-auto">
        <header className="header-upper p-2">
          <div className="flex items-center justify-between h-10">
            <div>
              <h3><Link to="/" className="text-white text-3xl">eMithila</Link></h3>
            </div>
            <div className="header-search-bar" style={{ "width": "30rem" }}>
              <div className="flex rounded-md z-10">
                <Typeahead
                  id="basic-behaviors-example"
                  labelKey="name"
                  options={selectOpt}
                  onPaginate={() => console.log('Results paginate')}
                  paginate={paginate}
                  minLength={1}
                  onChange={(e) => { e[0]?.id !== undefined ? navigate(`/product/${e[0]?.id}`) : '' }}
                  placeholder="Search for Products"
                />
                <span className='input-group-text p-2 text-xl ' id='basic-addon2'>
                  <img src={searchIcon} alt="search" className="h-6" />
                </span>
              </div>
            </div>
            <div>
              <div className="header-upper-links flex items-center content-center gap-2">
                <div>
                  <Link to="/compare-product" className="flex items-center gap-2" >
                    <img src={compare} alt="compare icon" className="h-8" />
                    <p className="text-white text-md flex flex-col leading-5" ><span>Compare</span><span>Products</span></p>
                  </Link>

                </div>
                <div>
                  <Link to="/wishlist" className="flex items-center gap-2" >
                    <img src={heart} alt="heart icon" className="h-8" />
                    <p className="text-white text-md flex flex-col leading-5" ><span>Favourite</span><span>Wishlist</span></p>
                  </Link>

                </div>
                <div>
                  {
                    (customerInfo === null || customerInfo === undefined) ?
                      (<Link to="/login" className="flex items-center gap-2" >
                        <img src={user} alt="user icon" className="h-8" />
                        <p className="text-white text-md flex flex-col leading-5" ><span>Login</span><span>My Account</span></p>
                      </Link>) :
                      (<button onClick={() => setOpen(true)} className="flex items-center gap-2" >
                        <img src={user} alt="user icon" className="h-8" />
                        <p className="text-white text-md flex flex-col leading-5" ><span>Logout</span><span>{customerInfo?.firstname !== undefined && customerInfo?.firstname}</span></p>
                      </button>)
                  }

                </div>
                <div>
                  <Link to="/cart" className="flex items-center gap-2" >
                    <img src={shoppingCart} alt="shopping cart icon" className="h-8" />
                    <p className="text-white text-md flex flex-col gap-1 leading-5" ><span className='bg-white px-2 rounded-sm text-black text-center text-md'>{cartState?.length}</span><span className="text-center">$ {(totalAmount !== 0 && totalAmount !== null) ? totalAmount : 0}</span></p>
                  </Link>

                </div>
              </div>

            </div>
            <div className="hamburger-menu hidden">
              <div className="flex items-center gap-9">
                {
                  (customerInfo === null || customerInfo === undefined) ?
                    (<Link to="/login" className="flex items-center gap-1" >
                      <img src={user} alt="user icon" className="h-8" />
                      <p className="text-white text-md flex flex-col leading-5" ><span>Login</span><span>My Account</span></p>
                    </Link>) :
                    (<button onClick={() => setOpen(true)} className="flex items-center gap-1" >
                      <img src={user} alt="user icon" className="h-8" />
                      <p className="text-white text-md flex flex-col leading-5" ><span>Logout</span><span>{customerInfo?.firstname !== undefined && customerInfo?.firstname}</span></p>
                    </button>)
                }
                <Menu isOpen={isOpen} onStateChange={(state) => setIsOpen(state.isOpen)} right>
                  <Typeahead
                    id="basic-behaviors-example"
                    labelKey="name"
                    options={selectOpt}
                    onPaginate={() => console.log('Results paginate')}
                    paginate={paginate}
                    minLength={1}
                    onChange={(e) => { e[0]?.id !== undefined ? navigate(`/product/${e[0]?.id}`) : '' }}
                    placeholder="Search for Products"
                  />
                  <NavLink onClick={handleItemClick} to="/">Home</NavLink>
                  <NavLink onClick={handleItemClick} to="/product">our Store</NavLink>
                  <NavLink onClick={handleItemClick} to="/blog">Blog</NavLink>
                  <NavLink onClick={handleItemClick} to="/contact">Contact</NavLink>
                  <Link onClick={handleItemClick} to="/compare-product">Compare Products</Link>
                  <Link onClick={handleItemClick} to="/wishlist" >Favourite Wishlist</Link>
                  <Link onClick={handleItemClick} to="/cart">Go To Cart</Link>
                </Menu>
              </div>
            </div>


          </div>



        </header>
      </div>

      <div className="container mx-auto ">

        <header className="header-bottom py-1 px-2 flex items-center relative justify-start gap-4">


          <div className="menu-link text-white text-md font-normal flex items-center gap-4 uppercase">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/product">our Store</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        </header>
      </div>
      <CustomModal open={open} performAction={performAction} hideModal={hideModal} title={"Do you really want to Logout Your Account"} />


    </>
  )
}

export default Header
