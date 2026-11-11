import { Route, Routes, useNavigate } from "react-router";
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
import { authApi } from "./api";

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);
  const register = async (userData) => {
    //authenticate with supabase auth
    try {
      const result = await authApi.register(userData);
      setAuth(result);

      //redirect to home page
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  const login = async (userData) => {
    try {
      const result = await authApi.login(userData);
      setAuth(result);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  const logoutAction = () => {
    setAuth(null);
  };

  return (
    <>
      <Header isAuthenticated={!!auth} />
      {auth && <p>Welcome,{auth.email}</p>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route
          path="games/:gameId"
          element={<GameDetails user={auth?.user} />}
        />
        <Route path="/games/create" element={<GameCreate />} />
        <Route path="login" element={<Login onLogin={login} />} />
        <Route path="register" element={<Register onRegister={register} />} />
        <Route path="games/:gameId/edit" element={<GameEdit />} />
        <Route path="/logout" element={<Logout onLogout={logoutAction} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
