import { useState, useEffect } from "react";
import { formatDate } from "../misc/utils";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:3000";

/*
 * USAGE:
 *   This is the completed Injuries View.
 *   Allows the User to see the injuries that have past.
 *
 *
 * FUTURE IDEAS:
 *   Add ability to click on injury and see the history
 *   for that specific injury
 *
 */

function CompletedInjury() {
  const [injuries, setInjuries] = useState([]);

  useEffect(() => {
    getCompletedInjuries();
  }, []);

  // Call the getInjury GET from server
  const getCompletedInjuries = () => {
    fetch(API_BASE + "/injury/completed")
      .then((res) => res.clone().json())
      .then((data) => setInjuries(data))
      .catch((err) => console.error("Error ", err));
  };

  const completeInjury = async (id) => {
    const data = await fetch(API_BASE + "/injury/complete/" + id).then((res) =>
      res.json()
    );

    // Set the injuries from the useState
    setInjuries((injuries) =>
      injuries.map((injury) => {
        // Make sure the "_" is there or else one one click every item is marked complete
        if (injury._id === data._id) {
          injury.complete = data.complete;
        }

        return injury;
      })
    );
  };

  const deleteInjury = async (id) => {
    const data = await fetch(API_BASE + "/injury/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setInjuries((injuries) =>
      injuries.filter((injury) => injury._id !== data._id)
    );
  };

  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case "low":
        return "severity-low";
      case "medium":
        return "severity-medium";
      case "high":
        return "severity-high";
      default:
        return "";
    }
  };

  return (
    <div className="CompletedInjury">
      <h1>Completed Injuries</h1>
      <div className="injuries">
        {injuries.map((injury) => (
          <div className="injury" key={injury._id}>
            <div className="text">{injury.text}</div>
            <div className={"severity " + getSeverityClass(injury.severity)}>
              Severity: {injury.severity}
            </div>

            <div className="date"> Date: {formatDate(injury.time)}</div>

            <div
              className="delete-injury"
              onClick={() => deleteInjury(injury._id)}
            >
              x
            </div>
          </div>
        ))}
      </div>
      <div id="home">
        <Link to="/">
          <button className="homeButton">Home Page</button>
        </Link>
      </div>
    </div>
  );
}
export default CompletedInjury;
