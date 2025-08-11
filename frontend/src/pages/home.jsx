import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handelsuccess, handelerror } from "../util";
import { ToastContainer } from "react-toastify";
import "./home.css";

function Home() {
  const [loggedinuser, setloggedinuser] = useState("");
  const [username, setUsername] = useState("");
  const [tbhmsg, settbhmsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("loggedinuser");

    setUsername(localStorage.getItem("username") || "");
    if (!token) {
      navigate("/login");
    } else {
      setloggedinuser(email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedinuser");
    localStorage.removeItem("username");

    handelsuccess("User log out ho gyaa h bhiyaa");
    setTimeout(() => {
      navigate("../login");
    }, 1000);
  };

  const subbmittbh = async (e) => {
    e.preventDefault();

    try {
      const url = "https://tbh-message.onrender.com";
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: loggedinuser, tbhmsg }),
      });

      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handelsuccess(message);
        settbhmsg(""); // clear input
      } else {
        handelerror(message || "Failed to submit TBH");
      }
    } catch (error) {
      handelerror(error);
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-greeting">Hello !! {username}</h1>
        <h3 className="home-subtitle">
          Ap ka Lakshya ki website pr bhaut bhaut swagat h
        </h3>

        <label className="home-label">TBH about Lakshya ...??</label>
        <input
          className="home-input"
          type="text"
          value={tbhmsg}
          onChange={(e) => settbhmsg(e.target.value)}
        />

        <div className="home-button-group">
          <button className="btn btn-submit" onClick={subbmittbh}>
            TBH Submit Karo
          </button>
          <button className="btn btn-logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Home;
