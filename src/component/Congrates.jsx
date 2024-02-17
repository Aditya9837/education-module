// CongratulationsPage.js
import { useLocation } from 'react-router-dom';
import React from 'react';

function CongratulationsPage() {
    const location = useLocation()
    const {data,course_name} = location.state
  return (
    <div className="container mt-5 ">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card  bg bg-success">
            <div className="card-body">
              <h1 className="card-title text-center">Congratulations!</h1>
              <div className="text-center">
                <p className="card-text">Thank you for your purchase. Your payment was successful.</p>
                <div className="mt-4">
                  <p><strong>Course Name:</strong> {course_name}</p>
                  <p><strong>Payment ID:</strong> {data}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CongratulationsPage;
