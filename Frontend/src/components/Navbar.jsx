import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>QuickHire</h1>
      </div>
      <div className="navbar-right">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/register-labour" className="nav-link">Register as Labour</Link>
      </div>
    </nav>
  );
};

export default Navbar;
