import './App.css';
import { Routes, Route} from "react-router-dom";
import Welcome from "./Welcome.js";
import Game from "./Game.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="game" element={<Game />} />
    </Routes>
  );
}

export default App;
