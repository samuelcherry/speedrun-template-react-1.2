import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleBack = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, displayName })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account created! Please log in.");
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      <form className="formContainer" onSubmit={handleRegister}>
        <div className="formInputs">
          <div className="eachInput">
            <label htmlFor="displayName">Display Name</label>
            <input
              type="displayName"
              value={displayName}
              required
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
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
            Register
          </button>
          <button className="buttonStyle" onClick={handleBack}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
