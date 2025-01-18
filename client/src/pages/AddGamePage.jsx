import { useForm } from "react-hook-form";
import { useState } from "react";
import { postAddGame } from "../api/games.api";
import { useLocation } from "react-router-dom";

export default function AddGamePage() {
  const location = useLocation();
  const game = location.state?.game;

  const scores = Array.from({ length: 10 }, (_, i) => i + 1);
  const states = ["Pending", "Playing", "Finished"];

  const { register, handleSubmit, setValue } = useForm();
  const [gameState, setGameState] = useState("Pending");

  const onStateChange = (event) => {
    setGameState(event.target.value);
    if (event.target.value === "Pending") {
      setValue("score", "");
      setValue("played_time", "");
    }
  };

  const onSubmit = handleSubmit((data) => {
    data["user"] = 2;
    data["game"] = game;
    data.game_state = data.game_state.toLowerCase();
    data.score = Number(data.score);
    data.played_time = Number(data.played_time);
    console.log(data);

    postAddGame(data);
  });

  return (
    <div>
      <p>{game}</p>
      <form onSubmit={onSubmit}>
        <label>State:</label>
        <select {...register("game_state")} onChange={onStateChange}>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <br />

        <label>Score:</label>
        <select {...register("score")} disabled={gameState === "Pending"}>
          {scores.map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>

        <br />
        <label>Played time:</label>
        <input
          type="number"
          min="0"
          {...register("played_time")}
          disabled={gameState === "Pending"}
        />

        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
