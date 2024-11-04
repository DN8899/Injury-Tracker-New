import { useState, useEffect } from "react";
import { formatDate } from "../misc/utils";

const API_BASE = "http://localhost:3000";

/*
 * View to see the past injuries
 *
 * MUST DO
 * - Clean up the look of the data
 * - Possibly change the data that is displayed
 */

function InjuryHistory() {
  const [history, setHistory] = useState([]);
  const [injuries, setInjuries] = useState([]);

  useEffect(() => {
    GetInjuries();
  }, []);

  const GetInjuries = () => {
    fetch(API_BASE + "/injuries")
      .then((res) => res.clone().json())
      .then((data) => setInjuries(data))
      .catch((err) => console.error("Error ", err));

    setHistory(...injuries);
  };

  /*
   * Displays the current injury and all the history for it.
   * Need to change it so the latest injury shows first
   * Rather than the first one that was put in
   *
   */

  return (
    <div className="injury-history">
      <h4>Injury History</h4>
      {injuries.map((injury, index) => (
        <div key={index} className="injury-item">
          <div>Injury Text: {injury.text}</div>
          <div className="details">
            <div>Severity: {injury.severity}</div>
            <div>Symptoms: {injury.symptoms}</div>
            <div>Date: {formatDate(injury.time)}</div>
          </div>

          <div className="history">
            <div>History:</div>
            {injury.history && injury.history.length > 0 ? (
              injury.history.map((entry, entryIndex) => (
                <div key={entryIndex}>
                  <div className="history-date">
                    Date: {formatDate(entry.time)}
                  </div>
                  <div className="history-severity">
                    Severity: {entry.severity}
                  </div>
                  <div className="history-symptoms">
                    Symptoms: {entry.symptoms}
                  </div>
                </div>
              ))
            ) : (
              <p>No history available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default InjuryHistory;
