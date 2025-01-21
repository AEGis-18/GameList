import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { postAddGame } from "../api/games.api";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserId, getGameInfo } from "../api/games.api";
import Game from "../components/Game";

export default function AddGamePage() {
  const location = useLocation();
  const game = location.state?.game;
  const navigation = useNavigate();

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
      //TODO Go to Games page
      navigation("/games");
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div className=" ">
      <h1 className="text-2xl font-bold mb-4 px-4 mt-24">Add Game</h1>
      <div
        className="flex justify-center h-screen text-xl p-4"
        style={{ color: "#202020" }}
      >
        <div className="p-4 bg-white rounded shadow-md max-w-lg h-fit space-y-4">
          <div>{gameInfo ? <Game game={gameInfo} /> : <p>loading..</p>}</div>
          <form onSubmit={onSubmit}>
            <div className="=flex flex-col ">
              <label>State: </label>
              <select
                className="text-black mx-2 p-1 border bg-gray-100 border-gray-300 rounded-md cursor-pointer"
                {...register("game_state")}
                onChange={onStateChange}
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="=flex flex-col my-2 ">
              <label>Score:</label>
              <select
                className={`text-black mx-2 p-1 text-center border border-gray-300 rounded-md ${
                  gameState === "Pending"
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-gray-100 cursor-pointer"
                }`}
                {...register("score")}
                disabled={gameState === "Pending"}
              >
                {scores.map((score) => (
                  <option
                    key={score}
                    value={score}
                    className="text-black text-sm"
                  >
                    {score}
                  </option>
                ))}
              </select>
            </div>

            <div className="=flex flex-col ">
              <label>Played time:</label>
              <input
                className={`text-black mx-2 p-1 border w-24 border-gray-300 rounded-md ${
                  gameState === "Pending"
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-gray-100"
                }`}
                type="number"
                min="0"
                {...register("played_time")}
                disabled={gameState === "Pending"}
              />
            </div>
            <div className="flex justify-center">
              <input
                type="submit"
                value="Submit"
                className="bg-blue-500 text-white w-fit p-2 rounded mt-6 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
