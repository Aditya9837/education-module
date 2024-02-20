import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  './Style.css'; // Import CSS file for styling
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledcourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch enrolled courses
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get('http://skystarter.pythonanywhere.com/enroll/enroll_now/', {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        });
        if (response.status === 200) {
          setEnrolledCourses(response.data);
        }
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    // Fetch courses
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://skystarter.pythonanywhere.com/education/course/');
        if (response.status === 200) {
          setCourses(response.data['data']);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    // Fetch both enrolled courses and all courses
    Promise.all([fetchEnrolledCourses(), fetchCourses()])
      .then(() => setIsLoading(false))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handlePayment = course => {
    if (Cookies.get('isLoggedin') === 'true') {
      navigate('/payment', { state: { 'data': course } });
    } else {
      navigate('/signin');
    }
  };

  return (
    <section id="courses" className="courses">
      <div className="course-container">
        {Cookies.get('isLoggedin') !== 'true' ? <></> : <>
          <h2>Enrolled Courses</h2>
          <div className="course-list">
            {isLoading ? (
              <div>Loading...</div>
            ) : enrolledcourses.length > 0 ? (
              enrolledcourses.map((data) => (
                <div key={data.course.id} className="course-item">
                  <img src={'https://skystarter.pythonanywhere.com/' + data.course.course_img} alt={data.course.course_img} />
                  <h3>{data.course.course_title}</h3>
                  <p>{data.course.course_duration}</p>
                </div>
              ))
            ) : (
              <div>No enrolled courses available</div>
            )}
          </div>
        </>

        }
        <h2>All Courses</h2>
        <div className="course-list">
          {isLoading ? (
            <div>Loading...</div>
          ) : courses.map(course => (
            <div key={course.id} className="course-item">
              <img src={'https://skystarter.pythonanywhere.com/' + course.course_img} alt={course.course_img} />
              <h3>{course.course_title}</h3>
              <p>{course.course_duration}</p>
              <button onClick={() => handlePayment(course)} className='button'>INR&nbsp;{course.price}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCoursesPage;
