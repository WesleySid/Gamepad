import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import logo from "/img/logo.jpg";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = Cookies.get("token");
      setIsAuthenticated(!!token);
    };
    checkAuthentication();
  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Fonction pour gérer les changements dans la barre de recherche
  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim() !== "") {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=7860ec0e9ebb4fa89176f2c7dd732512&search=${value}`
        );
        const results = response.data.results;
        setSearchResults(results);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Affichage des résultats de recherche lorsqu'ils sont disponibles
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

      {searchResults.length > 0 && (
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
