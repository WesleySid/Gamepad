import { useState } from "react";
import Header from "./routes/Header";
import Home from "./routes/Home";
import Footer from "./routes/Footer";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./routes/Game";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/games/:id" element={<Game></Game>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
