import axios from "axios";

export const getAllGames = (currentPage = 1) => {
  return axios.get("http://localhost:8000/server/api/v1/games/", {
    params: { page: currentPage },
  });
};

export const getGameInfo = (game_id) => {
  return axios.get(
    `http://localhost:8000/server/api/v1/games/${toString(game_id)}/`
  );
};
