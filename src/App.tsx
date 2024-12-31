import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import AddEquipment from "@/pages/AddEquipment";
import Equipment from "@/pages/Equipment";
import AddProject from "@/pages/AddProject";
import Projects from "@/pages/Projects";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/add-equipment" element={<AddEquipment />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}

export default App;