import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import BusResults from "./components/BusResults";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/bus-results/:source/:destination/:journeyDate" element={<BusResults />} />
      </Routes>
    </Router>
  );
};

export default App;
