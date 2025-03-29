import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://quickhire-0utm.onrender.com/users/login", user);
      alert("Login Successful!");
      navigate("/home");
    } catch (err) {
      alert("Login Failed!");
    }
  };

  return (
    <div className="auth-container login-bg">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <span onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
