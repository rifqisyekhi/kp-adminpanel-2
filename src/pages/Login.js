import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import logo from "../assets/images/Logo_bplj.png";
import { useNavigate } from "react-router-dom";
import illustration1 from "../assets/images/Ilustrasi.png";
import { isStillAuthorized, login } from "../libs/user";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await login(username, password);

      if (response.success) {
        window.location.href = "/dashboard";
      } else {
        if (response.status == 404) {
          setError("Invalid username or password");
        } else {
          setError("Error something went wrong");
        }
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-all">
      <div className="login-container">
        <div className="login-box">
          <div className="login-logo">
            <img src={logo} alt="Logo" />
          </div>
          <h2 className="login-h2-sign">Sign in Admin Panel</h2>
          <form id="loginForm" onSubmit={handleSubmit}>
            <label className="login-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-button-sign-in">
              Sign In
            </button>
          </form>
          <br />
        </div>
        <div className="login-illustration">
          <img src={illustration1} alt="Illustration" />
        </div>
      </div>
    </div>
  );
}
