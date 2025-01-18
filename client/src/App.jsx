import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GamesPage from "./pages/GamesPage";
import UserListPage from "./pages/UserListPage";
import Navigation from "./components/Navigation";
import AddGamePage from "./pages/AddGamePage";

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/games" />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/list" element={<UserListPage />} />
        <Route path="/add-game" element={<AddGamePage />} />
      </Routes>
    </BrowserRouter>
  );
}
