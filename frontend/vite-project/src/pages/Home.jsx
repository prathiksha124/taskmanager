import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-card">
        <h1> Task Manager</h1>

        <p className="quote">
          "Stay organized. Stay productive. Achieve more."
        </p>

        <button onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;