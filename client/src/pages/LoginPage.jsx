import { useState } from "react";
import { useNavigate } from "react-router-dom";
import gamesApi from "../api/games.api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await gamesApi.post("/login/", {
        username,
        password,
      });

      if (response.data.access) {
        localStorage.setItem("accessToken", response.data.access);
        navigate("/games");
      }
    } catch (err) {
      setError("Invalid username or password.");
      console.error("Login Error:", err);
    }
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-center bg-slate-500 h-screen text-xl">
      <div className="p-4 bg-white rounded shadow-md w-full max-w-lg">
        <h2 className="mb-4 text-2xl text-black text-left ">Log in</h2>
        <form onSubmit={login}>
          <div className="text-left  mb-1 text-black pb-1">
            <h3>User: </h3>
          </div>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="bg-slate-200 rounded w-full text-black"
          />

          <div className="text-left  mb-1 text-black pt-4 pb-1">
            <h3>Password: </h3>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-slate-200 rounded w-full text-black"
          />

          <button
            className="bg-blue-500 text-white w-full p-2 rounded mt-6 cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSignIn}
            className="text-sm text-blue-400 w-auto "
          >
            Don't have an account? Sign in
          </button>
        </div>
        {error && <p className="text-red-600 font-bold text-sm">{error}</p>}
      </div>
    </div>
  );
}
