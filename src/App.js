import "./App.css";
import Message from "./components/Message";
import Albums from "./components/Albums";
import PlayerPage from "./components/PlayerPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const heart = document.createElement("div");
      heart.className = "cursor-heart";
      heart.style.left = `${e.clientX}px`;
      heart.style.top = `${e.clientY}px`;

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Message />} />

          <Route path="/albums" element={<Albums />} />

          <Route path="/player/:songId" element={<PlayerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
