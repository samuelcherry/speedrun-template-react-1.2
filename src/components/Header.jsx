import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const navigate = useNavigate();
  const { displayName, setDisplayName } = useContext(UserContext);

  const handleLogOut = () => {
    localStorage.clear();
    setDisplayName("");
    navigate("/");
  };
  return (
    <div className="header">
      <div>Welcome, {displayName}</div>
      <button className="buttonStyle" onClick={handleLogOut}>
        Log out
      </button>
    </div>
  );
};

export default Header;
