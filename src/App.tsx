import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import AddEquipment from "@/pages/AddEquipment";
import AddTechnician from "@/pages/AddTechnician";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/add-equipment" element={<AddEquipment />} />
        <Route path="/add-technician" element={<AddTechnician />} />
      </Routes>
    </Router>
  );
}

export default App;