
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handelerror, handelsuccess } from "../util";
import { ToastContainer } from "react-toastify";
import "./login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    if ( !email || !password) {
      return handelerror("all chize reqquires h bhaiyaa");
    }

    try {
      const url = "http://localhost:5000/auth/login";
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
     

      const result = await response.json();
      console.log(result);
      const { success, message,error ,token ,name} = result;
      if (success) {
        handelsuccess(message);
        localStorage.setItem('token',token);
        localStorage.setItem('username',name);
        localStorage.setItem("loggedinuser", email);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
       
      } else if(error){
       const details=error.details[0].message;
       handelerror(details);
      }
      else if(! success && message.trim()==="user not  exist , login first"){
        handelerror(message);
        setTimeout(() => {
          navigate("/singup");
        }, 2000);
      }else if (!success && message.trim() === "please verfy your email id first") {
        handelerror(message);
        setTimeout(() => {
          navigate("/otpverification");
        }, 2000);
      
      }
      
      else if(!success ){
        
        handelerror(message);
      }
      

    } catch (error) {
      handelerror(error);
    }
  };


  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

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

      <button type="submit">Login</button>
      <span>
     don't have an account <Link to="/singup">singup</Link>
      </span>
    </form>
     <ToastContainer/>
     </div>
  );
}

export default Login;
