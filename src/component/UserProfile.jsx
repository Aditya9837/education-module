import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './Style.css'; // Import CSS file for styling
import { FaUserPlus,  } from 'react-icons/fa'; // Import the add icon from react-icons/fa
import axios from 'axios';
import user from './image/user.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Dashboard(props) {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch user data from API endpoint
        fetch('https://skystarter.pythonanywhere.com/api/user/dashboard/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json',
                // Add any necessary authentication headers if required
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUserData(data);
            })
            .catch(error => {
                console.log(error)
            });
    }, []);
    const handleFileSelectorClick = () => {
        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.click(); // Simulate click on the hidden file input
        }
    };

    const handleFileInputChange = async (event) => {
        const formdata = new FormData();
        const file = event.target.files[0];
        const fileSizeInKB = file.size / 1024; // Convert file size to KB

        if (fileSizeInKB > 200) {
            alert('Please select an image with a file size less than 200 KB.');
            event.target.value = null; // Reset the file input
            return;
        }

        formdata.append('dp', file);

        try {
            await axios.patch('https://skystarter.pythonanywhere.com/api/user/updatedp/', formdata, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                    "Content-Type": 'multipart/form-data',
                }
            }).then(response => {

            });

            // Update user data or refresh page if needed
        } catch (error) {
            console.error('Error updating profile picture:', error);
        }
    };

    if (!userData) {
        return <div className="loading dashboard-container">Loading...</div>;
    }
    const handleCourse = (data) => {
        if (Cookies.get('isLoggedin') === 'true') {
          navigate('/enrolled', { state: { 'data': data } });
        } else {
          navigate('/signin');
        }
      };

    return (
        <div className="dashboard-container">
            {<div >{props.cross}</div>}
            <div className='user-profile'>
                <div className='user_profile-left'>
                    <div><h3>{userData.username}</h3></div>
                    <div><i className="ri-mail-line"></i>&nbsp;{userData.email}</div>

                </div>
                <div className="user_profile-right">
                    {
                        userData.dp!==null?  <img src={'https://skystarter.pythonanywhere.com'+userData.dp} alt='userdp' ></img>:
                        <img src={user} alt='user-dp'></img>
                    }
                    {/* Hidden file input */}
                    <input
                        type='file'
                        id='file-input'
                        style={{ display: 'none' }}
                        onChange={handleFileInputChange}
                    />
                    {/* FaUserPlus icon as trigger */}
                    <FaUserPlus
                        className='FaUserPlus'
                        onClick={handleFileSelectorClick}
                    />

                </div>

            </div>
            <hr></hr>
            <h5>Enrolled Courses</h5>
            {
                userData.enrolled_courses.length > 0 ? userData.enrolled_courses.map(data => {
                    return (
                        <>
                          <p> <i class="ri-arrow-right-double-fill"></i>&nbsp; <button className='course-button' onClick={()=>handleCourse(data.course)}>{data.course.course_title}</button></p>
                        </>
                    )
                }) : <p>No Enrolled Courses&nbsp;<Link to='/courses'>Enroll Now</Link></p>
            }
            <hr></hr>
            <h5>Completed Courses</h5>
            {
                userData.completed_courses.length > 0 ? userData.completed_courses.map(data => {
                    return (
                        <>
                            <p><i class="ri-arrow-right-double-fill"></i>&nbsp;{data.course.course_title}</p>
                        </>
                    )
                }) : <><p>No yet</p></>
            }

            <hr />
        <button className='btn btn-warning'  onClick={() => {
                                    Cookies.set('isLoggedin', 'false')
                                    Cookies.set('token', null)
                                    Cookies.set('userEmail', null)
                                    Cookies.set('userName', null)
                                    navigate('/signin')
                                }}>Sign Out</button>
        </div>
    );
}

export default Dashboard;

