import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style.css'; // Import your CSS file for styling
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import student1 from './image/student1.jpg';
import student2 from './image/student2.jpg'


function HomePage() {
    const [topCourses, setTopCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const nevigate = useNavigate()

    useEffect(() => {
        const fetchTopCourses = async () => {
            try {
                const response = await axios.get('https://skystarter.pythonanywhere.com/education/course/');

                // Assuming the response data is an array of courses
                const coursesData = response.data['data'];

                // Sort the courses based on some criteria, such as popularity or rating
                coursesData.sort((a, b) => b.popularity - a.popularity);

                // Set the top two courses
                setTopCourses(coursesData.slice(0, 2));
            } catch (error) {
                console.error('Error fetching top courses:', error);
            }
        };

        fetchTopCourses().then(() => {
            setIsLoading(false)
        });
    }, []);

    const handlePayment = course => {
        if (Cookies.get('isLoggedin') === 'true') {
            nevigate('/payment', { state: { 'data': course } });
        } else {
            nevigate('/signin');
        }
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="home-hero">
                <div className="home-container">
                    <div className="hero-content">
                        <h1>Elevate Your Career: The Ultimate Training and Placements Platform</h1>
                        <p>"Transform Your Career: Your Ultimate Training and Placements Hub" is your go-to destination for career advancement. Explore top-notch training modules, gain practical skills, and access career resources tailored to your success. Join a vibrant community of professionals, and take your career to new heights with us</p>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section id="courses" className="courses">
                <div className="home-container">
                    <h2>Popular Courses</h2>
                    <div className="course-list">
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : topCourses.map(course => (
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

            {/* Testimonials Section */}
            <section className="testimonials">
                <div className="home-container">
                    <h2>Students got placed after taking this course at...</h2>
                    <div className="testimonial-list">
                        <div className="testimonial-item">
                            <img src={student1} alt="" />
                            <p>"This React course is fantastic for beginners. The instructor's clear explanations and hands-on projects make learning React enjoyable. "</p>
                            <span>- Gautam Kumar</span>
                        </div>
                        <div className="testimonial-item">
                            <img src={student2} alt="" />
                            <p>"Clear explanations and practical examples make this Python course a great choice for beginners. Some pacing issues, but overall, it's a valuable resource for learning Python basics."</p>
                            <span>- Anshul Patel</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="cta">
                <div className="home-container">
                    <h2>Ready to Learn?</h2>
                    <button href="/signup" className="button">Sign Up Now</button>
                </div>
            </section>

            {/* Footer */}
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-links">
                        <ul>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div class="social-media">
                        <ul>
                            <li><a href="https://facebook.com"><i class="fa fa-facebook"></i></a></li>
                            <li><a href="https://twitter.com"><i class="fa fa-twitter"></i></a></li>
                            <li><a href="https://instagram.com"><i class="fa fa-instagram"></i></a></li>

                        </ul>
                    </div>
                    <div class="copyright">
                        <p>&copy; 2024 Your Education Platform. All rights reserved.</p>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default HomePage;
