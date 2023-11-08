import { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import searchIcon from '../assets/search-alt-svgrepo-com.svg';
import compare from '../assets/code-compare-svgrepo-com.svg';
import heart from '../assets/heart-alt-svgrepo-com.svg';
import user from '../assets/user-alt-1-svgrepo-com.svg';
import shoppingCart from '../assets/cart-shopping-svgrepo-com.svg';
import categoriesMenu from '../assets/menu-2-svgrepo-com.svg';
import downArrow from '../assets/down-arrow-5-svgrepo-com.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getUserCart } from '../features/auth/authSlice';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState(null);
  const [selectOpt, setSelectOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);

  const dropdownMenuToggler = () => {
    const dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('hidden');
  }
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
      <header className="header-top-strip py-1">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white mb-0">Free Shipping Over $100 & Free Returns</p>
            </div>
            <div>
              <p className="text-white mb-0">Hotline: <a className="text-white" href="+977 9825850687">+977-9825850687</a></p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-10">
            <div>
              <h3><Link to="/" className="text-white text-3xl">eMithila</Link></h3>
            </div>
            <div style={{ "width": "30rem" }}>
              <div className="flex rounded-md z-10">
                <Typeahead
                  id="basic-behaviors-example"
                  labelKey="name"
                  options={selectOpt}
                  onPaginate={() => console.log('Results paginate')}
                  paginate={paginate}
                  minLength={2}
                  onChange={(e) => { e[0]?.id !== undefined ? navigate(`/product/${e[0]?.id}`) : '' }}
                  placeholder="Search for Products"
                />
                <span className='input-group-text p-2 text-xl ' id='basic-addon2'>
                  <img src={searchIcon} alt="search" className="h-6" />
                </span>
              </div>
            </div>
            <div>
              <div className="header-upper-links flex items-center content-center gap-4">
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
                      (<button onClick={() => handleLogout()} className="flex items-center gap-2" >
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
          </div>
        </div>

      </header>


      <header className="header-bottom py-1">
        <div className="container mx-auto flex items-center relative justify-start gap-4">
          <div className="text-white   focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  py-1 text-center flex flex-col" name="dropdown-menu" onClick={dropdownMenuToggler} >
            <label className='text-white text-md font-medium uppercase flex items-center gap-4 cursor-pointer' htmlFor="dropdown-menu"><img src={categoriesMenu} alt="categories Menu" className="h-6" />Shop Categories <img src={downArrow} alt=" down Arrow Icon" className="h-7" /></label>
          </div>
          <div id="dropdown" className="z-1 hidden absolute top-full bg-white divide-y divide-gray-100 rounded-lg shadow w-56 dark:bg-gray-700">
            <ul className="py-1 text-md text-center capitalize  dark:text-gray-200" aria-labelledby="dropdown-menu">
              <li>
                <Link className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">tables</Link>
              </li>
              <li>
                <Link className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">chairs</Link>
              </li>
              <li>
                <Link className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">bed</Link>
              </li>
              <li>
                <Link className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">window</Link>
              </li>
            </ul>
          </div>
          <div className="menu-link text-white text-md font-normal flex items-center gap-4 uppercase">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/product">our Store</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
