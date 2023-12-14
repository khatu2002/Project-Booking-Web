import React, { useState, useEffect } from "react";
import "./UpdateHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateHotel = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [hotelData, setHotelData] = useState(null);
    const { hotelId } = useParams();

    // Fetch user data based on userId when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/hotels/find/${hotelId}`);
                setHotelData(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchData();
    }, [hotelId]);;

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
            await axios.put(`http://localhost:8800/api/hotels/find/${hotelId}`, info);

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
        <div className="uh-new">
            <Sidebar />
            <div className="uh-newContainer">
                <Navbar />
                <div className="uh-top">
                    <h1>{hotelData ? hotelData.username : "Loading..."}</h1>
                </div>
                <div className="uh-bottom">
                    <div className="uh-left">
                        <img
                            src={
                                file ? URL.createObjectURL(file) :
                                    info.img || !hotelData || !hotelData.img
                                        ? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                        : hotelData.img
                            }
                            alt=""
                        />
                    </div>
                    <div className="uh-right">
                        <form>
                            <div className="uh-formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="u-icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {hotelData &&
                                inputs.map((input) => (
                                    <div className="uh-formInput" key={input.id}>
                                        <label><b>{input.label}</b></label>
                                        <input
                                            onChange={handleChange}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            id={input.id}
                                            value={info[input.id] || ""}
                                        />
                                        <div><i>Existing Value: {hotelData[input.id]}</i></div>
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

export default UpdateHotel;