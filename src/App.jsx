import { useState } from "react";
import Header from "./routes/Header";
import Home from "./routes/Home/Home";
import Footer from "./routes/Footer";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./routes/Home/Game";
function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/games/:id" element={<Game></Game>}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
