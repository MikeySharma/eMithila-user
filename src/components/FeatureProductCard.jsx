import React from 'react'
import parse from 'html-react-parser';

const FeatureProductCard = (props) => {
  const {title, brand, description, images} = props;
  return (
    <div className="col-span-3 box-shadow-dim rounded-md  overflow-hidden">
    <div style={{backgroundImage: `url(${images[0]?.url})`, transition: ".3s"}} className="special-onsale-products bg-contain  bg-center h-96 pt-12 pl-5">
      <h5 className="text-sm uppercase text-black font-medium ">{brand && brand}</h5>
      <h3 className="text-2xl capitalize font-bold  text-black my-2" >{title && title?.substring(0,40)}...</h3>
      <h5 className="text-sm font-medium text-black pr-20">{description && description?.substring(0,40)?.replace('<p>', '')}...</h5>
    </div>
  </div>
  )
}

export default FeatureProductCard
