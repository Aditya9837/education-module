import React, { useState } from 'react';
import './Style.css'; // Import your CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './image/logo.png'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = new useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset errors
        setEmailError('');
        setPasswordError('');
        setErrorMessage('');

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email address');
            return;
        }

        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/g
        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one letter and one number');
            return;
        }

        const formData = new FormData()
        formData.append('email' , email)
        formData.append('password',password)
        formData.append('usertype','student')
        
        try{
          const response =  await axios.post('https://skystarter.pythonanywhere.com/api/user/login/',formData,{
            headers:{
                "Content-Type": 'multipart/formdata'
            }
          })
          if(response.status === 200)
          {
            console.log(response.data)
            
            Cookies.set('isLoggedin','true')
            Cookies.set('token',response.data['token']['access'])
            Cookies.set('userEmail',response.data['userEmail'])
            Cookies.set('userName',response.data['username'])
            Cookies.set('dp',response.data['dp'])
            setTimeout(()=>{
            Cookies.set('isLoggedin','false')
            Cookies.set('token',null)
            Cookies.set('userEmail',null)
            Cookies.set('userName',null)
            },86395000)
            navigate('/')
          }
          

        } catch(error) {
            console.log(error.response)
            if(error.response.data['msg'] === 'You are not autherized user' || error.response.data['msg']==='Not Autherized')
            {
                setErrorMessage('Enter valid email address and password')
            }
            else{
                console.log(error.response.data)

            }
        }
    };
    


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
                    <h1 className="form-title">Sign In</h1>
                    <div className="form-group">
                        <label htmlFor='email'>Email:</label>
                        <input type="email" className="form-control" name="email" id="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} />
                        {emailError && <p className="error">{emailError}</p>}

                    </div>
                    <div className="form-group">
                        <label htmlFor='password'>Password:</label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
                        {passwordError && <p className="error">{passwordError}</p>}

                    </div>
                    {<p className='error'>{errorMessage}</p>}
                    <input type="submit" className="button" value="Login" />
                    <p>If You don't have an account,<i className="fa fa-question"></i>  <Link to='/signup'>click here</Link></p>
                </form>
            </div>
        </div>
    );
}

export default SignInForm;
