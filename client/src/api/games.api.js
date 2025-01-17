import axios from "axios";

export const getAllGames = () => {
  return axios.get("http://localhost:8000/server/api/v1/games/");
};
