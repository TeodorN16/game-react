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
import AuthContext from "./contexts/auth-context";
import { logout } from "./api/auth-api";

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
  const logout = async () => {
    const token = auth?.access_token;
    if (!token) return; // nothing to log out of, no request sent
    setAuth(null);
    try {
      await authApi.logout(token);
    } catch (err) {
      console.error(err);
    }
  };
  const contextValue = {
    accessToken: auth?.access_token,
    user: auth?.user,
    isAuthenticated: !!auth,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <Header isAuthenticated={!!auth} />
      {auth && <p>Welcome,{auth.email}</p>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="games/:gameId" element={<GameDetails />} />
        <Route path="/games/create" element={<GameCreate />} />
        <Route path="login" element={<Login onLogin={login} />} />
        <Route path="register" element={<Register onRegister={register} />} />
        <Route path="games/:gameId/edit" element={<GameEdit />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
