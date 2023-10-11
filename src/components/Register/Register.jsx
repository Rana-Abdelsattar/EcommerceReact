import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {
let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
let [errorMessage,setError]=useState(null);
let [isLoading,setLoading]=useState(false);
let navigate=useNavigate()
let validateSchema = Yup.object({
  name:Yup.string().min(3,'min length is 3').max(16,'Max length is 16').required('name is required'),
  email:Yup.string().email('is invalid email').required('Email is required'),
  phone:Yup.string().matches(phoneRegExp,'invalid phone number').required('phone is required'),
  password:Yup.string().matches(/^[A-Z][a-z0-9]{6,15}$/,'invalid password').required('password is required'),
  rePassword:Yup.string().oneOf([Yup.ref('password')],'repassword must be same as password').required('repassword is required')
})


  async function signUp(values){
    setLoading(true)
   let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((error)=>{

    setError(error.response.data.message)
    setLoading(false); 
   })
   console.log(response);
   if(response.data.message)
   {
    setLoading(false);
   }
   if(response.data.message=='success')
   {
    navigate('/Signin');
   }
   
  }

  let formik= useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },validationSchema:validateSchema,
    onSubmit:signUp
  })

  return (
    <div className='w-75 m-auto'>
      <h2 className='text-main mb-3 fw-bold'>Register Form</h2>
      {errorMessage?   <p className='alert bg-danger p-3 my-2'>{errorMessage}</p>:''}
   
      <form onSubmit={formik.handleSubmit} >
        <div className='mb-3'>
          <label htmlFor="name">Name</label>
          <input type="text" name='name' value={formik.values.name} onBlur={formik.handleBlur}  onChange={formik.handleChange} id="name" className='form-control'/>
          {formik.errors.name && formik.touched.name?<div className='alert bg-danger mt-2'>{formik.errors.name}</div>:''}
     
        </div>
        <div className='mb-3'>
          <label htmlFor="email">Email</label>
          <input type="email" name='email'onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} id="email" className='form-control'/>
          {formik.errors.email && formik.touched.email?<div className='alert bg-danger mt-2'>{formik.errors.email}</div>:''}
        </div>
        <div className='mb-3'>
          <label htmlFor="phone">Phone</label>
          <input type="tel" name='phone' value={formik.values.phone} onBlur={formik.handleBlur}  onChange={formik.handleChange} id="phone" className='form-control'/>
          {formik.errors.phone && formik.touched.phone?<div className='alert bg-danger mt-2'>{formik.errors.phone}</div>:''}
        </div>
        <div className='mb-3'>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' value={formik.values.password} onBlur={formik.handleBlur}  onChange={formik.handleChange} id="password" className='form-control'/>
          {formik.errors.password && formik.touched.password?<div className='alert bg-danger mt-2'>{formik.errors.password}</div>:''}
        </div>
        <div className='mb-3'>
          <label htmlFor="rePassword">RePassword</label>
          <input type="password" name='rePassword' value={formik.values.rePassword} onBlur={formik.handleBlur}  onChange={formik.handleChange} id="rePassword" className='form-control'/>
          {formik.errors.rePassword && formik.touched.rePassword?<div className='alert bg-danger mt-2'>{formik.errors.rePassword}</div>:''}
        </div>

        {
        isLoading? <button className='btn bg-main text-light d-block ms-auto'><i className='fa-solid fa-spinner fa-spin'></i></button>:
         <button type='submit'disabled={(!formik.isValid || !formik.dirty)} className='btn bg-main text-light float-end' >Register</button>
        }
       
       
      </form>
    </div>
  )
}
