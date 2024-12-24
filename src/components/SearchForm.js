import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const navigate = useNavigate();

  const searchBuses = (e) => {
    e.preventDefault();

    if (source && destination && journeyDate) {
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

export default SearchForm;
