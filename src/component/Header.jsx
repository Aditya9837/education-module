// Header.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Style from './Style.css' // Import your CSS file for styling
import logo from './image/logo.png';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Dashboard from './UserProfile';
import { useEffect } from 'react';
function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dashboardOpen, setDashboardOpen] = useState(false)

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };
    const navigate = useNavigate()
   

    useEffect(() => {
        // Trigger your event when the route changes
       setDashboardOpen(false)
    }, [navigate]); 
    return (
        <>
            <header>
                <nav>
                    <div className="logo">
                        <Link to="/"><span className='sky'>Sky</span><span className='starter'>Starter</span></Link>
                    </div>
                    <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
                        <div className="hamburger"></div>
                    </div>
                    <ul className={`nav-links ${menuOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/courses">Courses</Link></li>
                        <li><Link to="/contact">Contact</Link></li>


                        {
                            Cookies.get('isLoggedin') === 'true' && <>
                                <li>
                                    <button className='profile-pic' onClick={() => {
                                        const element = document.getElementsByClassName('profile-pic')[0];
                                        if (dashboardOpen) {
                                            element.style.color = 'black';
                                            element.style.backgroundColor = 'white';
                                            setDashboardOpen(!dashboardOpen)
                                        }
                                        else {
                                            element.style.color = 'white';
                                            element.style.backgroundColor = 'black';
                                            setDashboardOpen(!dashboardOpen)
                                        }

                                    }}>{Cookies.get('userName')[0]}</button>
                                </li>
                                <li><button className='btn btn-warning' onClick={() => {
                                    Cookies.set('isLoggedin', 'false')
                                    Cookies.set('token', null)
                                    Cookies.set('userEmail', null)
                                    Cookies.set('userName', null)
                                    navigate('/signin')
                                }}>Logout</button></li>
                            </>
                        }
                        {
                            Cookies.get('isLoggedin') !== 'true' &&

                            <>
                                <li><Link to="/signin">Sign In</Link></li>
                                <li><Link to="/signup">Sign Up</Link></li>
                            </>
                        }
                    </ul>
                </nav>
            </header>
            {
                dashboardOpen &&  <div className='dash-parent'>
                    <i onClick={()=>setDashboardOpen(!dashboardOpen)} class="ri-close-fill right "></i>
                     <Dashboard />
                </div>
            }
        </>

    );
}

export default Header;
