// Header.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import  './Style.css' // Import your CSS file for styling
// import logo from './image/logo.png';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Dashboard from './UserProfile';
import cart from './image/cart.png'
import { useEffect } from 'react';
function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dashboardOpen, setDashboardOpen] = useState(false)

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };
    const navigate = useNavigate()

    useEffect(
        () => {
            try {
                const downarrow=document.getElementById('down-arrow')
                const uparrow=document.getElementById('up-arrow')
                const element = document.getElementsByClassName('profile-pic')[0];
                if (dashboardOpen) {
                    element.style.color = 'rgb(212, 208, 208)';
                    element.style.backgroundColor = 'black';
                    uparrow.style.display='none'
                    downarrow.style.display='inline-block'

                }
                else {
                    element.style.color = 'rgb(79, 78, 78)';
                    element.style.backgroundColor = 'white';
                    uparrow.style.display='inline-block'
                    downarrow.style.display='none'
                }
            }
            catch (err) {

            }
        }, [dashboardOpen]
    )
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
                                        setDashboardOpen(!dashboardOpen)

                                    }}>{Cookies.get('userName').split(" ")[0]}&nbsp;<i id='down-arrow' class="ri-arrow-down-s-line"></i><i id='up-arrow' class="ri-arrow-up-s-line"></i></button>
                                </li>
                                <li><img className='cart-icon' src={cart} alt='cart-icon'></img><span className='cart-bindi'></span></li>

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
                dashboardOpen && <div className='dash-parent'>
                    <Dashboard cross={<i onClick={() => setDashboardOpen(!dashboardOpen)} class="ri-close-fill cross-right"></i>} />
                </div>
            }
        </>

    );
}

export default Header;
