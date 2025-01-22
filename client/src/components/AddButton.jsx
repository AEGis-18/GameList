import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddButton({ game_id }) {
  const navigate = useNavigate();

  const handleAddGame = (game_id) => {
    navigate("/add-game", { state: { game: game_id } });
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white w-full p-2 rounded mt-6 justify-end cursor-pointer"
        onClick={() => handleAddGame(game_id)}
      >
        Add Game
      </button>
    </div>
  );
}
