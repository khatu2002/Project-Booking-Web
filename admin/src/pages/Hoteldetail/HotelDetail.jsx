import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./hoteldetail.scss"; // Import the stylesheet for HotelDetail
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const HotelDetail = () => {
    const { hotelId } = useParams();
    const [entityData, setEntityData] = useState(null);
    const [roomNames, setRoomNames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/hotels/find/${hotelId}`);
                setEntityData(response.data);

                // Fetch room names based on room IDs
                const roomPromises = response.data.rooms.map(async (roomId) => {
                    const roomResponse = await axios.get(`http://localhost:8800/api/rooms/${roomId}`);
                    return roomResponse.data.title;
                });

                const roomNames = await Promise.all(roomPromises);
                setRoomNames(roomNames);
            } catch (error) {
                console.error("Error fetching entity details:", error);
            }
        };

        fetchData();
    }, [hotelId]);

    return (
        <div className="hd-new"> {/* You can adjust the class name as needed */}
            <Sidebar />
            <div className="hd-newContainer"> {/* You can adjust the class name as needed */}
                <Navbar />
                <div className="hd-top">
                    <h1>{entityData ? entityData.name : "Loading..."}</h1>
                </div>
                <div className="hd-bottom">
                    <div className="hd-left">
                        <img
                            src={
                                entityData && entityData.photos && entityData.photos.length > 0
                                    ? entityData.photos[0]
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="hd-right">
                        <form>
                            {entityData && (
                                <>
                                    <div className="hd-formInput">
                                        <label><b>Type</b></label>
                                        <p>{entityData.type}</p>
                                    </div>
                                    <div className="hd-formInput">
                                        <label><b>City</b></label>
                                        <p>{entityData.city}</p>
                                    </div>
                                    <div className="hd-formInput">
                                        <label><b>Address</b></label>
                                        <p>{entityData.address}</p>
                                    </div>
                                    <div className="hd-formInput">
                                        <label><b>Distance</b></label>
                                        <p>{entityData.distance} miles</p>
                                    </div>
                                    <div className="hd-formInput">
                                        <label><b>Rating</b></label>
                                        <p>{entityData.rating}/5</p>
                                    </div>
                                    <div className="hd-formInput">
                                        <label><b>Rooms</b></label>
                                        <p>{roomNames.join(', ')}</p>
                                    </div>
                                    <div className="hd-formInput">
                                        <label><b>Cheapest Price</b></label>
                                        <p>${entityData.cheapestPrice}</p>
                                    </div>
                                    <div className="hd-formInput">
                                        <label><b>Featured</b></label>
                                        <p>{entityData.featured ? "Yes" : "No"}</p>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetail;
