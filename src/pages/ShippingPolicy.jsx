import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'

const ShippingPolicy = () => {
  return (
    <>
     <Meta title="Shipping Policy"/>
     <BreadCrumb title="Shipping Policy"/>
     <Container class1="shipping-policy-wrapper set-bg py-5">
        <div className="grid grid-cols-1">
            <div className="col-span-1 bg-white rounded-md box-shadow-dim p-4">

            </div>

        </div>
    </Container> 
    </>
  )
}

export default ShippingPolicy
