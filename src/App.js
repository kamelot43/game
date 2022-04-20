import './App.css';
import { Routes, Route} from "react-router-dom";
import Welcome from "./Welcome.js";
import Result from "./Result.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="result" element={<Result />} />
    </Routes>
  );
}

export default App;
