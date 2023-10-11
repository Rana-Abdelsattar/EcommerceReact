import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";
export default function CategorySlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3
      };

function getCategorySilder()
{
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}
let {data}=useQuery('CategorySlider',getCategorySilder)

  return (
    <>
   {data?.data.data? 
    
    <Slider className='my-5' {...settings}>
    {data?.data.data.map((category)=>{
        return    <img src={category.image} key={category._id} alt={data?.data.data.title} height={200}/>
     
    })}

 

  </Slider>
    :''}
   </>
  )
}
