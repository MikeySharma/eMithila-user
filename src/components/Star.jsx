import React from 'react';
import staroutline from '../assets/star-outline-svgrepo-com.svg';
import solidStar from '../assets/star-svgrepo-com.svg';
import halfSolidStar from '../assets/half-solid-star-svgrepo-com.svg';
const Star = ({stars}) => {
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let numbers = index + 0.5;
        return (
            <span key={index}>
                {stars >= index + 1? (<img className='h-4' src={solidStar} alt="full star" />) : stars >= numbers? (<img style={{height: "1.35rem"}} src={halfSolidStar} alt="half filled star" />) : (<img className='h-4' src={staroutline} alt="outline star" />)}
            </span>
        )
    })
    return (
        <div className='flex items-center justify-start my-3'>
            {ratingStar}
        </div>
    )
}

export default Star
