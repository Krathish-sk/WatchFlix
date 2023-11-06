import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Login, Signup, Netflix} from "./pages";

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Netflix />} />
      </Routes>
    </Router>
  );
}