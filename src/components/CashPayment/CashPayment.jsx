
import  { useContext } from 'react'
import { useFormik } from 'formik';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
export default function CashPayment() {
 
let {getLoggedUserCart,cashPayment,setNumbrtOfItem}=useContext(cartContext)
let navigate=useNavigate()

let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


let schemaValidate=Yup.object({
  details:Yup.string().required('details are required'),
  phone:Yup.string().matches(phoneRegExp,'invalid phone number').required('phone is required'),
  city:Yup.string().min(5,'min length is 5').max(20,'Max length is 20').required('city is required')

})

   async function AddressSubmit(values)
    {
        let {data}=await getLoggedUserCart()
        // console.log(data?.data)
        let response=await cashPayment(data?.data._id,values);
    //    console.log(response)
       navigate('/allorders')
       setNumbrtOfItem()
    //    if(response?.status==='success')
    //    {
    //     toast.success('Data confirmed')
    //     navigate('/allorders')
    //    }
    }

let formik =useFormik({
 initialValues:{
     details: " ",
    phone: " ",
    city: " "
 },
 validationSchema:schemaValidate
 ,
 onSubmit:AddressSubmit
})



  return (
    <div>
       
       <form onSubmit={formik.handleSubmit} className='w-75 m-auto my-5'>
       <label htmlFor="details">details:</label>
       <input className='form-control' type="text" id="details" onChange={formik.handleChange} onBlur={formik.handleBlur} name="details" value={formik.values.details} />
       {formik.errors.details && formik.touched.details?<div className='alert bg-danger mt-2'>{formik.errors.details}</div>:''}

       <label htmlFor="phone">phone:</label>
       <input className='form-control' type="tel" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" value={formik.values.phone} />
       {formik.errors.phone && formik.touched.phone?<div className='alert bg-danger mt-2'>{formik.errors.phone}</div>:''}

       <label htmlFor="city">city:</label>
       <input className='form-control' type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="city" value={formik.values.city}/>
       {formik.errors.city && formik.touched.city?<div className='alert bg-danger mt-2'>{formik.errors.city}</div>:''}
      
       <button type='submit' onClick={()=>AddressSubmit()} className='btn bg-main text-light mt-3' >Confirm Data</button>
       </form>


    </div>
  )
}
