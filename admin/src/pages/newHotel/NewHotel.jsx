import React, { useState } from "react";
import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data, loading, error } = useFetch("http://localhost:8800/api/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    setRooms(e.target.value);
  };

  const renderValue = (selected) => {
    return selected.map((roomId) => {
      const room = data.find((room) => room._id === roomId);
      return room ? room.title : roomId;
    }).join(', ');
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // Validate the form
    const validationErrors = validateForm(info);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      setErrorMessage("Some fields not entered correctly");
      return;
    }
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dq2ucdguz/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post("http://localhost:8800/api/hotels", newhotel);
      setSuccessMessage("Hotel added successfully");
      setErrorMessage("");
      // Optionally, you can reset the form or perform any other action after success
      // setInfo({}); // Reset the form data
      // setRooms([]); // Reset the rooms
    } catch (err) {
      console.log(err);
      setErrorMessage("Error adding hotel");
      setSuccessMessage("");
    }
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.title) {
      errors.title = "Title is required!";
    }

    if (!formData.type) {
      errors.type = "Type is required!";
    }

    if (!formData.address) {
      errors.address = "Address is required!";
    }

    if (!formData.cheapestPrice) {
      errors.cheapestPrice = "Price is required!";
    } else if (isNaN(formData.cheapestPrice) || formData.cheapestPrice <= 0) {
      errors.cheapestPrice = "Price must be a valid positive number!";
    }

    if (!formData.name) {
      errors.name = "Name is required!";
    }

    if (!formData.city) {
      errors.city = "City is required!";
    }

    if (!formData.distance) {
      errors.distance = "Distance is required!";
    } else if (isNaN(formData.distance) || formData.distance < 0) {
      errors.distance = "Distance must be a valid non-negative number!";
    }

    if (!formData.desc) {
      errors.desc = "Description is required!";
    }

    setErrors(errors);
    return errors;
  };

  return (
    <div className="nh-new">
      <Sidebar />
      <div className="nh-newContainer">
        <Navbar />
        <div className="nh-top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="nh-bottom">
          <div className="nh-left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="nh-right">
            <form>
              <div className="nh-formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="nh-icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="nh-formInput" key={input.id}>
                  <label><b>{input.label}</b></label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                  {errors[input.id] && <p style={{ color: 'red' }}>{errors[input.id]}</p>}
                </div>
              ))}
              <div className="nh-formInput">
                <label><b>Featured</b></label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="nh-selectRooms">
                <label><b>Rooms </b></label>
                <Select
                  id="rooms"
                  multiple
                  value={rooms}
                  onChange={handleSelect}
                  renderValue={renderValue}
                >
                  {loading
                    ? "loading"
                    : data &&
                    data.map((room) => (
                      <MenuItem key={room._id} value={room._id}>
                        {room.title}
                      </MenuItem>
                    ))}
                </Select>
              </div>
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

export default NewHotel;