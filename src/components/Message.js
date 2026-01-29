import { useNavigate } from "react-router-dom";

export default function Message({ onNext }) {
  const navigate = useNavigate();
  return (
    <section className="message">
      <h2>This is for you Bubby</h2>
      <p>
        I can't believe we are approaching the one year mark when I first met
        you in person. Our year has been pretty crazy with highs, lows,
        excitement, uncertainty, but most importantly a connection that has
        always felt real no matter where we were. You being in my life and
        sharing a connection with you feels genuine, grounding, and special. I
        wish I could be in person with you now, but at least I know we will be
        sharing so many special trips in the future.
      </p>
      <p>Thank you for being you.</p>
      <button className="next-button" onClick={() => navigate("/albums")}>
        Next →
      </button>
    </section>
  );
}
