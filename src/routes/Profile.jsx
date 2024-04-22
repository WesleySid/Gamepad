import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token"); // Récupérer le token depuis le localStorage ou les cookies
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = () => {
    // Supprimer le token du localStorage et des cookies
    localStorage.removeItem("token");
    Cookies.remove("token");

    setTimeout(() => {
      navigate("/");
    }, 1000); // Délai de 3 secondes avant la redirection
  };

  return (
    <>
      {profileData ? (
        <div>
          <h1>Hello {profileData.username}</h1>
          {profileData.profilePictureUrl && (
            <img
              src={profileData.profilePictureUrl}
              className="preview-pic"
              alt="Profile"
            />
          )}
          <p>Username {profileData.username}</p>
          <p>Email: {profileData.email}</p>
          <button onClick={handleLogout}>Se déconnecter</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </>
  );
};

export default Profile;
