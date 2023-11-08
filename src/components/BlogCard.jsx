import React from 'react';
import {Link} from 'react-router-dom';
import parse from 'html-react-parser';

const BlogCard = (props) => {
  const {title, desc, date, img, id} = props;
  return (
    <div  className="bg-white col-span-3 rounded-md overflow-hidden box-shadow-dim relative">
        <div className="blog ">
          <div className="blog-image h-52 overflow-hidden flex items-center justify-center">
         <img src={img[0].url} alt="blog image" />
         </div>
          <div className="blog-content p-2 mb-8">
            <p className="date text-sm uppercase font-normal p-0">{date? new Date(date).toLocaleDateString() : ''}</p>
            <h5 className="title text-xl font-bold mb-2">{title && title?.length >=40 ? title?.substring(0, 40) + '...' : title }</h5>
            <div className="card-text text-md font-normal mb-3">{desc ? parse(desc) : ''}</div>
           
            <Link to={location.pathname === "/blog" ? `${id}` : `blog/${id}`} className="bg-slate-800 absolute bottom-2 left-2 text-white font-medium py-2 px-3 rounded-full hover:bg-orange-500 dark:hover:bg-orange-600">Read More</Link>
          </div>
        </div>
    </div>
  )
}

export default BlogCard
