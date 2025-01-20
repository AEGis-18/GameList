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
    <div>
      <h2>Sign In</h2>
      <form onSubmit={signin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign in</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
