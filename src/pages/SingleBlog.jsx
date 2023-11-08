import {useEffect} from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowIcon from '../assets/down-arrow-5-svgrepo-com.svg';
import FacebookIcon from '../assets/facebook-svgrepo-com.svg';
import InstagramIcon from '../assets/instagram-167-svgrepo-com.svg';
import YoutubeIcon from '../assets/youtube-svgrepo-com.svg';
import Container from '../components/Container';
import {useDispatch, useSelector} from 'react-redux';
import {getABlog} from '../features/blog/blogSlice';
import parse from 'html-react-parser';

const SingleBlog = () => {
    const dispatch=useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const blogId = location.pathname.split('/')[2];

    useEffect(()=>{
        if(blogId !== undefined){
            dispatch(getABlog(blogId));
        }
    },[blogId])

    const getBlog = useSelector((state)=> state.blog.getBlog);
    const {title, description, images, updatedAt, author} = getBlog;


    return (
        <>
            <>
                <Meta title={title ? title : ''} />
                <BreadCrumb title={title ? title : ''}/>
                <Container class1="single-blog-page py-5">

                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-3">
                                <div className="filter-card bg-white rounded-md box-shadow-dim mb-4 p-3">
                                    <h5 className="filter-title text-xl font-medium mb-4" >Shop By Categories</h5>
                                    <ul>
                                        <li className="text-md font-normal mb-2">Home</li>
                                        <li className="text-md font-normal mb-2">Our Store</li>
                                        <li className="text-md font-normal mb-2">Blogs</li>
                                        <li className="text-md font-normal mb-2">Contacts</li>
                                    </ul>
                                </div>
                            </div>
                            <div className=" single-blog-container col-span-9  mb-4 ">
                                <h3 className='text-xl font-medium pb-2'>{title && title}</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-3 rounded-md overflow-hidden ">
                                        <div className="blog">
                                            <div className="blog-image h-64 overflow-hidden flex items-center justify-center">
                                                <img src={images && images[0]?.url} alt="blog image" />
                                            </div>
                                            <div className="blog-content p-2">

                                                <div className="card-text text-md font-medium my-3">{description && parse(description)}</div>
                                                <span className="date text-sm mr-6 uppercase font-medium p-0">{updatedAt && new Date(updatedAt)?.toLocaleString()}</span><span className="text-sm uppercase font-medium p-0">{author && author}</span>

                                            </div>
                                            <div className="blog-bottom flex items-center mt-6 justify-between p-4 box-shadow-dim">
                                                <button onClick={()=> navigate(-1)} className="prev-btn flex items-center justify-start gap-3 "><span className='flex items-center justify-center'><img src={ArrowIcon} alt=" back arrow" /></span>Back to blog</button>
                                                <div className="social-link flex items-center gap-3">
                                                    <Link to="youtube.com">
                                                        <img src={YoutubeIcon} alt="youtube icon" />
                                                    </Link>
                                                    <Link to="facebook.com">
                                                        <img src={FacebookIcon} alt="Facebook icon" />
                                                    </Link>
                                                    <Link to="instagram.com">
                                                        <img src={InstagramIcon} alt="Instagram icon" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form action="" className="blog-comment bg-white box-shadow-dim rounded-md my-6 p-3">
                                    <h3>Leave a Comment</h3>
                                    <div className="flex items-center justify-between gap-3">

                                        <input className=" text-md font-normal rounded-md p-2 w-1/2" type="text" name="name" placeholder='Name*' required />
                                        <input className=" text-md font-normal rounded-md p-2 w-1/2" type="email" name="email" placeholder='Email*' required />
                                    </div>
                                    <textarea className=" text-md font-normal rounded-md my-3 p-2 w-full" type="text" name="comment" placeholder='Comment' required />
                                    <button className="bg-slate-800 w-fit text-center my-4 text-white font-bold py-2 px-3 rounded-full hover:bg-orange-400 dark:hover:bg-orange-500">Post Comment</button>

                                </form>
                            </div>
                        </div>
                </Container>

            </>
        </>
    )
}

export default SingleBlog
