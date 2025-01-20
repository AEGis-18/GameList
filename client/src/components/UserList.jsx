import { useState, useEffect } from "react";
import { getUserId, getUserList, getGameInfo } from "../api/games.api";
import UserListItem from "./UserListItem";
import Pagination from "./Pagination";

export default function UserList() {
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [userGames, setUserGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalGames, setTotalGames] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(30);

  useEffect(() => {
    setLoading(true);
    async function fetchUserId() {
      try {
        const userRes = await getUserId();
        const userId = userRes.data?.user_id;
        setUser(userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserId();
  }, []);

  useEffect(() => {
    async function loadUserItems() {
      try {
        const listRes = await getUserList(currentPage, user);
        setUserList(listRes.data.results);
        setTotalGames(listRes.data.count);
      } catch (error) {
        console.log("Error fetching user list", error);
      }
    }

    loadUserItems();
  }, [user, currentPage]);

  useEffect(() => {
    async function loadUserGames() {
      try {
        const gameIds = userList.map((item) => item.game);
        const gameInfo = gameIds.map((gameId) =>
          getGameInfo(gameId).then((res) => res.data.results)
        );

        const gameDetails = await Promise.all(gameInfo);
        setUserGames(gameDetails);
      } catch (error) {
        console.log("Error fetching game info", error);
      }
    }

    loadUserGames();
  }, [userList]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <UserListItem userList={userList} userGames={userGames} />
      <Pagination
        gamesPerPage={gamesPerPage}
        totalGames={totalGames}
        paginate={paginate}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
}
