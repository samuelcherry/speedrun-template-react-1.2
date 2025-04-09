import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { setUuid, setDisplayName } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("displayName", data.displayName);
      localStorage.setItem("uuid", data.uuid);
      setDisplayName(data.displayName);
      setUuid(data.uuid);
      navigate("/main");
    } else {
      alert(data.error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div>
      <form className="formContainer" onSubmit={handleLogin}>
        <div className="formInputs">
          <div className="eachInput">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="eachInput">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="formButtons">
          <button className="buttonStyle" type="submit">
            Login
          </button>
          <button className="buttonStyle" onClick={handleRegister}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
