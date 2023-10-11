import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import {Helmet} from "react-helmet";
import { cartContext } from '../../Context/CartContext.js';
import toast from 'react-hot-toast';



export default function Details() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
let {id}= useParams();

function getdetailsData(id)
{
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}
let {data}=useQuery('detailsData',()=>getdetailsData(id))
// let productDetails=data?.data.data;



//=============add to cart
let {addToCart,setNumbrtOfItem}= useContext(cartContext)

 async function addProductToCart(productId)
{
   let response= await addToCart(productId)
   if(response.data.status=='success')
   {
    toast.success('product added successflly',{
      duration: 5000,
    })
    setNumbrtOfItem()
   }else{
    toast('Error in adding product')
   }
}

  return (
    <div>
      {data?.data.data?
         <div className="row align-items-center p-5">
         <div className="col-md-4">
         <Slider {...settings}>
         {data?.data.data.images.map((image,index)=>{
          return <img src={image} key={index} alt={data?.data.data.title} />
         })}
    </Slider>

         </div>

         <Helmet>
                <meta charSet="utf-8" />
                <title>{data?.data.data.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
       <div className="col-md-8 p-5 ">
        <h4>{data?.data.data.title}</h4>
        <p>{data?.data.data.description}</p>
        <h6 className='text-main'>{data?.data.data.category.name}</h6>
        <h6  className='text-main'>Price: {data?.data.data.price} EGP</h6>

        <div className='d-flex justify-content-between'>
        <span>RatingsQuantity: {data?.data.data.ratingsQuantity}</span>
          <span><i className='fas fa-star rating-color'></i> {data?.data.data.ratingsAverage}</span>
         
        </div>
        <button onClick={()=>addProductToCart(id)} className='btn bg-main mt-2 w-100'>Add To Cart</button>
       </div>

       </div>

      
      : ''}
   
    </div>
  )
}
