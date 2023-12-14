// Register.jsx
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './register.css';
import username from '../register/image/username.png';
import password from '../register/image/password.png';
import email from '../register/image/email.png';
import phone from '../register/image/phone.png';
import repeat from '../register/image/repeatpass.png';
import hotelRegister from '../register/image/hotel-register.webp';

const Register = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post("http://localhost:8800/api/auth/register", userData);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate("/login"); // Redirect to login after successful registration
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

    return (
        <div className="register">
            <div className="backgroundImage">
                <img src={hotelRegister} alt="Hotel Register" className="backgroundImage" />
            </div>
            <div className="rContainer">
                <h2>Create New Account</h2>
                <div className="rinputWrapper">
                    <input
                        type="text"
                        placeholder="Your username"
                        id="username"
                        onChange={handleChange}
                        className="rInput"
                    />
                    <img src={username} alt="Username" className="icon" />
                </div>
                <div className="rinputWrapper">
                    <input
                        type="text"
                        placeholder="Your email"
                        id="email"
                        onChange={handleChange}
                        className="rInput"
                    />
                    <img src={email} alt="Email" className="icon" />
                </div>
                <div className="rinputWrapper">
                    <input
                        type="text"
                        placeholder="Your phone number"
                        id="phone"
                        onChange={handleChange}
                        className="rInput"
                    />
                    <img src={phone} alt="Phone" className="icon" />
                </div>
                <div className="rinputWrapper">
                    <input
                        type="text"
                        placeholder="Your city"
                        id="city"
                        onChange={handleChange}
                        className="rInput"
                    />
                </div>
                <div className="rinputWrapper">
                    <input
                        type="text"
                        placeholder="Your country"
                        id="country"
                        onChange={handleChange}
                        className="rInput"
                    />
                </div>
                <div className="rinputWrapper">
                    <input
                        type="password"
                        placeholder="Your password"
                        id="password"
                        onChange={handleChange}
                        className="rInput"
                    />
                    <img src={password} alt="Password" className="icon" />
                </div>
                <div className="rinputWrapper">
                    <input
                        type="password"
                        placeholder="Repeat your password"
                        id="repeatPassword"
                        onChange={handleChange}
                        className="rInput"
                    />
                    <img src={repeat} alt="repeatPassword" className="icon" />
                </div>
                <button disabled={loading} onClick={handleRegister}>
                    Register
                </button>
                <p className="registerLink">
                    Have already an account? <span onClick={handleLoginClick}>Login here</span>
                </p>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    );
};

export default Register;