import { useEffect, useState } from "react";
import { getAllGames } from "../api/games.api";
import Game from "./Game";

export default function GameCatalog() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function loadGames() {
      try {
        const res = await getAllGames();
        setGames(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadGames();
  }, []);

  return (
    <div>
      <h1>Game Catalog</h1>
      {games.map((game) => (
        <Game key={game.id} game={game}></Game>
      ))}
    </div>
  );
}
