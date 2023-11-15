import { useEffect } from 'react'
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import parse from 'html-react-parser';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProductCard from '../components/SpecialProductCard';
import FeatureProductCard from '../components/FeatureProductCard';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { spanStyle, divStyle, slideImages, Services } from '../components/Data';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../features/blog/blogSlice';
import { getProducts } from '../features/products/productSlice';
import { Link } from 'react-router-dom';

const Home = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts({ limit: 16, page: 1 }));
    dispatch(getBlogs());
  }, [])

  const blogs = useSelector((state) => state?.blog?.blogs);
  const productState = useSelector((state) => state?.product);
  const {products, isLoading} = productState;

  return (
    <>
      <Meta title="Home" />
      {isLoading && <div style={{height: '90vh'}} className="text-center py-5 text-xl font-medium flex items-center justify-center">Please Wait...</div>}
      {!isLoading && 
      <>
      <Container class1="home-wrapper-1 py-2">
        <div className="banner grid grid-cols-12 gap-2">
          <div className="slide-container col-span-6 rounded-md overflow-hidden">
            <Slide>
              {slideImages.map((slideImage, index) => (
                <div className="w-full" key={index}>
                  <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                    <span style={spanStyle}>{parse(slideImage.caption)}</span>
                  </div>
                </div>
              ))}
            </Slide>
          </div>
          <div className=" small-banners col-span-6 grid grid-cols-2 gap-2 ">
            {products && products?.filter((elem) => elem?.tags === 'special')?.slice(0, 4)?.map((elem) => {
              return (<div key={elem?._id} className="small-banner col-span-1 relative rounded-md overflow-hidden">
                <img src={elem?.images[0]?.url} className='w-full h-48 ' alt="small-banner" />
                <Link to={`product/${elem?._id}`}>
                <div className="small-banner-content absolute">
                  <h4 className="text-md bg-gray-100 rounded-md w-fit px-2 mb-3 ">{elem?.brand}</h4>
                  <h5 className='text-xl text-gray-100 rounded-md w-fit uppercase transform-none'>{elem?.title?.substring(0, 20) + '...'}</h5>
                  <p className='text-md text-gray-100 rounded-md w-fit'>from ${elem?.price + 20}  or ${elem?.price - 20}</p>
                </div>
                </Link>

              </div>)
            })}

          </div>

        </div >
      </Container>

      <Container class1="home-wrapper-2 py-5 ">
        <div className="grid grid-cols-12">
          <div className="col-span-12 overflow-hidden">
            <div className="services flex items-center justify-between">
              {Services.map((service, index) => {
                return (
                  <div key={index} className="flex items-center gap-2" >
                    <img src={service.image} alt="shipping Icon" className="h-9" />
                    <div>
                      <h5 className="text-md font-bold" >{service.title}</h5>
                      <p className="text-sm font-normal">{service.tagline}</p>
                    </div>
                  </div>
                )
              })}


            </div>
          </div>
        </div>


      </Container >

      <Container class1="home-wrapper-2 py-5">
        <div className=" bg-white border-b-2 overflow-hidden border-gray-300 grid grid-cols-12">
          <div className="col-span-12">
            <div className="categories flex items-center justify-between ">
              {products && products?.slice(0, 5)?.map((elem) => {
                return (
                  <div key={elem._id} className="flex items-center w-72 justify-center gap-4 py-2  border-r-2 border-gray-200">
                    <div>
                      <Link to={`product/${elem._id}`}>
                        <h6 className="text-md font-medium">{elem?.title?.substring(0, 15)}...</h6>
                        <p style={{ opacity: .8 }} className="text-sm">{elem?.quantity} items</p>
                      </Link>
                    </div>
                    <img src={elem?.images[0].url} alt={elem.images[0].url} className="w-16 h-12 rounded-md" />
                  </div>
                )
              })}

            </div>
          </div>

        </div>
        <div className=" bg-white  border-gray-300 grid grid-cols-12">
          <div className="col-span-12">
            <div className="categories flex items-center justify-between ">
              {products && products?.slice(5, 10)?.map((elem) => {
                return (
                  <div key={elem._id} className="flex items-center w-72 justify-center gap-4 py-2   border-r-2 border-gray-200">
                    <div>
                      <Link to={`product/${elem._id}`}>
                        <h6 className="text-md font-medium">{elem?.title?.substring(0, 15)}...</h6>
                        <p style={{ opacity: .8 }} className="text-sm">{elem?.quantity} items</p>
                      </Link>
                    </div>
                    <img src={elem?.images[0].url} alt={elem.images[0].url} className="w-16 h-12 rounded-md" />
                  </div>
                )
              })}

            </div>
          </div>

        </div>
      </Container>

      <Container class1="special-product-wrapper py-5">
        <h4 className="mb-5 text-2xl font-medium px-5">Our Special Products</h4>
        <div className="grid grid-cols-12 gap-3 ">
          {
            products && products?.filter((elem) => elem.tags === "special")?.slice(0, 3)?.map((elem) => {
              return <SpecialProductCard key={elem?._id} id={elem._id} title={elem?.title} rating={elem?.totalrating} brand={elem?.brand} price={elem?.price} quantity={elem?.quantity} images={elem?.images} />
            })
          }
        </div>
      </Container>

      <Container class1="popular-product-wrapper py-5">
        <h4 className=" bg-white mb-5 text-2xl font-medium p-5 box-shadow-dim">Our Popular Products</h4>
        <div className="product-category-wrapper grid grid-cols-12 gap-5 ">
          <div className="col-span-2 box-shadow-dim rounded-md overflow-hidden">
            <div className="popular-product-items  h-full bg-white rounded-sm flex items-start flex-col">
              <div className="product-1 flex items-center gap-3 px-2 py-4 ">
                <img className="h-8" src="https://pngimg.com/d/bed_PNG17404.png" alt="bed image" />
                <p className="title text-md font-medium">Modern Beds</p>
              </div>
              <div className="product-1 flex items-center gap-3 px-2 py-4">
                <img className="h-8" src="https://img.lovepik.com/free-png/20211124/lovepik-nordic-japanese-home-dressing-table-png-image_401115713_wh1200.png" alt="dressing table image" />
                <p className="title text-md font-medium">Modern Dressing Tables</p>
              </div>

            </div>
          </div>
          <div className="col-span-2 box-shadow-dim rounded-md overflow-hidden relative">
            <div className="onsale-products h-full pt-12 pl-5">
              <h5 className="text-sm uppercase font-normal ">15% off</h5>
              <h3 className="text-xl capitalize font-medium text-white my-2" >Home Bed</h3>
              <h5 className="text-sm font-normal pr-20">From $399 or $16.73/mo for 24 mo.*</h5>
              <img className="h-72 absolute" src="https://www.freeiconspng.com/thumbs/model-png/model-png-5-by-hotnesskidukan-on-deviantart-1.png" alt="bed png" />
            </div>
          </div>
          {products && products?.filter((elem) => elem.tags === "popular")?.slice(0, 4)?.map((elem) => {
            return <ProductCard key={elem._id} id={elem._id} title={elem.title} brand={elem.brand} description={elem.description} price={elem.price} color={elem?.color} images={elem.images} rating={elem.totalrating} />
          })
          }

        </div>
      </Container>
      <Container class1="featured-wrapper  py-5">
        <h4 className=" bg-white  mb-5 text-2xl font-medium p-5 box-shadow-dim">Featured Collection</h4>
        <div className="blog-wrapper  grid grid-cols-12 gap-5 overflow-y-hidden">
          {products && products?.filter((elem) => elem.tags === "featured")?.slice(0, 6)?.map((elem) => {
            return <ProductCard key={elem._id} id={elem._id} title={elem.title} brand={elem.brand} description={elem.description} color={elem?.color} price={elem.price} images={elem.images} rating={elem.totalrating} />
          })
          }

        </div>
      </Container>

      {/* <Container class1="special-product-card-wrapper py-5">
        <div className="grid grid-cols-12 gap-2">
          {products && products?.slice(3, 7)?.map((elem) => {
            return <FeatureProductCard key={elem._id} title={elem.title} images={elem.images} brand={elem.brand} description={elem.description} />
          })
          }
        </div>
      </Container> */}

      <Container class1="blog-wrapper py-5">
        <h4 className=" bg-white mb-5 text-2xl font-medium p-5 box-shadow-dim">Our Latest Blogs</h4>
        <div className="blog-wrapper grid grid-cols-12 gap-2 ">
          {blogs && blogs?.slice(0, 4).map((elem) => {
            return <BlogCard key={elem._id} id={elem._id} title={elem.title} desc={elem.description} date={elem.createdAt} img={elem.images} />
          })}

        </div>
      </Container>
      </>
      }

    </>
  )
}

export default Home
