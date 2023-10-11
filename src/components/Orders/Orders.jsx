import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React from 'react'
import { useQuery } from 'react-query';


export default function Orders() {

function getOrders()
{
    let data=jwtDecode(localStorage.getItem('userToken'))
let userId=data.id;
// console.log(userId)
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
}

let {data}=useQuery('orders',getOrders)
console.log(data)
  return (
    <div>
    <div className="row gy-4 my-5">
        {data?.data.map((item ,index)=>{
            return <div key={index} className="col-md-6 bg-light">
                <div className="item mx-4">
                   <h3 className='text-main my-3'>Payment Method:{item.paymentMethodType}</h3>
                   <h4  className='text-main my-3'>Total Price:{item.totalOrderPrice}</h4>
                    {item.cartItems.map((order,indx)=>{
                        return <div key={indx} className="row gy-4">
                            <div className="col-md-4">
                               
                                    <img src={order.product.imageCover} className='w-75' alt="" />
                                   
                            
                            </div>
                            <div className="col-md-8">
                            <h4>{order.product.category.name}</h4>
                            <h6>Count:{order.count}</h6>
                            <h6>price:{order.price}</h6>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        })}
    </div>


    </div>
  )
}
