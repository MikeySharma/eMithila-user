import { useState, useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ReactStars from "react-rating-stars-component";
import grid1 from '../assets/grid-1.svg';
import grid2 from '../assets/grid-2.svg';
import grid3 from '../assets/grid-3.svg';
import grid4 from '../assets/grid-4.svg';
import ProductCard from '../components/ProductCard';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/products/productSlice';
import { getColors } from '../features/auth/authSlice';
import {Link} from 'react-router-dom';

const OurStore = () => {
  const [grid, setGrid] = useState(3);
  const [limit, setLimit] = useState(16);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();


  const handleGrid = (e, f) => {
    if (e === 3) {
      setGrid(e);
      setLimit(16);
    } else if (e === 4) {
      setGrid(e);
      setLimit(9);
    } else if (e === 6) {
      setGrid(e);
      setLimit(10);
    } else if (e === 12) {
      setGrid(e);
      setLimit(4)
    }

    setTimeout(() => {
      dispatch(getProducts({ limit: f, page }));
    }, 200)
  }
  useEffect(() => {
    dispatch(getProducts({ limit, page }));
    dispatch(getColors())
  }, [])

  const products = useSelector((state) => state?.product?.products);
  const colors = useSelector(state => state?.auth?.colors);

  const fetchMoreData = () => {
    if (products?.length < limit) {
      setHasMore(false);

    } else {
      setHasMore(true);
      setPage(page + 1)
      dispatch(getProducts({ limit, page: page + 1 }));
    }
    window.scrollTo(0,0);
  }
  const fetchLessData = () => {
    setPage(page - 1);
    setHasMore(true);
    dispatch(getProducts({ limit, page: page - 1 }));
    window.scrollTo(0,0);
  }

  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper py-5">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3 our-store-filter">
            <div className="filter-card bg-white rounded-md box-shadow-dim mb-4 p-3">
              <h5 className="filter-title text-xl font-medium mb-4" >Shop By Categories</h5>
              <ul>
                <li className="text-md font-normal mb-2">Home</li>
                <li className="text-md font-normal mb-2">Our Store</li>
                <li className="text-md font-normal mb-2">Blogs</li>
                <li className="text-md font-normal mb-2">Contacts</li>
              </ul>
            </div>
            <div className="filter-card  bg-white rounded-md box-shadow-dim mb-4 p-3">
              <h5 className="filter-title text-xl font-medium mb-4" >Filter By</h5>
              <h3 className="text-md font-bold mb-2">Availability</h3>
              <form action="none" className="form-input-check">
                <div className="flex items-center mb-2">
                  <input type="checkbox" className="check-box mr-2 accent-orange-400  w-3 h-3 " id="check-box-1" name="check-box-1" />
                  <label htmlFor="check-box-1" className="text-sm font-normal">In Stock(21)</label>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" className="check-box mr-2 accent-orange-400 w-3 h-3" id="check-box-2" name="check-box-2" />
                  <label htmlFor="check-box-2" className="text-sm font-normal">Out Of Stock(0)</label>
                </div>
              </form>
              <h3 className="text-md font-bold my-3">Price</h3>
              <div className="filter-price flex items-center gap-2">
                <span className="text-md font-medium">$</span>
                <input type="text" className="p-1  w-28 rounded-sm" placeholder='From' />
                <span className="text-md font-medium">$</span>
                <input type="text" className="p-1  w-28 rounded-sm" placeholder='To' />
              </div>
              <div>
                <h3 className="text-md font-bold my-3">Color</h3>
                <div className="color-filter">
                  <ul className="flex items-center gap-3 flex-wrap">
                    {colors !== undefined && colors?.map((item) => <button key={item?._id} style={{ "background": `${item?.title}` }} className='h-4 w-4 rounded-full border-2 border-gray-400'></button>
                    )}
                  </ul>
                </div>

              </div>
              <div className='size-filter'>
                <h3 className="text-md font-bold my-3">Size</h3>
                <div className="flex gap-2 flex-col">
                  <div className="flex items-center">
                    <input type="checkbox" className="check-box mr-2 accent-orange-400  w-3 h-3 " id="size-box-1" name="size-box-1" />
                    <label htmlFor="size-box-1" className=" text-sm font-normal" >S (10)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="check-box mr-2 accent-orange-400  w-3 h-3 " id="size-box-2" name="size-box-2" />
                    <label htmlFor="size-box-2" className=" text-sm font-normal" >M (13)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="check-box mr-2 accent-orange-400  w-3 h-3 " id="size-box-3" name="size-box-3" />
                    <label htmlFor="size-box-3" className=" text-sm font-normal" >L (10)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="check-box mr-2 accent-orange-400  w-3 h-3 " id="size-box-4" name="size-box-4" />
                    <label htmlFor="size-box-4" className=" text-sm font-normal" >XL (5)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="check-box mr-2 accent-orange-400  w-3 h-3 " id="size-box-5" name="size-box-5" />
                    <label htmlFor="size-box-5" className=" text-sm font-normal" >XXL (5)</label>
                  </div>
                </div>

              </div>
            </div>
            <div className="filter-card bg-white rounded-md box-shadow-dim mb-4 p-2">
              <h5 className="filter-title text-xl font-medium mb-2" >Product Tag</h5>
              <div className="product-tag-list flex items-center gap-2 flex-wrap">
                <span className="product-tags text-sm font-normal p-1 rounded-md">Headphones</span>
                <span className="product-tags text-sm font-normal p-1 rounded-md">Laptop</span>
                <span className="product-tags text-sm font-normal p-1 rounded-md">Mouse</span>
                <span className="product-tags text-sm font-normal p-1 rounded-md">Mobile</span>
                <span className="product-tags text-sm font-normal p-1 rounded-md">Wire</span>
                <span className="product-tags text-sm font-normal p-1 rounded-md">Speaker</span>
                <span className="product-tags text-sm font-normal p-1 rounded-md">Tablet</span>
                <span className="product-tags text-sm font-normal p-1 rounded-md">One Plus</span>
              </div>
            </div>
            <div className="filter-card bg-white rounded-md box-shadow-dim  p-2">
              <h5 className="filter-title text-xl font-medium mb-1" >Random Products</h5>
              <div className="random-products">
                {products && products?.slice(10, 12)?.map((elem) => {
                  return (<div key={elem?._id} className="random-product-1 flex items-center gap-5 border-b-2 py-2 rounded-md">
                    <div className="random-product-img rounded-md overflow-hidden">
                      <img className="h-32 w-48" src={elem?.images[0]?.url} alt="random prouct imaages" />
                    </div>
                    <Link to={`/product/${elem?._id}`}>
                      <div className="random-product-content">
                        <h4 className='text-md font-medium'>{elem?.title?.length >= 40 ? elem?.title?.substring(0, 30) + '...' : elem?.title}</h4>
                        <ReactStars
                          count={5}
                          value={elem?.rating && elem?.rating}
                          size={22}
                          isHalf={true}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <h5 className="random-product-price text-md font-normal">
                          {elem?.price}
                        </h5>
                      </div>
                    </Link>

                  </div>)
                })}

              </div>
            </div>
          </div>
          <div className="col-span-9 our-store-res">
            <div className="grid-filter-sort box-shadow-dim rounded-sm bg-white p-3">
              <div className="flex items-center justify-between">
                <div className="sort-by flex items-center gap-2">
                  <p className="text-md font-medium">Sort By : </p>
                  <select name="" id="" className="form-control p-2 rounded-sm">
                    <option value="manual">Featured</option>
                    <option value="best-selling" >Best Selling</option>
                    <option value="title-ascending">Alphabetically A-Z</option>
                    <option value="title-descending">Alphabetically Z-A</option>
                    <option value="price-ascending">Price, Low to High</option>
                    <option value="price-descending">Price, High to Low</option>
                    <option value="created-ascending">Date, old to new</option>
                    <option value="created-descending">Date, new to old</option>
                  </select>
                </div>
                <div className="grid-sort">
                  <div className="flex items-center gap-3">
                    <p className="totalproducts">
                      {products && products.length} {products.length === 1 ? 'Product' : 'Products'}
                    </p>
                    <img onClick={() => handleGrid(3, 16)} className='h-8 w-8 rounded-md p-1' src={grid1} alt="grid icons" />
                    <img onClick={() => handleGrid(4, 9)} className='h-8 w-8 rounded-md p-1' src={grid2} alt="grid icons" />
                    <img onClick={() => handleGrid(6, 10)} className='h-8 w-8 rounded-md p-1' src={grid3} alt="grid icons" />
                    <img onClick={() => handleGrid(12, 4)} className='h-8 w-8 rounded-md p-1' src={grid4} alt="grid icons" />
                  </div>
                </div>
              </div>
            </div>
            <div className="ourstore-products grid grid-cols-12 py-2 gap-2">
              {products && products?.map((elem) => {
                return <ProductCard key={elem?._id} color={elem?.color} id={elem._id} grid={grid} title={elem.title} brand={elem.brand} description={elem.description} price={elem.price} images={elem.images} rating={elem.totalrating} />
              })
              }
            </div>
            <div className={`flex items-center justify-${page === 1 ? 'end' : 'between'}`}>
              <button onClick={() => fetchLessData()} className={`bg-blue-400 rounded-md p-1 px-2 text-md ${page === 1 ? "hidden" : ''}`}>Go Back</button>
              {!hasMore ? <div className="text-xl bg-blue-400 rounded-md p-1 px-2">No More Data</div> :
                <button onClick={() => fetchMoreData()} className="bg-blue-400 rounded-md p-1 px-2 text-md">Next</button>
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default OurStore
