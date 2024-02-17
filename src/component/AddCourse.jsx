import React, { useState } from 'react';
import axios from 'axios';

function AddCourseForm() {
    const [course_title, setCourse_title] = useState('');
    const [course_desc, setCourse_desc] = useState('');
    const [course_img, setCourse_img] = useState(null); // State to store file object
    const [course_duration, setCourse_duration] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'course_title':
                setCourse_title(value);
                break;
            case 'course_desc':
                setCourse_desc(value);
                break;
            case 'course_img':
                setCourse_img(e.target.files[0]); // Update state with file object
                break;
            case 'course_duration':
                setCourse_duration(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('course_title', course_title);
        formData.append('course_desc', course_desc);
        formData.append('course_img', course_img); // Append file object
        formData.append('course_duration', course_duration);

        try {
            const response = await axios.post('https://skystarter.pythonanywhere.com/education/course/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type for file uploads
                }
            });
            if (response.status === 200) {
                setSuccessMessage('Course added successfully');
                setErrorMessage('');
                // Reset form fields
                setCourse_title('');
                setCourse_desc('');
                setCourse_img(null);
                setCourse_duration('');
            }
        } catch (error) {
            if (error.response.data.errors) {
                setErrorMessage('Error adding course');
                console.log(error.response.data.errors);
            }
        }
    };

    return (
        <div>
            <h2>Add Course</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="course_title" placeholder="Course Title" onChange={handleChange} value={course_title} />
                <textarea name="course_desc" placeholder="Course Description" onChange={handleChange} value={course_desc} required></textarea>
                <input type="file" name="course_img" onChange={handleChange} accept="image/*" required /> {/* Accept only image files */}
                <input type="text" name="course_duration" placeholder="Course Duration" onChange={handleChange} value={course_duration} required />
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
}

export default AddCourseForm;
