import axios from "axios";

/*
const gameApi = axios.Axios.create({
  baseURL: "http://localhost:8000/server/api/v1/games/",
});
*/

export const getAllGames = (currentPage = 1) => {
  return axios.get("http://localhost:8000/server/api/v1/games/", {
    params: { page: currentPage },
  });
};

export const getUserGames = (currentPage = 1, user) => {
  return axios.get("http://localhost:8000/server/api/v1/games/", {
    params: { page: currentPage, user: user },
  });
};

export const getGameInfo = (game_id) => {
  return axios.get(
    `http://localhost:8000/server/api/v1/games/${toString(game_id)}/`
  );
};

export const postAddGame = (game_info) => {
  return axios.post(
    "http://localhost:8000/server/api/v1/game-lists/",
    game_info
  );
};
