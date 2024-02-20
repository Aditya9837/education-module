import React from 'react'
import img from './image/img.png'
import mission from './image/mission.png'
import vision from './image/vision.png'
import team from './image/team.png'
function AboutPage() {
  return (
    <>
    <div className='about-card'>
                <div className='left-card about-center'>
                    <h2>SkyStarter Education Community </h2>
                    <p>Sky Starter Education Portal is dedicated to providing accessible and high-quality education for all. With diverse courses, experienced instructors, and personalized learning, we aim to inspire curiosity and foster lifelong learning opportunities for learners of all ages and backgrounds.

</p>
                </div>
                <div className='right-card'>
                    <img src={img} className='card-image' alt='img'></img>
                </div>
            </div>
            <div className='reverse'>
                <div className='left-card'>
                    <img src={mission} className='card-image' alt='mission'></img>
                </div>
                <div className='right-card about-center'>
                    <h1>Our Mission</h1>
                    <p>
                    At Sky Starter Education Portal, our mission is deeply rooted in the belief that education is the key to unlocking human potential and driving positive change in the world. We are committed to democratizing access to quality education by providing a comprehensive platform that empowers learners of all ages, backgrounds, and circumstances to pursue their educational goals and aspirations.
                    </p>
                </div>
            </div>
            <div className='about-card'>
                <div className='left-card about-center'>
                    <h1>Our Vision</h1>
                    <p>
                    At SkyStarter, we envision a world where quality education is accessible to all, transcending barriers of geography and circumstance. Our platform aims to empower lifelong learners with personalized, innovative learning experiences, fostering curiosity, adaptability, and excellence. We aspire to be the leading destination for knowledge, inspiration, and transformation, democratizing access to education and enabling individuals to reach their full potential.
                    </p>
                </div>
                <div className='right-card'>
                    <img src={vision} className='card-image' alt='vision'></img>
                </div>
            </div>
            <div className='reverse'>
                <div className='left-card'>
                    <img src={team} className='card-image' alt='team'></img>
                </div>
                <div className='right-card about-center'>
                    <h1>Our Team</h1>
                    <p>
                    At SkyStarter, we're dedicated to providing accessible and transformative education for all. Our team fosters innovation, collaboration, and excellence to empower learners worldwide. Together, we're redefining education and inspiring lifelong growth and success.
                    </p>
                </div>
            </div>
    </>
  )
}

export default AboutPage