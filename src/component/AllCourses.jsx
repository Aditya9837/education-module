import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Style from './Style.css'; // Import CSS file for styling
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const nevigate = useNavigate()

  useEffect(() => {
    // Fetch course data from your server
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://skystarter.pythonanywhere.com/education/course/')
        if(response.status==200)
        {
          setCourses(response.data['data'])
          console.log(courses)
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  return (
    <section id="courses" className="courses">
      <div className="course-container">
      <h2>Enrolled Courses</h2>
      <div className="course-list">
          {courses.length>0 && courses.map(course => (
            <div key={course.id} className="course-item">
              <img src={'https://skystarter.pythonanywhere.com/'+course.course_img} alt={course.course_img} />
              <h3>{course.course_title}</h3>
              {/* <p>{course.course_desc}</p> */}
              <p>{course.course_duration}</p>
              {/* <p>{course.price}</p> */}
             <button onClick={()=>{
              if(Cookies.get('isLoggedin')==='true')
              {
                nevigate('/payment',{state:{'data':course}})
              }
              else{
                nevigate('/signin')
              }
             }} className='button'>INR&nbsp;{course.price}</button>
            </div>
          ))}
        </div>
        <h2>All Courses</h2>
        <div className="course-list">
          {courses.length>0 && courses.map(course => (
            <div key={course.id} className="course-item">
              <img src={'https://skystarter.pythonanywhere.com/'+course.course_img} alt={course.course_img} />
              <h3>{course.course_title}</h3>
              {/* <p>{course.course_desc}</p> */}
              <p>{course.course_duration}</p>
              {/* <p>{course.price}</p> */}
             <button onClick={()=>{
              if(Cookies.get('isLoggedin')==='true')
              {
                nevigate('/payment',{state:{'data':course}})
              }
              else{
                nevigate('/signin')
              }
             }} className='button'>INR&nbsp;{course.price}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCoursesPage;
