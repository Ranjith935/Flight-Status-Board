import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles.css';
import FlightBoard from "./FlightBoard";
import FlightDetails from "./FlightDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightBoard />} />
        <Route path="/flights/:id" element={<FlightDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
