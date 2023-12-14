import React, { useState } from "react";
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const isValidPhone = (phone) => {
    // Assuming the desired format is "086319473" with 9 digits
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.username) {
      errors.username = "Username is required!";
    }

    if (!formData.email) {
      errors.email = "Email is required!";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email address!";
    }

    if (!formData.country) {
      errors.country = "Country is required!";
    }

    if (!formData.city) {
      errors.city = "City is required!";
    }

    if (!formData.phone) {
      errors.phone = "Phone is required!";
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = "Invalid phone number!";
    }

    if (!formData.password) {
      errors.password = "Password is required!";
    }

    // Add more validation rules for other fields as needed

    setErrors(errors);
    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = validateForm(info);

    if (Object.keys(validationErrors).length > 0) {
      // Handle validation errors, display them to the user, etc.
      setErrors(validationErrors);
      setErrorMessage("Some fields not entered correctly");
      setSuccessMessage("");
      return;
    }

    // Continue with form submission logic
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dq2ucdguz/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("http://localhost:8800/api/auth/register", newUser);

      // Successful submission
      setSuccessMessage("Added successfully");
      setErrorMessage("");
      // Optionally, you can reset the form or perform any other action after success
      // setFile(""); // Reset the file input
      // setInfo({}); // Reset the form data
    } catch (err) {
      console.error("Error:", err);
      // Display error message if submission fails
      setErrorMessage("Error adding new entry");
      setSuccessMessage("");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label><b>{input.label}</b></label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                  {errors[input.id] && (
                    <p style={{ color: "red" }}>{errors[input.id]}</p>
                  )}
                </div>
              ))}
              <button onClick={handleClick}>Send</button>

              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
