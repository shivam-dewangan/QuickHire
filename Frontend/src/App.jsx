import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import LabourRegistration from "./pages/LabourRegistration.jsx";

function AppContent() {
  const location = useLocation();
  
  // Login aur Signup page pe Navbar hide karne ke liye condition
  const showNavbar = location.pathname !== "/" && location.pathname !== "/signup";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register-labour" element={<LabourRegistration />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
