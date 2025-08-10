import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handelerror, handelsuccess } from "../util";
import "./singup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    */
    // You can call API here
    if (!name || !email || !password) {
      return handelerror("all files reqquires h bhaiyaa");
    }

    try {
      const url = "http://localhost:5000/auth/singup";
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
     

      const result = await response.json();
      console.log(result);
      const { success, message,error } = result;
      if (success) {
        handelsuccess(message);
        setTimeout(() => {
        //  navigate("/otpverification");
          navigate("/otpverification", {
            state: {
              email: email  // 👈 pass the email here
            }
          });
        }, 1000);
       
      } else if(error){
       const details=error.details[0].message;
       handelerror(details);
      }
      else if(! success){
        handelerror(message);
      }
    } catch (error) {
      handelerror(error);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Register</button>
      <span>
        already have an account <Link to="/login">Login</Link>
      </span>
    </form>
    <ToastContainer/>
   </div>
    );
}
export default Signup;
