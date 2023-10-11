import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { userTokenContext } from '../../Context/UserToken';
import { UserProfileContext } from '../../Context/UserProfileContext';


export default function Signin() {

let {setUserData}=useContext(UserProfileContext)
let {setToken}=  useContext(userTokenContext);

  let [errorMessage,setError]=useState(null);
  let [isLoading,setLoading]=useState(false);
  let navigate=useNavigate()
  let validateSchema = Yup.object({

    email:Yup.string().email('is invalid email').required('Email is required'),
 
    password:Yup.string().matches(/^[A-Z][a-z0-9]{6,15}$/,'invalid password').required('password is required'),
  
  })
  
  
    async function signIn(values){
      
      setLoading(true)
     let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch((error)=>{
  
      setError(error.response.data.message)
      setLoading(false); 
     })
     
     if(response.data.message)
     {
      setLoading(false);

     }
     if(response.data.message=='success')
     {
      navigate('/home');
      localStorage.setItem('userToken',response.data.token);
      setToken(localStorage.getItem('userToken'))
      setUserData(response.data.user)      
     }
     
    }
  
    let formik= useFormik({
      initialValues:{
      
        email:'',
        password:'',

      },validationSchema:validateSchema,
      onSubmit:signIn
    })
  
    return (
      <div className='w-75 m-auto'>
        
        {errorMessage?   <p className='alert bg-danger p-3 my-2'>{errorMessage}</p>:''}
     
        <form onSubmit={formik.handleSubmit} >
       
          <div className='mb-3'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email'onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} id="email" className='form-control'/>
            {formik.errors.email && formik.touched.email?<div className='alert bg-danger mt-2'>{formik.errors.email}</div>:''}
          </div>
        
          <div className='mb-3'>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' value={formik.values.password} onBlur={formik.handleBlur}  onChange={formik.handleChange} id="password" className='form-control'/>
            {formik.errors.password && formik.touched.password?<div className='alert bg-danger mt-2'>{formik.errors.password}</div>:''}
          </div>
       

          {
          isLoading? <button className='btn bg-main text-light d-block ms-auto'><i className='fa-solid fa-spinner fa-spin'></i></button>:
       <>
         <button type='submit'disabled={(!formik.isValid || !formik.dirty)} className='btn bg-main text-light float-end' >Login</button>
          <Link style={{textDecoration: 'none'}} to='/register'><span className='text-main'> Go To Register now...</span></Link>
          <br />
          <Link style={{textDecoration: 'none'}} to='/ForgotPassword'><span className='text-main'>ForgotPassword...</span></Link> 
       </>
        
       }
         
         
        </form>
      </div>
    )
}
