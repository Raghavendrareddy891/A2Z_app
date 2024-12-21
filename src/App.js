import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./index.css";

// SearchForm Component to handle search input
const SearchForm = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const navigate = useNavigate(); // Hook to navigate to another page

  const searchBuses = async (e) => {
    e.preventDefault();

    if (source && destination && journeyDate) {
      // Redirect to the bus results page with parameters in the URL
      navigate(`/bus-results/${source}/${destination}/${journeyDate}`);
    }
  };

  return (
    <div className="search-form">
      <h1>Bus Ticket Search</h1>

      <form onSubmit={searchBuses}>
        <div className="form-field">
          <label>From:</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Enter source city"
          />
        </div>
        <div className="form-field">
          <label>To:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination city"
          />
        </div>
        <div className="form-field">
          <label>Journey Date:</label>
          <input
            type="date"
            value={journeyDate}
            onChange={(e) => setJourneyDate(e.target.value)}
          />
        </div>
        <button type="submit" className="search-btn">Search Buses</button>
      </form>
    </div>
  );
};

// BusResults Component to display bus data
const BusResults = () => {
  const { source, destination, journeyDate } = useParams(); // Get parameters from URL
  const [busData, setBusData] = useState(null);
  const [error, setError] = useState(null);

  const fetchBusData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_buses?source=${source}&destination=${destination}&jdate=${journeyDate}`
      );
      const data = await response.json();
      if (data.serviceDetailsList) {
        setBusData(data.serviceDetailsList);
      } else {
        setError("No buses found for the given criteria.");
      }
    } catch (err) {
      setError("Failed to fetch bus data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchBusData();
  }, [source, destination, journeyDate]);

  return (
    <div className="bus-results-page">
      <h1>Bus Results</h1>
      {error && <p className="error">{error}</p>}
      {busData && (
        <div className="bus-results">
          {busData.map((bus, index) => (
            <div key={index} className="bus-card">
              <div className="bus-info">
                <h3>{bus.travelerAgentName}</h3>
                <p><strong>Bus Type:</strong> {bus.busTypeName}</p>
                <p><strong>Start Time:</strong> {bus.startTime}</p>
                <p><strong>Arrival Time:</strong> {bus.arriveTime}</p>
                <p><strong>Travel Time:</strong> {bus.travelTime}</p>
                <p><strong>Seats Available:</strong> {bus.availableSeats}</p>
                <p className="fare">Fare: ₹{bus.fare}</p>
              </div>
              <div className="actions">
                <button className="book-btn">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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
