import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const albums = [
  {
    cover: "/albums/will.jpg",
    title: "She Will Never Know",
    artist: "Loving Caliber",
    highlightWord: "Will",
  },
  {
    cover: "/albums/you.jpg",
    title: "You & I",
    artist: "One Direction",
    highlightWord: "You",
  },
  {
    cover: "/albums/be.jpg",
    title: "You're Beautiful",
    artist: "James Blunt",
    highlightWord: "Be",
  },
  {
    cover: "/albums/my.jpg",
    title: "My Tears Ricochet",
    artist: "Taylor Swift",
    highlightWord: "My",
  },
];

function highlightTitle(title, highlightWord, highlightOn) {
  if (!highlightOn || !highlightWord) return title;

  if (title === "You're Beautiful") {
    return title.split(" ").map((word, idx) => {
      if (word === "Beautiful") {
        return (
          <span key={idx}>
            <span className="highlight-word">{word.slice(0, 2)}</span>
            {word.slice(2)}{" "}
          </span>
        );
      }
      return word + " ";
    });
  }

  return title.split(" ").map((word, idx) => {
    const cleaned = word.replace(/[.,!?]/g, "").toLowerCase();
    if (highlightWord.toLowerCase() === cleaned) {
      return (
        <span key={idx} className="highlight-word">
          {word}{" "}
        </span>
      );
    }
    return word + " ";
  });
}

export default function Albums() {
  const handleReset = () => {
    setVisitedAlbums(new Set());
    setHighlightOn(false);
    setShowConfetti(false);
    sessionStorage.removeItem("visitedAlbums");
  };
  const [showYesModal, setShowYesModal] = useState(false);
  const [audio] = useState(() => new Audio("/audio/valentine.mp3"));
  const noMessages = [
    "Are you sure?",
    "Are you misclicking your cursor?",
    "Please read the question carefully",
    "Are you sure you want to do this?",
  ];
  const [showNoModal, setShowNoModal] = useState(false);
  const [noMessage, setNoMessage] = useState("");

  const [noClickCount, setNoClickCount] = useState(0);

  const navigate = useNavigate();

  const [visitedAlbums, setVisitedAlbums] = useState(() => {
    const saved = sessionStorage.getItem("visitedAlbums");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [highlightOn, setHighlightOn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAlbumClick = (index) => {
    setVisitedAlbums((prev) => new Set(prev).add(index));
    navigate(`/player/${index}`);
  };

  useEffect(() => {
    sessionStorage.setItem(
      "visitedAlbums",
      JSON.stringify(Array.from(visitedAlbums)),
    );
  }, [visitedAlbums]);

  const toggleHighlight = () => {
    if (visitedAlbums.size !== albums.length) return;
    setHighlightOn((prev) => !prev);
    setShowConfetti(false);
  };

  const handleYes = () => {
    setShowConfetti(true);
    setShowYesModal(true);

    audio.volume = 0.7;
    audio.play();
  };

  return (
    <section className="albums">
      <h2>Click into every song 💿</h2>

      <div className="album-grid">
        {albums.map((album, index) => (
          <div
            key={index}
            className="album-card"
            onClick={() => handleAlbumClick(index)}
            style={{ cursor: "pointer" }}
          >
            <img src={album.cover} alt={album.title} />
            <h3>
              {highlightTitle(album.title, album.highlightWord, highlightOn)}
            </h3>
            <p>{album.artist}</p>
          </div>
        ))}
      </div>

      <div className="album-buttons-container" style={{ marginTop: "2rem" }}>
        <div
          className="album-buttons-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <button
            className="reveal-button"
            onClick={toggleHighlight}
            disabled={visitedAlbums.size !== albums.length}
          >
            Press me
          </button>

          <span
            style={{
              fontSize: "1rem",
              color: "#777",
              minWidth: "50px",
              textAlign: "center",
            }}
          >
            {visitedAlbums.size} / {albums.length}
          </span>

          <button
            className="back-button"
            onClick={() => navigate(-1)}
            style={{ marginLeft: "1rem" }}
          >
            ← Back
          </button>
        </div>

        {/* Reset button under the row */}
        {highlightOn && (
          <>
            <button onClick={handleReset} className="reset-button">
              reset
            </button>

            <h2 className="proposal-text">VALENTINE 💖</h2>

            <div className="answer-buttons">
              <button className="yes-button" onClick={handleYes}>
                Yes
              </button>
              <button
                className="no-button"
                onClick={() => {
                  const message = noMessages[noClickCount % noMessages.length];
                  setNoMessage(message);
                  setShowNoModal(true);
                  setNoClickCount((prev) => prev + 1);
                }}
              >
                No
              </button>
            </div>

            {showConfetti && (
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            )}
          </>
        )}
      </div>
      {showYesModal && (
        <div className="yes-modal-overlay">
          <div className="yes-modal">
            <h1>My Valentine!!! 💖</h1>
            <p>I love you!</p>

            <button
              className="back-button"
              onClick={() => {
                audio.pause();
                audio.currentTime = 0;
                setShowYesModal(false);
                setShowConfetti(false);
              }}
            >
              ← Go back
            </button>
          </div>
        </div>
      )}
      {showNoModal && (
        <div className="no-modal-overlay">
          <div className="no-modal">
            <p>{noMessage}</p>
            <button
              className="no-modal-button"
              onClick={() => setShowNoModal(false)}
            >
              ok
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
