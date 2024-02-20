import React, { useState } from 'react';
import Style from './Style.css'; // Assuming you have your CSS styles defined in PaymentPage.css
import axios from 'axios';

import img from './image/logo.png'
import {useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

function Enrolled() {
     const nevigate = useNavigate()


     if(Cookies.get('isLoggedin')!=='true'){
        nevigate('/signin')
        
    }
    const location=useLocation()
    const {data}=location.state
    const [message,setMessage]=useState()
   
   
                  
           
    
   
    return (
       <>
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
            </div>
         </div>
       </>
    );
}

export default Enrolled;
