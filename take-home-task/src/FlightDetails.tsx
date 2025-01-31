import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//flight detail
interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
  gate: string;
  terminal: string;
}

const FlightDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [error, setError] = useState<string | null>(null);

  //fewtch detail by ID from API
  const fetchFlightDetails = async () => {
    try {
      const response = await axios.get(
        `https://flight-status-mock.core.travelopia.cloud/flights/${id}`
      );
      setFlight(response.data);
    } catch (error) {
      setError("Failed.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchFlightDetails();
    }
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;

  if (!flight) return <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>;

  return (
    <>
    <div className="banner2 text-center mb-4">
      <h2 className="mb-4 detailTitle">Flight Details for {flight.flightNumber}</h2>
    </div>
    <div className="container w-50 mt-5">
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover text-center">
          <thead>
            <tr>
              <th className="text-primary text-decoration-underline">Attribute</th>
              <th className="text-primary text-decoration-underline">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Airline</strong></td>
              <td>{flight.airline}</td>
            </tr>
            <tr>
              <td><strong>Origin</strong></td>
              <td>{flight.origin}</td>
            </tr>
            <tr>
              <td><strong>Destination</strong></td>
              <td>{flight.destination}</td>
            </tr>
            <tr>
              <td><strong>Departure Time</strong></td>
              <td>{flight.departureTime}</td>
            </tr>
            <tr>
              <td><strong>Status</strong></td>
              <td>{flight.status}</td>
            </tr>
            <tr>
              <td><strong>Gate</strong></td>
              <td>{flight.gate}</td>
            </tr>
            <tr>
              <td><strong>Terminal</strong></td>
              <td>{flight.terminal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default FlightDetails;