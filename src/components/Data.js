import shippingIcon from '../assets/shipping-fast-solid-svgrepo-com.svg';
import supportIcon from '../assets/support-svgrepo-com.svg';
import giftIcon from '../assets/gift-svgrepo-com.svg';
import discountIcon from '../assets/discount-svgrepo-com.svg';
import cardIcon from '../assets/card-svgrepo-com.svg';

export const spanStyle = {
    position: "absolute",
    top: "10%",
    left: "3%",
    padding: '20px',
    background: 'transparent',
    color: '#000000'
  }
export const divStyle = {
    position: "relative",
    backgroundSize: 'cover',
    height: '420px',
    width: 'inherit'
  }
 export const slideImages = [
    {
      url: 'https://res.cloudinary.com/dhahoaofu/image/upload/v1699415216/czxzpiotzwuxcpkwqics.jpg',
      caption: '<h5 className="text-orange-400 tracking-wide text-md font-medium uppercase mb-6">Supercharged for pros</h5>  <h4 className="tracking-wide text-3xl font-medium uppercase">iPad S13+ Pro</h4> <p className="text-black text-sm font-medium tracking-wide mt-2">From $999.00 or $41.62/mo.</p><button class="bg-slate-800 mt-5 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-500 dark:hover:bg-orange-600">Buy Now</button>'
    },
    {
      url: 'https://res.cloudinary.com/dhahoaofu/image/upload/v1699415217/zwmxe1uoglps3gonv3dr.webp',
      caption: '<h5 className="text-orange-400 tracking-wide text-md font-medium uppercase mb-6">Supercharged for pros</h5>  <h4 className="tracking-wide text-3xl font-medium uppercase">iPad S13+ Pro</h4> <p className="text-black text-sm font-medium tracking-wide mt-2">From $999.00 or $41.62/mo.</p><button class="bg-slate-800 mt-5 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-500 dark:hover:bg-orange-600">Buy Now</button>'
    },
  
  ];

export const Services = [
    {
        "title": "Free Shipping",
        "tagline": "From all Orders from $100",
        "image": shippingIcon,

    },
    {
        "title": "Daily Offers",
        "tagline": "Save upto 25% off",
        "image": giftIcon,
    },
    {
     
        "title": "Support 24/7",
        "tagline": "Shop with an expert",
        "image": supportIcon,   
    },
    {
     
        "title": "Affordable Price",
        "tagline": "Get Factory direct price",
        "image": discountIcon,   
    },
    {
     
        "title": "Secure Payments",
        "tagline": "100% Protected Payments",
        "image": cardIcon,   
    },

]

export   const copyToClipboard =  (TextToCopy) => {
    const TempText = document.createElement("input");
    TempText.value = TextToCopy;
    document.body.appendChild(TempText);
    TempText.select();
    
    document.execCommand("copy");
    document.body.removeChild(TempText);
    const copyLink = document.getElementById('copylink');
    copyLink.classList.toggle('hidden');
    setTimeout(() => {
        copyLink.classList.toggle('hidden');
    }, 400);

}