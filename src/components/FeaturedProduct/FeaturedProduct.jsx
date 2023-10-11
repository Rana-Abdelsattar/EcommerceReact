import axios from 'axios'
import React, {useContext} from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext.js';
import toast from 'react-hot-toast';


export default function FeaturedProduct() {
 
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
// ========================
async function getFeaturedProduct(){
   return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);

}
let {data,isLoading,refetch} =useQuery('product',getFeaturedProduct,{
 
  cacheTime:3000

})



  return (
    <>
     {/* <button onClick={()=>{refetch()}} className='btn bg-main text-light w-100'>Get Products</button> */}
   
    {isLoading ? 
    <><p className='vh-100 d-flex justify-content-center align-items-center' ><BallTriangle
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperClass={{}}
    wrapperStyle=""
    visible={true}
  /></p></>
    
    :

    <div className='row'>
     
{data?.data.data.map((product)=>{
return <>

<div key={product.id} className=" product py-3 col-md-2">
<Link   style={{textDecoration: 'none'}}  to={`/details/${product.id}`}>
  <div className=" text-center p-3" >
<img src={product.imageCover} alt={product.title} className='w-100' />
<p className='text-main'>{product.category.name}</p>
<h6 className='text-muted'>{product.title.split(' ').slice(0,2).join(' ')}</h6>

<div className='d-flex justify-content-evenly'>
  <span>{product.price} EGP</span>
  <span> <i className='fa-solid fa-star rating-color'></i> {product.ratingsAverage}</span>
</div>
<div>
 
</div>
</div>
</Link>
<button onClick={()=>addProductToCart(product.id)} className='btn bg-main text-light w-100'>Add To Cart</button>
</div>


</>
})}
</div> 
    }
</>
  
  )
}







 