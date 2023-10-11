import React, { useContext } from 'react'

import jwtDecode from 'jwt-decode';
import { UserProfileContext } from '../../Context/UserProfileContext';

export default function () {
let {userData}=useContext(UserProfileContext)

    //------- get data from token by jwtDEcode Library 
    let encodedToken=localStorage.getItem('userToken');
    let decodedToken=jwtDecode(encodedToken);
  return (
    <div className='bg-light w-50 m-auto mt-5'>

         {/* //------- get data from token by jwtDEcode Library */}
          <h2 className='my-3'>Hello: {decodedToken.name}</h2>
          

         
        {/* <h2 className='my-3'>Hello: {userData?.name}</h2>
        <h2>Email: {userData?.email}</h2> */}
    </div>
  )
}
