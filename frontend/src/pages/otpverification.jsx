// OtpVerify.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handelerror, handelsuccess } from "../util";

import "./OtpVerify.css";

function OtpVerify(props) {
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState(""); // <-- Add this


  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    // You can add real OTP logic here
    if (!otp) {
      return handelerror("enter otp first");
    }
    try {
      const url = "http://localhost:5000/auth/otpverification";
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      const result = await response.json();
      console.log(result);
      const { success, message, error } = result; // <-- Correct keys


      if (success) {
        setIsVerified(true);
        handelsuccess(message);

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error.details[0].message;
        handelerror(details);
      } else if (!success) {
        handelerror(message);
      }
    } catch (error) {
      handelerror(error);
    }
  };

  return (
    <div className="otp-container">
      <h2>Verify your email{props.email}</h2>

      <label htmlFor="otp-input">Enter OTP:</label>
      <input
        type="number"
        id="otp-input"
        required
        className="otp-input"
        placeholder="Enter OTP"
        value={otp} // <-- Added
        onChange={(e) => setOtp(e.target.value)} // <-- Added
      />

      <button className="verify-btn" onClick={handleVerify}>
        Verify
      </button>

      {isVerified && (
        <p className="success-message">✅ Signup verified successfully!</p>
      )}

      <ToastContainer />
    </div>
  );
}

export default OtpVerify;
