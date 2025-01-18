import axios from "axios";

const gamesApi = axios.create({
  baseURL: "http://localhost:8000/server/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

gamesApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllGames = (currentPage = 1) => {
  return gamesApi.get("games/", {
    params: { page: currentPage },
  });
};

export const getUserGames = (currentPage = 1, user) => {
  return gamesApi.get("games/", {
    params: { page: currentPage, user: user },
  });
};

export const getGameInfo = (game_id) => {
  return gamesApi.get(`/games/${toString(game_id)}/`);
};

export const postAddGame = (game_info) => {
  return gamesApi.post("game-lists/", game_info);
};

export default gamesApi;
