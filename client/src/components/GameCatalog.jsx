import { useEffect, useState } from "react";
import { getAllGames } from "../api/games.api";
import ListGames from "./ListGames";
import Pagination from "./Pagination";

export default function GameCatalog() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(3);

  useEffect(() => {
    setLoading(true);
    async function loadGames() {
      try {
        const res = await getAllGames();
        setGames(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadGames();
  }, []);

  const indexLastGame = currentPage * gamesPerPage;
  const indexFirstGame = indexLastGame - gamesPerPage;
  const currentGames = games.slice(indexFirstGame, indexLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <ListGames gamesList={currentGames} loading={loading} />
      <Pagination
        gamesPerPage={gamesPerPage}
        totalGames={games.length}
        paginate={paginate}
      ></Pagination>
    </div>
  );
}
