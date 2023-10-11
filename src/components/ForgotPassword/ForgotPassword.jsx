import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ForgotPassword() {
    let navigate=  useNavigate();
    // ===============Forgot Password
     let validateSchema=Yup.object({
        email:Yup.string().required('email is required').email('enter valid email')
     })
   async function sendEmail(values)
    {
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
    if(data.statusMsg==='success')
    {
        document.querySelector('.forgotPassword').classList.add('d-none')
        document.querySelector('.verifyCode').classList.remove('d-none')
    }
    }
    let formik=useFormik({
        initialValues:{
            email:''
          
        },
        validationSchema:validateSchema,
        
      onSubmit:sendEmail

    })


    // =========================Verify Reset Code

    let validateSchemaForCode=Yup.object({
        resetCode:Yup.string().required('Code is required')
     })
   async function sendCode(values)
    {
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
    console.log(data)
    if(data.status=='Success')  
    {
     
      navigate("/ResetPassword")
    }     
    }
    let verifyCode=useFormik({
        initialValues:{
            resetCode:''
          
        },
        validationSchema:validateSchemaForCode,
        
      onSubmit:sendCode

    })
  return (
    <div>
       
        <form onSubmit={formik.handleSubmit} className='forgotPassword  w-75 mx-auto my-4'>
        <h3>ForgotPassword:</h3>
            <label htmlFor="email">email: </label>
            <input type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="email" className='form-control'/>
             {formik.errors.email && formik.touched.email? <p className='bg-danger my-3 text-light p-2'>{formik.errors.email}</p>:'' }
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light my-4' >Enter Your Email</button>
        </form>

       
         
        <form onSubmit={verifyCode.handleSubmit} className='verifyCode d-none w-75 mx-auto my-4'>
        <h3>Verify Code:</h3>
            <label htmlFor="resetCode">Code: </label>
            <input type="text" value={verifyCode.values.resetCode} onChange={verifyCode.handleChange} onBlur={verifyCode.handleBlur} name="resetCode" id="resetCode" className='form-control'/>
             {verifyCode.errors.resetCode && verifyCode.touched.resetCode? <p className='bg-danger my-3 text-light p-2'>{verifyCode.errors.resetCode}</p>:'' }
            <button disabled={!(verifyCode.isValid && verifyCode.dirty)} type='submit' className='btn bg-main text-light my-4' >Send Code</button>
        </form>
    </div>
  )
}
