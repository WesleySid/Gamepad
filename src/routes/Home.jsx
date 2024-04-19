import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import xboxLogo from "/img/xbox-logo.jpg";
import ps4Logo from "/img/logo-play.jpg";
import pcLogo from "/img/logowindows.jpg";
import macLogo from "/img/mac-logo.jpg";

const Home = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=7860ec0e9ebb4fa89176f2c7dd732512&page=${currentPage}`
        );
        setGames(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 20)); // 20 jeux par page
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchGames();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getPlatformLogo = (platforms) => {
    // Convertir le nom de la plateforme en minuscules pour une correspondance insensible à la casse
    for (let platform of platforms) {
      const platformName = platform.platform.name.toLowerCase();

      // Vérifier le nom de la plateforme et retourner le logo approprié
      if (platformName.includes("mac")) {
        return macLogo;
      } else if (platformName.includes("playstation")) {
        return ps4Logo;
      } else if (platformName.includes("xbox")) {
        return xboxLogo;
      }
    }

    // Si la plateforme n'est pas reconnue, retourner null
    return null;
  };

  return (
    <>
      <main>
        <div className="menu-gauche">Menu à gauche</div>
        <div className="main">
          <h1 className="main-title">New and trending</h1>
          <h1 className="second-title">Top Picks </h1>
          <p>Based on player counts and release date</p>
          <div>FILTRE</div>
          <div className="game-list">
            {games.map((game) => (
              <div key={game.id} className="game">
                <div
                  className="game-image"
                  style={{ backgroundImage: `url(${game.background_image})` }}
                ></div>
                {game.platforms && game.platforms.length > 0 && (
                  <img
                    src={getPlatformLogo(game.platforms)}
                    alt={game.platforms[0].platform.name}
                    className="platform-logo"
                  />
                )}
                <Link
                  to={`/games/${game.id}?key=7860ec0e9ebb4fa89176f2c7dd732512`}
                >
                  <h2>{game.name}</h2>
                </Link>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
