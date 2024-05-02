import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = Cookies.get("token");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        console.log("Authentification réussie !");
        Cookies.set("token", response.data.token, { expires: 7 });
        localStorage.setItem("token", response.data.token);
        console.log("Token défini :", response.data.token);
        setIsAuthenticated(true);

        setTimeout(() => {
          navigate("/");
        }, 3000); // Délai de 3 secondes avant la redirection
      }
    } catch (error) {
      alert(
        "L'authentification a échoué. Veuillez vérifier vos informations d'identification."
      );
    }
  };
  return isAuthenticated ? (
    <div className="already-logged">
      <h1>Déjà connecté au compte de {username}</h1>
      <Link to="/">
        <button className="signupbutton">Retour au menu principal</button>
      </Link>
      <button
        onClick={() => {
          Cookies.remove("token");
          setIsAuthenticated(false);
        }}
      >
        Se déconnecter
      </button>
    </div>
  ) : (
    <main className="main-signup">
      <div className="signup-div">
        <form className="signupUL">
          <h1>Login</h1>
          <input
            type="text"
            placeholder=" Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            className="signupbutton"
            type="button"
            value="Se connecter"
            onClick={handleLogin}
          />
          <Link to="/signup">
            <button className="">No account yet ? Register first !</button>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default Login;
