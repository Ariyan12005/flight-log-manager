import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [logs, setLogs] = useState([]);
  const [pilot, setPilot] = useState("");
  const [aircraft, setAircraft] = useState("");
  const [date, setDate] = useState("");
  const [adminCode, setAdminCode] = useState("");
const [isAdmin, setIsAdmin] = useState(false);

  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/flight-logs");
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const createLog = async () => {
    if (!pilot || !aircraft || !date) return;

    try {
      await axios.post("http://localhost:5000/api/flight-logs", {
        pilot,
        aircraft,
        date,
      });

      setPilot("");
      setAircraft("");
      setDate("");
      fetchLogs();
    } catch (error) {
      console.error("Error creating log:", error);
    }
  };

  const deleteLog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flight-logs/${id}`);
      fetchLogs();
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };
  const checkAdmin = () => {
  if (adminCode === "admin123") {
    setIsAdmin(true);
  } else {
    alert("Invalid admin code");
  }
};

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Flight Log Manager</h1>
      <div style={{ marginBottom: "25px" }}>
  {!isAdmin ? (
    <>
      <input
        type="password"
        placeholder="Enter Admin Code"
        value={adminCode}
        onChange={(e) => setAdminCode(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      <button onClick={checkAdmin}>
        Login as Admin
      </button>
    </>
  ) : (
    <p style={{ color: "green" }}>
      Admin Access Granted
    </p>
  )}
</div>
{isAdmin && (
<div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        <input
          type="text"
          placeholder="Pilot Name"
          value={pilot}
          onChange={(e) => setPilot(e.target.value)}
          style={{ padding: "10px", flex: 1 }}
        />

        <input
          type="text"
          placeholder="Aircraft"
          value={aircraft}
          onChange={(e) => setAircraft(e.target.value)}
          style={{ padding: "10px", flex: 1 }}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: "10px" }}
        />

        <button onClick={createLog} style={{ padding: "10px 16px" }}>
          Add Flight Log
        </button>
      </div> )}

      <h2>Flight Logs</h2>

      {logs.length === 0 ? (
        <p>No flight logs yet.</p>
      ) : (
        logs.map((log) => (
          <div
            key={log._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "12px",
            }}
          >
            <p><strong>Pilot:</strong> {log.pilot}</p>
            <p><strong>Aircraft:</strong> {log.aircraft}</p>
            <p><strong>Date:</strong> {log.date || "N/A"}</p>

          {isAdmin && (
  <button
    onClick={() => deleteLog(log._id)}
    style={{ padding: "8px 12px", cursor: "pointer" }}
  >
    Delete
  </button>
)}
          </div>
        ))
      )}
    </div>

  );
}

export default App;