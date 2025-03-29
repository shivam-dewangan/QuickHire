import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/users/signup", user);
      alert("Signup Successful!");
      navigate("/");
    } catch (err) {
      alert("Signup Failed!");
    }
  };

  return (
    <div className="auth-container signup-bg">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Signup</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Signup</button>
        <p>
          Already have an account? <span onClick={() => navigate("/")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
