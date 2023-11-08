import React from 'react'

const Color = ({color, setCartColor}) => {
    return (
        <>
            <span className="product-desc">
                <ul className="product-color flex gap-1">
                {color && color?.map((item)=>{
                   return item &&  item?.map((elem, index)=>{
                            return  <button onClick={()=> setCartColor(elem && elem)} key={index} style={{"background" : `${elem && elem}`}} className='h-4 w-4 rounded-full border-2 border-gray-400'></button>

                    })
                })
                }
                   
                </ul>
            </span>
        </>
    )
}

export default Color
