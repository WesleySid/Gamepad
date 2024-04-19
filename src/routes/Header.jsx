//import logo from "/Users/wesleysid/GamePad/my-react-app/img/logo.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    // Mettre à jour showResults seulement si la barre de recherche n'est pas vide
    setShowResults(!!value);
  };
  const handleSubmit = async (event) => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=7860ec0e9ebb4fa89176f2c7dd732512&search=${searchTerm}`
      );
      const results = response.data.results;
      console.log("Search Results:", results); // Ajout du console.log
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      handleSubmit();
    }
  }, [searchTerm]);

  return (
    <div className="head-container">
      <div className="header">
        <Link to="/">{/*<img src={logo} alt="Logo" /> */}</Link>
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

        <button className="head-button">LOG IN</button>
        <button className="head-button">SIGN UP</button>
        <button className="head-button">API</button>

        <button className="menu-toggle" onClick={toggleMenu}>
          Menu
        </button>

        <div className={menuActive ? "menu-active" : "menu"}>
          <button onClick={toggleMenu}>X</button>
          <button>LOG IN</button>
          <button>SIGN UP</button>
          <button>API</button>
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
                <li>
                  <img
                    src={result.image_background}
                    className="search-logo"
                    alt=""
                  />
                  <span className="search-title"> {result.name}</span>
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
