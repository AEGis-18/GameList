import { useEffect, useState } from "react";
import { getAllGames } from "../api/games.api";
import ListGames from "./ListGames";
import Pagination from "./Pagination";

export default function GameCatalog({ user }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(30);
  const [totalGames, setTotalGames] = useState(0);

  useEffect(() => {
    setLoading(true);
    async function loadGames() {
      try {
        const res = await getAllGames(currentPage, gamesPerPage);
        setGames(res.data.results);
        setTotalGames(res.data.count);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadGames();
  }, [currentPage, gamesPerPage]);
  console.log(totalGames);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-24">
      <ListGames gamesList={games} loading={loading} />
      <Pagination
        gamesPerPage={gamesPerPage}
        totalGames={totalGames}
        paginate={paginate}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
}
