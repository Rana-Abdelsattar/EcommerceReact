import React from 'react'
import Slider from "react-slick";
import slide1 from '../../assets/images/images (1).jfif'
import slide2 from '../../assets/images/images (2).jfif'
import slide3 from '../../assets/images/images (3).jfif'
import image1 from '../../assets/images/images (4).jfif'
import image2 from '../../assets/images/images (5).jfif'

export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
<div className="row mt-5 gx-0">
    <div className="col-md-9">
        
    <Slider {...settings}>
     
     <img height={300}  className='w-100'  src={slide3} alt="image1" />
     <img height={300}  className='w-100'  src={slide2} alt="image2" />
     <img height={300}  className='w-100'  src={slide1} alt="image1" />


</Slider>

    </div>
    <div className="col-md-3">
    <img height={150}  className='w-100'  src={image1} alt="image4" />
     <img height={150}  className='w-100'  src={image2} alt="image5" />
    </div>
</div>

  )
}
