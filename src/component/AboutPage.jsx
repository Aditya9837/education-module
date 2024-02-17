import React from 'react';
import './Style.css'; // Import your CSS file for styling

function AboutPage() {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-container">
                    <p>Sky Starter Education Portal is dedicated to providing accessible and high-quality education for all. With diverse courses, experienced instructors, and personalized learning, we aim to inspire curiosity and foster lifelong learning opportunities for learners of all ages and backgrounds</p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission">
                <div className="about-container">
                    <h2>Our Mission</h2>
                    <p>"At Sky Starter Education Portal, our mission is deeply rooted in the belief that education is the key to unlocking human potential and driving positive change in the world. We are committed to democratizing access to quality education by providing a comprehensive platform that empowers learners of all ages, backgrounds, and circumstances to pursue their educational goals and aspirations.<br/><br/>Our primary objective is to create an inclusive and engaging learning environment where individuals can explore, discover, and grow intellectually, professionally, and personally. We strive to offer a diverse range of courses, programs, and resources that cater to the unique needs, interests, and learning styles of our global community.<br/><br/>Central to our mission is the belief that education should be accessible, flexible, and relevant to the evolving needs of learners in today's rapidly changing world. Through innovative technologies, interactive content, and dynamic learning experiences, we aim to inspire curiosity, foster critical thinking skills, and cultivate a lifelong love of learning.<br/><br/>Furthermore, we are dedicated to fostering a supportive and collaborative community where learners can connect, share ideas, and support each other on their educational journeys. By promoting diversity, equity, and inclusion, we strive to create a welcoming and empowering environment where all individuals feel valued, respected, and empowered to succeed.<br/><br/>Furthermore, we are dedicated to fostering a supportive and collaborative community where learners can connect, share ideas, and support each other on their educational journeys. By promoting diversity, equity, and inclusion, we strive to create a welcoming and empowering environment where all individuals feel valued, respected, and empowered to succeed."</p>
                </div>
            </section>

            {/* Values Section */}
            <section className="values">
                <div className="about-container">
                    <h2>Our Values</h2>
                    <ul>
                        <li>Quality Education</li>
                        <li>Accessibility</li>
                        <li>Innovation</li>
                        {/* Add more values as needed */}
                    </ul>
                </div>
            </section>

            {/* Team Section */}
            <section className="team">
                <div className="about-container">
                    <h2>Meet Our Team</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum, lorem et bibendum aliquet, enim purus convallis ligula, nec pretium dolor est sit amet mi.</p>
                </div>
            </section>
        </div>
    );
}

export default AboutPage;
