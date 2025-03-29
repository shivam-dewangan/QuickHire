import React, { useState } from "react";
import axios from "axios";
import "./LabourForm.css";


const LabourRegistrationForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    fatherHusbandName: "",
    gender: "",
    dob: "",
    aadhaar: "",
    mobile: "",
    email: "",
    permanentAddress: "",
    currentAddress: "",
    pincode: "",
    state: "",
    district: "",
    labourType: [],
    experience: "",
    dailyWage: "",
    preferredLocation: "",
    skills: "",
    healthCondition: "",
    bankDetails: "",
    emergencyContact: "",
    photo: null,
    idProof: null,
    experienceCertificate: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      let updatedLabourTypes = [...formData.labourType];
      if (checked) {
        updatedLabourTypes.push(value);
      } else {
        updatedLabourTypes = updatedLabourTypes.filter((type) => type !== value);
      }
      setFormData({ ...formData, labourType: updatedLabourTypes });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "labourType") {
        formDataToSend.append("labourType", JSON.stringify(formData.labourType)); // Fix: Convert to JSON
      } else if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post("https://quickhire-0utm.onrender.com/api/labour/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Form Submitted Successfully!");
      console.log("Success:", response.data);
    } catch (error) {
      alert("Error submitting form. Please try again.");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <form className="labour-form" onSubmit={handleSubmit}>
        {step === 0 && (
          <fieldset>
            <legend>Personal Details</legend>
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
            <input type="text" name="fatherHusbandName" placeholder="Father’s/Husband’s Name" onChange={handleChange} required />
            <select name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input type="date" name="dob" onChange={handleChange} required />
            <input type="text" name="aadhaar" placeholder="Aadhaar Number" onChange={handleChange} required />
            <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email (Optional)" onChange={handleChange} />
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend>Address & Location</legend>
            <input type="text" name="permanentAddress" placeholder="Permanent Address" onChange={handleChange} required />
            <input type="text" name="currentAddress" placeholder="Current Address" onChange={handleChange} required />
            <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} required />
            <input type="text" name="state" placeholder="State" onChange={handleChange} required />
            <input type="text" name="district" placeholder="District" onChange={handleChange} required />
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend>Work Details</legend>
            <label>Labour Type:</label>
            <div className="checkbox-group">
              {["Construction Worker", "Electrician", "Plumber", "Carpenter", "Painter"].map((type) => (
                <label key={type}>
                  <input type="checkbox" name="labourType" value={type} onChange={handleChange} />
                  {type}
                </label>
              ))}
            </div>
            <input type="text" name="experience" placeholder="Work Experience (years)" onChange={handleChange} required />
            <input type="text" name="dailyWage" placeholder="Expected Daily Wage" onChange={handleChange} required />
            <input type="text" name="preferredLocation" placeholder="Preferred Work Location" onChange={handleChange} required />
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend>Additional Information</legend>
            <input type="text" name="skills" placeholder="Skills & Certifications" onChange={handleChange} />
            <input type="text" name="healthCondition" placeholder="Health Condition (if any)" onChange={handleChange} />
            <input type="text" name="bankDetails" placeholder="Bank Account Details (Optional)" onChange={handleChange} />
            <input type="text" name="emergencyContact" placeholder="Emergency Contact" onChange={handleChange} required />
          </fieldset>
        )}

        {step === 4 && (
          <fieldset>
            <legend>Upload Documents</legend>
            <label>Photo Upload: <input type="file" name="photo" onChange={handleChange} /></label>
            <label>ID Proof (Aadhaar/PAN/Voter ID): <input type="file" name="idProof" onChange={handleChange} /></label>
            <label>Experience Certificate: <input type="file" name="experienceCertificate" onChange={handleChange} /></label>
          </fieldset>
        )}

        <div className="form-buttons">
          {step > 0 && <button type="button" onClick={handleBack}>Back</button>}
          {step < 4 && <button type="button" onClick={handleNext}>Next</button>}
          {step === 4 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default LabourRegistrationForm;
