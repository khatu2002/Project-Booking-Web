import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data, loading, error } = useFetch("http://localhost:8800/api/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.title) {
      errors.title = "Title is required!";
    }

    if (!formData.price) {
      errors.price = "Price is required!";
    } else if (isNaN(formData.price) || formData.price <= 0) {
      errors.price = "Price must be a valid positive number!";
    }

    if (!formData.maxPeople) {
      errors.maxPeople = "Max People is required!";
    } else if (isNaN(formData.maxPeople) || formData.maxPeople <= 0) {
      errors.maxPeople = "Max People must be a valid positive number!";
    }

    if (!formData.desc) {
      errors.desc = "Description is required!";
    }

    if (!formData.roomNumbers || formData.roomNumbers.length === 0) {
      errors.roomNumbers = "At least one room number is required!";
    } else {
      // Additional validation for roomNumbers array
      formData.roomNumbers.forEach((roomNumber, index) => {
        if (!roomNumber.number) {
          errors[`roomNumbers[${index}].number`] = "Room number is required!";
        }
        // Add more validation rules for roomNumbers if needed
      });
    }

    setErrors(errors);
    return errors;
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

    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`http://localhost:8800/api/rooms/${hotelId}`, { ...info, roomNumbers });
      setSuccessMessage("Room added successfully");
      setErrorMessage("");
      // Optionally, you can reset the form or perform any other action after success
      // setInfo({}); // Reset the form data
      // setHotelId(undefined); // Reset the hotelId
      // setRooms([]); // Reset the rooms
    } catch (err) {
      console.log(err);
      setErrorMessage("Error adding room");
      setSuccessMessage("");
    }
  };

  console.log(info)
  return (
    <div className="nr-new">
      <Sidebar />
      <div className="nr-newContainer">
        <Navbar />
        <div className="nr-top">
          <h1>Add New Room</h1>
        </div>
        <div className="nr-bottom">
          <div className="nr-right">
            <form>
              {roomInputs.map((input) => (
                <div className="nr-formInput" key={input.id}>
                  <label><b>{input.label}</b></label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                  {errors[input.id] && <p style={{ color: 'red' }}>{errors[input.id]}</p>}
                </div>
              ))}
              <div className="nr-formInput">
                <label><b>Rooms</b></label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Give comma between room numbers..."
                />
              </div>
              <div className="nr-formInput">
                <label><b>Choose a hotel</b></label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                    data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))}
                </select>
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

export default NewRoom;
