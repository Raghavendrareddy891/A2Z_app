import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BusResults = () => {
  const { source, destination, journeyDate } = useParams();
  const [busData, setBusData] = useState(null);
  const [error, setError] = useState(null);

  const fetchBusData = async () => {
    try {
      const response = await fetch(
        `http://192.168.31.49:5000/get_buses?source=${source}&destination=${destination}&jdate=${journeyDate}`
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

export default BusResults;
