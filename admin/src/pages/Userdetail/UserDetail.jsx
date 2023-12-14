import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./userdetail.scss"; // Import the stylesheet for UserDetail
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UpdateUser from "../updateuser/UpdateUser";
const UserDetail = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/users/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div className="d-new"> {/* Adjust the class name as needed */}
            <Sidebar />
            <div className="d-newContainer"> {/* Adjust the class name as needed */}
                <Navbar />
                <div className="d-top">
                    <h1>{userData ? userData.username : "Loading..."}</h1>
                </div>
                <div className="d-bottom">
                    <div className="d-left">
                        <img
                            src={userData && userData.img ? userData.img : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                            alt=""
                        />
                    </div>
                    <div className="d-right">
                        <form>
                            {userData && (
                                <>
                                    <div className="d-formInput">
                                        <label><b>Username</b></label>
                                        <p>{userData.username}</p>
                                    </div>
                                    <div className="d-formInput">
                                        <label><b>Email</b></label>
                                        <p>{userData.email}</p>
                                    </div>
                                    <div className="d-formInput">
                                        <label><b>Country</b></label>
                                        <p>{userData.country}</p>
                                    </div>
                                    <div className="d-formInput">
                                        <label><b>City</b></label>
                                        <p>{userData.city}</p>
                                    </div>
                                    <div className="d-formInput">
                                        <label><b>Phone</b></label>
                                        <p>{userData.phone}</p>
                                    </div>
                                    <div className="d-formInput">
                                        <label><b>Is Admin</b></label>
                                        <p>{userData.isAdmin ? "Yes" : "No"}</p>
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

export default UserDetail;
