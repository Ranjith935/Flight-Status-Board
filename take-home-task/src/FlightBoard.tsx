import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Define the Flight interface to describe the structure of a flight object
interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

const FlightBoard = () => {
  const [flights, setFlights] = useState<Flight[]>([]); // Type flights as Flight[]
  const [error, setError] = useState<string | null>(null);

  const fetchFlights = async () => {
    try {
      const response = await axios.get(
        "https://flight-status-mock.core.travelopia.cloud/flights"
      );
      setFlights(response.data);
    } catch (error) {
      setError("Failed to fetch flights.");
    }
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 10000);
    return () => clearInterval(interval);
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="banner text-center">
      </div>
      <div className="container p-0">
      <h1 className="bannerTitle text-center p-0 m-0">Flight Navigator</h1>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr className="customRow">
              <th>Flight Number</th>
              <th>Airline</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Departure Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>
                  <Link to={`/flights/${flight.id}`} className="btn btn-link">
                    {flight.flightNumber}
                  </Link>
                </td>
                <td>{flight.airline}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>{flight.departureTime}</td>
                <td>
                  <span
                    className={`badge ${
                      flight.status === "On Time"
                        ? "bg-success"
                        : flight.status === "Delayed"
                        ? "bg-warning"
                        : "bg-secondary"
                    }`}
                  >
                    {flight.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightBoard;