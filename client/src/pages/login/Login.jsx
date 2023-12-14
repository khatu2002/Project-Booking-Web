import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
import username from '../login/image/username.png';
import password from '../login/image/password.png';
import hotel_login from '../login/image/hotel_login.webp';
import hotel_logo from '../login/image/hotel-logo.jpg'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="loginWrapper">
      <div className="leftPanel">
        <div className="login">
          <div className="lContainer">
            <img src={hotel_logo} alt="Logo" className="logo" width="200" height="200" />
            <h2>Welcome</h2>
            <div className="inputWrapper">
              <input
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
                className="lInput"
              />
              <img src={username} alt="Username" className="icon" />
            </div>
            <div className="inputWrapper">
              <input
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
                className="lInput"
              />
              <img src={password} alt="Password" className="icon" />
            </div>
            <p className="registerLink">
              Do not have an account? <span onClick={handleRegisterClick}>Register now!</span>
            </p>
            <button disabled={loading} onClick={handleClick} className="lButton">
              Login
            </button>
            {error && <span>{error.message}</span>}
          </div>
        </div>
      </div>
      <div className="rightPanel">
        <img src={hotel_login} alt="Hotel_Login" className="active" />
      </div>
    </div>

  );
};

export default Login;