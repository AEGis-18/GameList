import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { postAddGame } from "../api/games.api";
import { useLocation } from "react-router-dom";
import { getUserId, getGameInfo } from "../api/games.api";
import Game from "../components/Game";

export default function AddGamePage() {
  const location = useLocation();
  const game = location.state?.game;

  const scores = Array.from({ length: 10 }, (_, i) => i + 1);
  scores.unshift(null);
  const states = ["Pending", "Playing", "Finished"];

  const { register, handleSubmit, setValue } = useForm();
  const [gameState, setGameState] = useState("Pending");
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    const fetchGameInfo = async () => {
      if (game) {
        try {
          const res = await getGameInfo(game);
          // if (res?.data?.results && res.data.results.length > 0) {
          setGameInfo(res.data.results[0]);
          /* } else {
            console.error("No game info found.");
            setGameInfo(null);
          }*/
        } catch (error) {
          console.error("Error fetching game info:", error);
          setGameInfo(null);
        }
      }
    };

    fetchGameInfo();
  }, [game]);

  const onStateChange = (event) => {
    setGameState(event.target.value);
    if (event.target.value === "Pending") {
      setValue("score", "");
      setValue("played_time", "");
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const user_id = await getUserId();
      data["user"] = user_id.data["user_id"];
      data["game"] = game;
      data.game_state = data.game_state.toLowerCase();
      data.score = data.score === "" ? null : Number(data.score);
      data.played_time =
        data.played_time === "" ? null : Number(data.played_time);

      console.log(data);

      await postAddGame(data);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div>
      {gameInfo ? <Game game={gameInfo} /> : <p>loading..</p>}
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
