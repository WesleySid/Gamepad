import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import reddit from "/Users/wesleysid/GamePad/my-react-app/img/reddit-logo.jpg";
import axios from "axios";

// Fonction pour supprimer les balises HTML de la description
const removeHTMLTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const Game = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [game2, setGame2] = useState(null);
  const [game3, setGame3] = useState([]);
  const [shortScreenshots, setShortScreenshots] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=7860ec0e9ebb4fa89176f2c7dd732512`
        );
        console.log(response.data);
        setGame(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=7860ec0e9ebb4fa89176f2c7dd732512`
        );
        console.log(response.data);
        setGame2(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}/additions?key=7860ec0e9ebb4fa89176f2c7dd732512`
        );
        console.log(response.data);
        setGame3(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchShortScreenshots = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=7860ec0e9ebb4fa89176f2c7dd732512`
        );
        console.log("Rawg API response:", response.data);
        const gameResult = response.data.results.find(
          (result) => result.id === parseInt(id, 10)
        );
        console.log("Game result:", gameResult);
        if (gameResult) {
          setShortScreenshots(gameResult.short_screenshots);
        } else {
          console.warn("Game not found with ID:", id);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchShortScreenshots();
  }, [id]);

  if (isLoading) {
    return <p>Chargement en cours...</p>;
  }

  if (!game) {
    return <p>Aucun jeu trouvé avec l'ID {id}</p>;
  }

  return (
    <div className="main-game">
      <div className="menu-gauche">Menu à gauche</div>

      <div className="game-container-gauche2">
        <div className="gauche1">
          <h1>{game.name}</h1>
          <img src={game.background_image}></img>
          <div className="add-buttons">
            <button>Add to my games</button>
            <button>Add to wishlist</button>
            <button>Save to collection</button>
          </div>
          {game.ratings && game.ratings.length > 0 && (
            <div className="ratings">
              <div
                className="rating-bar"
                style={{
                  width: `${game.ratings[0].percent || 0}%`,
                  backgroundColor: "#00cc00",
                }}
              >
                <h2>{game.ratings[0].title} 🤩</h2>
                <span>{game.ratings[0].count}</span>
              </div>
              <div
                className="rating-bar"
                style={{
                  width: `${game.ratings[1].percent || 0}%`,
                  backgroundColor: "#ffcc00",
                }}
              >
                <h2>{game.ratings[1].title} 👍🏼</h2>
                <span>{game.ratings[1].count}</span>
              </div>
              <div
                className="rating-bar"
                style={{
                  width: `${game.ratings[2].percent || 0}%`,
                  backgroundColor: "#ff9900",
                }}
              >
                <h2>{game.ratings[2].title} 😐</h2>
                <span>{game.ratings[2].count}</span>
              </div>
              <div
                className="rating-bar"
                style={{
                  width: `${game.ratings[3].percent || 0}%`,
                  backgroundColor: "#ff3300",
                }}
              >
                <h2>{game.ratings[3].title} ❌</h2>
                <span>{game.ratings[3].count}</span>
              </div>
              <div className="comment-button-container">
                <button className="comment-button">Write a review</button>
                <button className="comment-button">Write a comment</button>
              </div>
            </div>
          )}
        </div>
        <div className="droite1">
          <div className="desc-container">
            <div className="desc">
              <h4>Platforms</h4>
              <ul>
                {game.parent_platforms.map((item, index) => (
                  <li key={index}>{item.platform.name}</li>
                ))}
              </ul>
            </div>

            <div className="desc">
              <h4>Genre</h4>
              <ul>
                {game.genres.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            </div>

            <div className="desc">
              <h4>Release date</h4>
              <span>{game.released}</span>
            </div>
            <div className="desc">
              <h4>Developer</h4>
              <ul>
                {game.developers.map((item, index) => (
                  <li key={index}> {item.name}</li>
                ))}
              </ul>
            </div>
            <div className="desc">
              <h4>Publisher</h4>
              <ul>
                {game.publishers.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            </div>
            <div className="desc">
              <h4>Other games in the series</h4>
              <ul>
                {game.alternative_names.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="desc">
              <h4>Tags</h4>
              <ul>
                {game.tags.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            </div>

            <div className="game-synopsis">
              {removeHTMLTags(game.description)}
            </div>
            <div className="require-desc">
              <h3>System requirement for PC</h3>
              {game2 &&
                game2.results &&
                game2.results.length > 0 &&
                game2.results[0].platforms &&
                game2.results[0].platforms.map((platform) => {
                  if (platform.platform.slug === "pc") {
                    return (
                      <div key={platform.platform.id}>
                        <p>{platform.requirements_en.recommended}</p>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
            <div className="dlc-container">
              <h3>Similar games and DLCs</h3>
              {game3.map((dlc) => (
                <div className="dlc" key={dlc.id}>
                  <h5>{dlc.name}</h5>
                  <img src={dlc.background_image} alt="" />
                  <div className="dlc-screen">
                    <ul className="screen-list">
                      {dlc.short_screenshots.map((screenshot, index) => (
                        <li key={index}>
                          <img
                            src={screenshot.image}
                            alt={`Screenshot ${index}`}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="game-container2">
        <div>
          <ul className="additionnal-images">
            {shortScreenshots.map((screenshot) => (
              <li key={screenshot.id}>
                <img
                  src={screenshot.image}
                  alt={`Screenshot ${screenshot.id}`}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="release">
          <span className="release-span"> {game.released}</span>
          <span>Average playtime :{game.playtime} </span>
        </div>

        <div className="media">
          <a href={game.reddit_url}>
            <img src={reddit} alt="" className="social-link" />
          </a>
        </div>
        <div className="buy-options">
          <h4>Where to buy</h4>
          <ul>
            {game.stores.map((item, index) => (
              <li className="platform-list" key={index}>
                <img
                  className="store-logo"
                  src={item.store.image_background}
                  alt=""
                />
                {item.store.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Game;
