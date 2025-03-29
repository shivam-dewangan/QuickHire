import { useEffect, useState } from "react";
import "./Home.css"; // Import the CSS file

// Import images properly if they are inside 'src/assets/'
import maleImg from "../assets/male.png";
import femaleImg from "../assets/female.png";
import transImg from "../assets/trans.png";

const HomePage = () => {
  const [labourers, setLabourers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabourers = async () => {
      try {
        const response = await fetch("https://quickhire-0utm.onrender.com/labour/all");
        const data = await response.json();
        console.log("Fetched Labourers:", data);
        setLabourers(data);
      } catch (error) {
        console.error("Error fetching labourers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabourers();
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    if (isNaN(birthDate)) return "N/A"; 
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age;
  };

  const getProfileImage = (labourer) => {
    if (labourer.photo) return labourer.photo;
    const gender = labourer.gender ? labourer.gender.toLowerCase() : "other";
    switch (gender) {
      case "male":
        return maleImg;
      case "female":
        return femaleImg;
      default:
        return transImg;
    }
  };

  const handleHire = (labourer) => {
    console.log(`You hired ${labourer.fullName} for ₹${labourer.dailyWage}`);
    alert(`You hired ${labourer.fullName}!`); // Temporary confirmation
  };

  return (
    <div className="home-container">
      <h2>Labourers List</h2>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="labourers-grid">
          {labourers.map((labourer) => {
            const imageSrc = getProfileImage(labourer);

            return (
              <div key={labourer._id} className="labourer-card">
                <img
                  src={imageSrc}
                  alt={labourer.fullName}
                  className="labourer-image"
                />
                <h3>{labourer.fullName}</h3>
                <p><strong>Daily Wage:</strong> ₹{labourer.dailyWage}</p>
                <p><strong>Skills:</strong> {labourer.skills || "Not specified"}</p>
                <p><strong>Work:</strong> {labourer.labourType || "Not specified"}</p>
                <p><strong>Age:</strong> {calculateAge(labourer.dob)}</p>
                <p><strong>Gender:</strong> {labourer.gender || "Not specified"}</p>

                {/* Hire Button */}
                <button className="hire-button" onClick={() => handleHire(labourer)}>
                  Hire
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
