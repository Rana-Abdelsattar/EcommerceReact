import axios from "axios";
import { createContext, useState } from "react";

 export let cartContext = createContext();

 let headers={
    token:localStorage.getItem('userToken')
 }



 function addToCart(id)
{
   return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        productId: id
    },
    {

     headers:headers
    }).then((response)=>response)
    .catch((error)=>error)

}

function getLoggedUserCart(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        headers:headers
    }).then((response)=>response)
    .catch((error)=>error)
}

function  UpdateCartProductQuantity(productId,count)
{
 return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
  {
    count:count
  }
  ,{
    headers:headers
  }).then((response)=>response)
  .catch((error)=>error)
}
function  onlinePayment(cartId,url,value)
{
 return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
  {
    shippingAddress:value
  }
  ,{
    headers:headers
  }).then((response)=>response)
  .catch((error)=>error)
}

function cashPayment(cartId,value)
{
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
  
    {
      shippingAddress:value
    }
    ,{
      headers:headers
    }).then((response)=>response)
    .catch((error)=>error)
  
}

function removeItem(productId)
{
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
        headers:headers
    }).then((response)=>response)
    .catch((error)=>error)
}
function clearCart()
{
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        headers:headers
    }).then((response)=>response)
    .catch((error)=>error)
}
export default function CartContextProvider(props)
{
  let[numberOfItemInCart,setNumberOfItems]=useState(0)
  async function setNumbrtOfItem()
{
  let { data } =await getLoggedUserCart();
  setNumberOfItems(data?.numOfCartItems)
  // console.log(data?.numOfCartItems)
}
  return <cartContext.Provider value={{numberOfItemInCart,setNumbrtOfItem,addToCart,getLoggedUserCart,UpdateCartProductQuantity,removeItem,clearCart,onlinePayment,cashPayment}}>
    {props.children}
  </cartContext.Provider>
}