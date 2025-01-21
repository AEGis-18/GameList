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
    <div className="bg-blue-500 text-white text-xl w-full fixed top-0 left-0 z-50 p-4">
      <div className="flex items-center justify-between w-full">
        <div className="p-2 border-white border-r w-32 text-center">
          <h1>
            <Link to="/games">Games</Link>
          </h1>
        </div>
        <div className="p-2 border-white border-r text-center w-32">
          <h1>
            <Link to="/list">List</Link>
          </h1>
        </div>

        <div className="flex-grow"></div>

        <div className="border-white border-l p-2 text-center w-32">
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div>
  );
}
