// RoomDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./roomdetail.scss"; // Import the stylesheet for RoomDetail

const RoomDetail = () => {
    const { roomId } = useParams();
    const [roomData, setRoomData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/rooms/${roomId}`);
                setRoomData(response.data);
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };

        fetchData();
    }, [roomId]);


    return (
        <div className="rd-new">
            <Sidebar />
            <div className="rd-newContainer">
                <Navbar />
                <div className="rd-top">
                    <h1>{roomData ? roomData.title : "Loading..."}</h1>
                </div>
                <div className="rd-bottom">
                    <div className="rd-right">
                        <form>
                            {roomData && (
                                <>
                                    <div className="rd-formInput">
                                        <label>Title</label>
                                        <p>{roomData.title}</p>
                                    </div>
                                    <div className="rd-formInput">
                                        <label>Price</label>
                                        <p>${roomData.price}</p>
                                    </div>
                                    <div className="rd-formInput">
                                        <label>Max People</label>
                                        <p>{roomData.maxPeople}</p>
                                    </div>
                                    <div className="rd-formInput">
                                        <label>Description</label>
                                        <p>{roomData.desc}</p>
                                    </div>
                                    <div className="rd-formInput">
                                        <label>Room Numbers</label>
                                        {roomData &&
                                            roomData.roomNumbers.map((roomNumber, index) => (
                                                <div key={index}>
                                                    <p>Room Number: {roomNumber.number}</p>
                                                    {roomNumber.unavailableDates.length > 0 && (
                                                        <div className="rd-formInput">
                                                            <label>Unavailable Dates</label>
                                                            <p>
                                                                {[...new Set(roomNumber.unavailableDates.map(date => date.slice(0, 10)))].join(", ")}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
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

export default RoomDetail;
