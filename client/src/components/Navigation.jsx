import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../api/games.api";

export default function Navigation() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userIdResponse = await getUserId();
        setUser(userIdResponse.data?.user_id || "Guest");
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser("Guest");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>
        <Link to="/games">Games</Link>
      </h1>
      <h1>
        <Link to="/list">List</Link>
      </h1>
      <button onClick={handleLogout}>Log Out</button>
      <h2>{user}</h2>
      <hr />
    </div>
  );
}
