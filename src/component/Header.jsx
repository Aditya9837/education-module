// Header.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Style from './Style.css' // Import your CSS file for styling
import logo from './image/logo.png';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };
    const navigate=useNavigate()
    return (
        <header>
            <nav>
                <div className="logo">
                    <Link  to="/"><span className='sky'>Sky</span><span className='starter'>Starter</span></Link>
                </div>
                <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
                    <div className="hamburger"></div>
                </div>
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/contact">Contact</Link></li>


                    {
                        Cookies.get('isLoggedin') === 'true' && <>
                        <li><Link to="">{Cookies.get('userName')}</Link></li>
                        <li><button className='btn btn-warning' onClick={()=>{
                            Cookies.set('isLoggedin','false')
                            Cookies.set('token',null)
                            Cookies.set('userEmail',null)
                            Cookies.set('userName',null)
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
    );
}

export default Header;
