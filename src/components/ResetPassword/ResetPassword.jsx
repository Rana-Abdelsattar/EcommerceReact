import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ResetPassword() {
let navigate = useNavigate();
let validateSchema=Yup.object({
    email:Yup.string().required('Email is required').email('Enter valid email'),
    newPassword:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,15}$/,'invalid password')
})
   async function resetPassword(value){
    let {data} =  await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,value)
    if(data.token)
    {
navigate('/signin')
    }
    }
    let formik=useFormik({
        initialValues:{
            email:'',
            newPassword:''
        },
        validationSchema:validateSchema,
        onSubmit:resetPassword
    })
  return (
    <div>
        <form onSubmit={formik.handleSubmit} className='w-75 mx-auto my-5'>
            <label htmlFor="email">Your Email:</label>
            <input type="text" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} id="email" name="email" className='form-control mb-4' />
             {formik.touched.email && formik.errors.email? <p className='bg-danger mt-1 p-2 text-light'>{formik.errors.email}</p>:'' }


            <label htmlFor="newPassword">New Password:</label>
            <input type="password" value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} id="newPassword" name="newPassword" className='form-control' />
            {formik.touched.newPassword && formik.errors.newPassword? <p className='bg-danger mt-1 p-2 text-light'>{formik.errors.newPassword}</p>:'' }
             <button className='btn bg-main my-5 text-light' type="submit" disabled={!(formik.isValid && formik.dirty)}>Reset Password</button>
        </form>
    </div>
  )
}
