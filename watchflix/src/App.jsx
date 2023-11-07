import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Signup, Netflix, Player } from "./pages";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Netflix />} />
          <Route path="/player" element={<Player />} />
        </Routes>
      </Router>
    </>
  );
}
