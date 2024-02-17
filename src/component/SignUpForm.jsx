import React, { useState } from 'react';
import './Style.css'; // Import your CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from './image/logo.png'

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const nevigate = new useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset errors
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
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

        // Validate confirm password
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        }

        // Create FormData object
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password2', confirmPassword);
        formData.append('usertype', 'student')

        axios.post('https://skystarter.pythonanywhere.com/api/user/register/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                if (response.status === 201) {
                    setErrorMessage('Registration Success');
                    nevigate('/signin');
                }
            })
            .catch(error => {
                console.log(error.response.data.errors);
                try {
                    if (error.response.data.errors['email'][0] === 'user with this email address already exists.') {
                        setErrorMessage('this user is already exists');

                    }
                }
                catch (error) {

                }


            });

    };




    return (
        <div className="whole-form-container">
            <div className="animation-container">
                {/* Add your animation or image card here */}
                
                <div className="animation">
                    <img src={logo} />
                </div>
            </div>
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h1 className="form-title">Sign Up</h1>

                    <div className="form-group">
                        <label htmlFor='name'>Name:</label>
                        <input type="text" required className="form-control" name="name" id="name" placeholder="Enter your Name" onChange={(e) => setName(e.target.value)} />

                    </div>
                    <div className="form-group">
                        <label htmlFor='email'>Email:</label>
                        <input type="email" className="form-control" name="email" id="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                        {emailError && <p className="error">{emailError}</p>}

                    </div>
                    <div className="form-group">
                        <label htmlFor='password'>Password:</label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                        {passwordError && <p className="error">{passwordError}</p>}

                    </div>
                    <div className="form-group">
                        <label htmlFor='confirm_password'>Confirm Password:</label>
                        <input type="password" name="confirm_password" className="form-control" id="confirm_password" placeholder="Enter your password" onChange={(e) => setConfirmPassword(e.target.value)} />
                        {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}

                    </div>
                    {<p className='error'>{errorMessage}</p>}
                    <input type="submit" className="button" value="SIGN UP" />
                    <p>If You don't have an account,<i className="fa fa-question"></i>  <Link to='/signin'>click here</Link></p>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;
