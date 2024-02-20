import React, { useState } from 'react';
import Style from './Style.css'; // Assuming you have your CSS styles defined in PaymentPage.css
import useRazorpay from 'react-razorpay';
import axios from 'axios';

import img from './image/logo.png'
import {useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

function PaymentPage() {
     const nevigate = useNavigate()


     if(Cookies.get('isLoggedin')!=='true'){
        nevigate('/signin')
        
    }
    const location=useLocation()
    const {data}=location.state
    const [Razorpay] = useRazorpay();
    const [message,setMessage]=useState()
   
   async function createOrder(params){
             const formdata = new FormData()
             formdata.append('price',data.price)
             formdata.append('course_id',data.id)
             let response
            await axios.post('https://skystarter.pythonanywhere.com/enroll/create_order/',formdata,{
                    headers:{
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                        "Content-Type":'multipart/formdata'
                    }
                  }).then(
                    respons=>{
                      console.log(respons)
                       response=respons
                    }
                  ).catch(error=>{
                    
                    console.log(error.response)
                  })
            return response
                  
           
    }
    const handlePayment = async (params) => {
      if(Cookies.get('isLoggedin')!=='true')
      {
        nevigate('/signin')
      }
    const order = await createOrder(params); //  Create order on your backend
    console.log(order)
    if(order==undefined){
       setMessage('Already Enrolled')
    }
      else{
        const options = {
          key: "rzp_live_uFrztfv4LkN7Q1", // Enter the Key ID generated from the Dashboard
          amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "SkyStarter.life",
          description: "Test Transaction",
          image: img,
          order_id: order.data['order_id'], //This is a sample Order ID. Pass the id obtained in the response of createOrder().
          handler: async function (response) {
             const formdata =new FormData()
             formdata.append('course_id',data.id)
            await axios.post('https://skystarter.pythonanywhere.com/enroll/enroll_now/',formdata,{
              headers:{
                  'Authorization': `Bearer ${Cookies.get('token')}`,
                  "Content-Type":'multipart/formdata'
              }
             }).then(resp=>{
              nevigate('/congrates',{state:{'data':response.razorpay_payment_id,'course_name':data.course_title}} )
              console.log(resp.data)
             }).catch(err=>{
              console.log(err.response.data.errors)
             })
          //   alert(response.razorpay_payment_id);
  
          },
          prefill: {
          
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#a7e3f5",
          },
        };
      
        const rzp1 = new Razorpay(options);
      
        rzp1.on("payment.failed", function (response) {
          alert(response.error.description);
        });
      
        rzp1.open();
      }
    };
    return (
       <>
      {message}
         <div id="course-details-container">
            <div id="course-detail">
                <div id="course-image">
                    <img src={'https://skystarter.pythonanywhere.com/'+data.course_img} alt="" />
                </div>
                <div id="course-title">
                   <h1>{data.course_title}</h1>
                </div>
                <div id="course-desc">
                    <p>{data.course_desc}</p>
                </div>
                <span>{data.course_duration}</span><span>{data.price}</span>
                
               <button className='button' onClick={handlePayment}>PayNow</button><br/>
               <button className='button' >Add To Cart</button>
            </div>

         </div>
       </>
    );
}

export default PaymentPage;
