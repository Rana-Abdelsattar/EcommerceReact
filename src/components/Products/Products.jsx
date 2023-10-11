import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Products() {
  let [products,setProducts]=useState([])
 
async function getProducts()
{
 let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
setProducts(data?.data)

}
async function search()
{
  let searchedArray=[];
  let searchValue=document.getElementById('searchInput').value;
  for(let i=0 ;i<products.length;i++)
  {
    if(products[i].title.toLowerCase().includes(searchValue.toLowerCase())===true)
    {
     searchedArray.push(products[i])
     setProducts(searchedArray)

    }    
  }
  if(!searchValue)
  {
    searchedArray=[];
   await getProducts()
    return;

  }

}

useEffect(()=>{
       getProducts()

},[])

  return (
    
    <>

    <input type="text" id="searchInput" onInput={()=>{search()}} placeholder='search by name' className='w-75 m-auto form-control my-5' />
    {products.length<1 ? 
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
       
  {products.map((product)=>{
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
  
  </div>
  
  
  </>
  })}
  </div> 
      }
  </>)
}
