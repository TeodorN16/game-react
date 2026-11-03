import { Link } from "react-router";

export default function Header({ isAuthenticated }) {
  return (
    <header>
      {/* <!-- Navigation --> */}
      <nav>
        <Link className="home" to="/">
          {" "}
          <img src="./images/logo.png" alt="logo" />{" "}
        </Link>
        <Link to="/catalog">Catalog</Link>
        {/* <!-- Logged-in users --> */}
        {isAuthenticated ? (
          <div id="user">
            <Link to="games/create">Add Game</Link>
            <a href="/logout">Logout</a>
          </div>
        ) : (
          <div id="guest">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
        {/* <!-- Guest users --> */}
      </nav>
    </header>
  );
}
