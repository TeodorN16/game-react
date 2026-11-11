import { Route, Routes } from "react-router";
import Catalog from "./components/catalog/Catalog";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import GameDetails from "./components/game-details/GameDetails";
import GameCreate from "./components/game-create/GameCreate";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import GameEdit from "./components/game-edit/GameEdit";
import { useState } from "react";
import Logout from "./components/logout/Logout";
import request from "./utills/request";
import { register } from "./api/auth-api";

function App() {
  const [user, setUser] = useState(null);
  const userAuthHandler = async (userData) => {
    //authenticate with supabase auth
    try {
      const result = await register(userData);
      console.log(result);
    } catch (error) {
      alert(error.message);
    }
  };
  const logoutAction = () => {
    setUser(null);
  };

  return (
    <>
      <Header isAuthenticated={!!user} />
      {user && <p>Welcome,{user.email}</p>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="games/:gameId" element={<GameDetails user={user} />} />
        <Route path="/games/create" element={<GameCreate />} />
        <Route path="login" element={<Login onLogin={userAuthHandler} />} />
        <Route
          path="register"
          element={<Register onRegister={userAuthHandler} />}
        />
        <Route path="games/:gameId/edit" element={<GameEdit />} />
        <Route path="/logout" element={<Logout onLogout={logoutAction} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
