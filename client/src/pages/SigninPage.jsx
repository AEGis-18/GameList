import { useState } from "react";
import { useNavigate } from "react-router-dom";
import gamesApi from "../api/games.api";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signin = async (event) => {
    event.preventDefault();

    try {
      const response = await gamesApi.post("/signin/", {
        username,
        password,
      });

      if (response.data.message === "User created successfully") {
        navigate("/login");
      }
    } catch (err) {
      setError("An error occurred or username already exists.");
      console.error("Sign in Error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-xl">
      <div className="p-4 bg-white rounded shadow-md w-full max-w-lg">
        <h2 className="mb-4 text-2xl text-black text-left ">Sign in</h2>
        <form onSubmit={signin}>
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
          <div className="text-left  mb-1 text-black pb-1">
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
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded mt-6 cursor-pointer"
          >
            Sign in
          </button>
        </form>
        {error && <p className="text-red-600 font-bold text-sm">{error}</p>}
      </div>
    </div>
  );
}
