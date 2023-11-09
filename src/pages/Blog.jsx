import {useEffect} from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import BlogCard from '../components/BlogCard'
import  Container  from '../components/Container'
import {useDispatch, useSelector} from 'react-redux';
import {getBlogs} from '../features/blog/blogSlice';

const Blog = () => {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getBlogs());
    },[])

  const blogs = useSelector((state)=> state.blog.blogs);

    return (
        <>
            <Meta title="Blog" />
            <BreadCrumb title="Blog" />
            <Container class1="blog-page py-5">

                    <div className="grid grid-cols-12 gap-4">
                        <div className="filter-card col-span-3">
                            <div className=" bg-white rounded-md box-shadow-dim mb-4 p-3">
                                <h5 className="filter-title text-xl font-medium mb-4" >Shop By Categories</h5>
                                <ul>
                                    <li className="text-md font-normal mb-2">Home</li>
                                    <li className="text-md font-normal mb-2">Our Store</li>
                                    <li className="text-md font-normal mb-2">Blogs</li>
                                    <li className="text-md font-normal mb-2">Contacts</li>
                                </ul>
                            </div>
                        </div>
                        <div className=" blog-container col-span-9 bg-white rounded-md box-shadow-dim mb-4 p-3">
                            <div className="grid grid-cols-6 gap-4">  
                        {blogs && blogs.slice(0, 4).map((elem)=>{
                            return <BlogCard key={elem._id} id ={elem._id} title={elem.title} desc={elem.description} date={elem.createdAt} img={elem.images} />
                        })}
                            </div>
                        </div>
                    </div>

            </Container>

        </>
    )
}

export default Blog
