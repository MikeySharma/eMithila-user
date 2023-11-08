import React from 'react'
import {Link} from 'react-router-dom';
const BreadCrumb = ({title}) => {
  return (
    <div className="container mx-auto bg-white py-5">
        <p className="text-md text-center font-medium"><Link to="/">Home</Link> / {title} </p>
      
    </div>
  )
}

export default BreadCrumb
