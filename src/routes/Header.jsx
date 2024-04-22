import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import logo from "/img/logo.jpg";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("Header monté");

    // Vérifie si l'utilisateur est authentifié lors du chargement du composant
    const checkAuthentication = () => {
      const token = Cookies.get("token");
      setIsAuthenticated(!!token); // Définit isAuthenticated sur true si un jeton est présent
    };
    checkAuthentication();
  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowResults(!!value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=7860ec0e9ebb4fa89176f2c7dd732512&search=${searchTerm}`
      );
      const results = response.data.results;
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("isAuthenticated:", isAuthenticated); // Ajout du console.log

  return (
    <div className="head-container">
      <div className="header">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <button>Rate top games !</button>
        <div className="searchbar-container">
          <input
            type="search"
            className="searchbar"
            placeholder="Search 865983 games"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {!isAuthenticated && (
          <>
            <Link to="/login">
              <button className="head-button">LOG IN</button>
            </Link>
            <Link to="/signup">
              <button className="head-button">SIGN UP</button>
            </Link>
          </>
        )}
        {isAuthenticated && <button className="head-button">FAVORITES</button>}
        <Link to="/profile">
          {isAuthenticated && (
            <button className="head-button">MY PROFILE</button>
          )}
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          Menu
        </button>
        <div className={menuActive ? "menu-active" : "menu"}>
          <button onClick={toggleMenu}>X</button>
          {!isAuthenticated && (
            <>
              <Link to="/login">
                <button>LOG IN</button>
              </Link>
              <Link to="/signup">
                <button>SIGN UP</button>
              </Link>
            </>
          )}
          {isAuthenticated && <button>FAVORITES</button>}
          <button>Rate top games !</button>
        </div>
      </div>
      {showResults && (
        <div className="search-results">
          <ul>
            {searchResults.map((result) => (
              <Link
                key={result.id}
                to={`/games/${result.id}?key=7860ec0e9ebb4fa89176f2c7dd732512`}
              >
                <li className="search-list">
                  <img
                    src={result.background_image}
                    className="search-logo"
                    alt=""
                  />
                  <span className="search-title">{result.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
