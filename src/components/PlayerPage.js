import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const albums = [
  {
    cover: "/albums/will.jpg",
    title: "She Will Never Know",
    artist: "Loving Caliber",
    audio: "/audio/will.mp3",
    photos: [
      "/photos/will/1.jpg",
      "/photos/will/2.jpg",
      "/photos/will/3.jpg",
      "/photos/will/4.jpg",
      "/photos/will/5.jpg",
      "/photos/will/6.jpg",
      "/photos/will/7.jpg",
      "/photos/will/8.jpg",
      "/photos/will/9.jpg",
      "/photos/will/10.jpg",
      "/photos/will/11.jpg",
      "/photos/will/12.jpg",
      "/photos/will/13.jpg",
    ],
  },
  {
    cover: "/albums/you.jpg",
    title: "You & I",
    artist: "One Direction",
    audio: "/audio/you.mp3",
    photos: [
      "/photos/you/1.jpg",
      "/photos/you/2.jpg",
      "/photos/you/3.jpg",
      "/photos/you/4.jpg",
      "/photos/you/5.jpg",
      "/photos/you/6.jpg",
      "/photos/you/7.jpg",
      "/photos/you/8.jpg",
      "/photos/you/9.jpg",
      "/photos/you/10.jpg",
    ],
  },
  {
    cover: "/albums/be.jpg",
    title: "You're Beautiful",
    artist: "James Blunt",
    audio: "/audio/be.mp3",
    photos: [
      "/photos/be/1.jpg",
      "/photos/be/2.jpg",
      "/photos/be/3.png",
      "/photos/be/4.jpg",
      "/photos/be/5.jpg",
      "/photos/be/6.jpg",
      "/photos/be/7.jpg",
      "/photos/be/8.jpg",
      "/photos/be/9.jpg",
    ],
  },
  {
    cover: "/albums/my.jpg",
    title: "My Tears Ricochet",
    artist: "Taylor Swift",
    audio: "/audio/my.mp3",
    photos: [
      "/photos/my/1.jpg",
      "/photos/my/2.jpg",
      "/photos/my/3.jpg",
      "/photos/my/4.jpg",
      "/photos/my/5.jpg",
      "/photos/my/6.jpg",
      "/photos/my/7.jpg",
      "/photos/my/8.jpg",
      "/photos/my/9.jpg",
      "/photos/my/10.jpg",
    ],
  },
];

export default function PlayerPage() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const album = albums[songId];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoIndex((prev) =>
        prev === album.photos.length - 1 ? 0 : prev + 1,
      );
    }, 3000); // 4 seconds feels romantic, not hectic

    return () => clearInterval(interval);
  }, [album.photos.length]);

  const [photoIndex, setPhotoIndex] = useState(0);

  const handlePrev = () => {
    setPhotoIndex((prev) => (prev === 0 ? album.photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setPhotoIndex((prev) => (prev === album.photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="player-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <h2 className="album-title">{album.title}</h2>

      {/* Photo viewer with side buttons */}
      <div className="photo-viewer">
        <button className="photo-nav left" onClick={handlePrev}>
          ‹
        </button>

        <img
          key={photoIndex}
          src={album.photos[photoIndex]}
          alt=""
          className="gallery-photo fade"
        />

        <button className="photo-nav right" onClick={handleNext}>
          ›
        </button>
      </div>

      <audio src={album.audio} autoPlay controls className="audio-player" />
    </div>
  );
}
