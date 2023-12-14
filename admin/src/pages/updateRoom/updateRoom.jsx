import React, { useState, useEffect } from "react";
import "./updateRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateRoom = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [roomData, setRoomData] = useState(null);
    const { roomId } = useParams();

    // Fetch user data based on userId when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/rooms/${roomId}`);
                setRoomData(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchData();
    }, [roomId]);;

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        try {
            // Check if a new file is selected for upload
            if (file) {
                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/dq2ucdguz/image/upload",
                    data
                );

                const { url } = uploadRes.data;

                // Update user data with the new image URL
                setInfo((prev) => ({ ...prev, img: url }));
            }

            // Perform the user update
            await axios.put(`http://localhost:8800/api/rooms/${roomId}`, info);

            // Successful update
            setSuccessMessage("Updated successfully");
            setErrorMessage("");
        } catch (err) {
            console.error("Error:", err);
            setErrorMessage("Error updating hotel");
            setSuccessMessage("");
        }
    };

    return (
        <div className="ur-new">
            <Sidebar />
            <div className="ur-newContainer">
                <Navbar />
                <div className="ur-top">
                    <h1>{roomData ? roomData.username : "Loading..."}</h1>
                </div>
                <div className="ur-bottom">
                    <div className="ur-right">
                        <form>
                            {roomData &&
                                inputs.map((input) => (
                                    <div className="ur-formInput" key={input.id}>
                                        <label><b>{input.label}</b></label>
                                        <input
                                            onChange={handleChange}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            id={input.id}
                                            value={info[input.id] || ""}
                                        />
                                        <div><i>Existing Value: {roomData[input.id]}</i></div>
                                    </div>
                                ))
                            }
                            <button onClick={handleClick}>Update</button>
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

export default UpdateRoom;