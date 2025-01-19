import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../api/games.api";

export default function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/login");
  };

  return (
    <div>
      <h1>
        <Link to="/games">Games</Link>
      </h1>
      <h1>
        <Link to="/list">List</Link>
      </h1>
      <button onClick={handleLogout}>Log Out</button>
      <hr />
    </div>
  );
}
