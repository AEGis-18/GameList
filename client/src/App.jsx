import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GamesPage from "./pages/GamesPage";
import UserListPage from "./pages/UserListPage";
import Navigation from "./components/Navigation";
import AddGamePage from "./pages/AddGamePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div className="font-display">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/games"
            element={
              <PrivateRoute>
                <Navigation />
                <GamesPage></GamesPage>
              </PrivateRoute>
            }
          />
          <Route
            path="/list"
            element={
              <PrivateRoute>
                <Navigation />
                <UserListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-game"
            element={
              <PrivateRoute>
                <Navigation />
                <AddGamePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
