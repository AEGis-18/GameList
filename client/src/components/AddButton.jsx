import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddButton({ game_id }) {
  const navigate = useNavigate();

  const handleAddGame = (game_id) => {
    navigate("/add-game", { state: { game: game_id } });
  };

  return (
    <div>
      <button onClick={() => handleAddGame(game_id)}>Add Game</button>
    </div>
  );
}
