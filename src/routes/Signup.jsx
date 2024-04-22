import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    picture: null,
    previewImage: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`Champ ${name} mis à jour avec la valeur :`, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Fichier sélectionné :", file.name);
      setFormData((prevState) => ({
        ...prevState,
        picture: file,
        // Mise à jour de l'aperçu de l'image
        previewImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!formData || !formData.picture) {
        console.error("Le formulaire est vide ou l'image est manquante");
        return;
      }

      console.log("Données du formulaire soumises :", formData);

      const formDataObject = new FormData();
      formDataObject.append("email", formData.email);
      formDataObject.append("username", formData.username);
      formDataObject.append("password", formData.password);
      formDataObject.append("picture", formData.picture);

      console.log(
        "Données du formulaire converties en objet FormData :",
        formDataObject
      );

      const response = await axios.post(
        "http://localhost:3000/signup",
        formDataObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Réponse du serveur :", response.data);

      console.log("Votre compte a été créé avec succès !");
      Cookies.set("token", response.data.token, { expires: 7 });
    } catch (error) {
      console.error(
        "Erreur lors de la soumission du formulaire :",
        error.response.data
      );
    }
  };

  return (
    <>
      <main className="main-signup">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Create an account</h1>
          {formData.previewImage && (
            <img
              className="preview-pic"
              src={formData.previewImage}
              alt="Preview"
            />
          )}
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <input
            type="file"
            accept="image/*"
            name="picture"
            onChange={handleFileChange}
          />

          <button type="submit">Sign Up</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </main>
    </>
  );
};

export default Signup;
