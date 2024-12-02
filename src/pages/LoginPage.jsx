import React, { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import "../styles/LoginPage.css";
import "../styles/LoginForm.css";
import logo from "../assets/Images/logo.png";

const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="left-banner"></div>
        <div className="right-form">
          <div className="logo-container">
            <img src={logo} alt="logo"/>
          </div>
          {showRegister ? <RegisterForm /> : <LoginForm />}
          <div className="toggle-form" onClick={() => setShowRegister(!showRegister)}>
            {showRegister ? "Go to Login" : "Don't have an account? Signup"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
