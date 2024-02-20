// ContactPage.js

import React, { useState } from 'react';
import  './Style.css'; // Import your CSS file for styling
import logo from './image/logo.png'
import { Link } from 'react-router-dom';
import axios from 'axios';

function ContactPage() {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [message,setMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset errors
        setEmailError('');
        setErrorMessage('');

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email address');
            return;
        }
        const formData=new FormData()
        formData.append('name',name)
        formData.append('email',email)
        formData.append('message',message)
        await axios.post('https://skystarter.pythonanywhere.com/api/contact-us/contact/',formData,
        {
            headers:{
                "Content-Type":'multipart/formdata'
            }
        }).then(response=>{
            if(response.status === 200){
                setErrorMessage('Your message sent to our team. We will contact you soon.')
                setName('')
                setEmail('')
                setMessage('')
            }
        }).catch(error=>console.log(error.response.data))
    }
    return (
        <div className="whole-form-container">
            <div className="animation-container">
                {/* Add your animation or image card here */}

                <div className="animation">
                    <img src={logo} alt='logo' />
                </div>
            </div>
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h1 className="form-title">Contact Us</h1>
                    <div className="form-group">
                        <label htmlFor='name'>Name:</label>
                        <input type="text" required value={name} className="form-control" name="name" id="name" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} />


                    </div>
                    <div className="form-group">
                        <label htmlFor='email'>Email:</label>
                        <input type="email" value={email} required className="form-control" name="email" id="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} />
                        {emailError && <p className="error">{emailError}</p>}

                    </div>
                    <div className="form-group">
                        <label htmlFor='message'>Message:</label>
                        <input type="text" required value={message} name="message" className="form-control" id="message" placeholder="Enter your message" onChange={(e)=>setMessage(e.target.value)} />


                    </div>
                    <input type="submit" className="button" value="Submit" />
                    {<p>{errorMessage}</p>}
                    <p>Your Information is secured You are safe, <Link to='/'>Home</Link></p>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;
