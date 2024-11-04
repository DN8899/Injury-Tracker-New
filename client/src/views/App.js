import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../misc/utils";
import { Route, Routes, Router } from "react-router-dom";
import UpdateInjury from "./UpdateInjury";

const API_BASE = "http://localhost:3000";

/*
 * HOME SCREEN FOR THE APP
 *   User can see their current injuries
 *   Update injuries
 *
 */

function App() {
  const [injuries, setInjuries] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [severity, setSeverity] = useState("");
  const [newInjury, setNewInjury] = useState("");
  const [newSymptoms, setSymptoms] = useState("");
  const [selectedInjury, setSelectedInjury] = useState(false);
  const [nonComplete, setNonComplete] = useState([]);

  useEffect(() => {
    GetInjuries();
    console.log(injuries);
  }, []);

  const GetInjuries = () => {
    fetch(API_BASE + "/injuries")
      .then((res) => res.clone().json())
      .then((data) => setInjuries(data))
      .catch((err) => console.error("Error ", err));
  };

  //******** */ NON COMPLETE METHOD CALL ***********

  const nonCompletedInjuries = () => {
    fetch(API_BASE + "/injury/noncompleted")
      .then((res) => res.clone().json())
      .then((data) => setNonComplete(data))
      .catch((err) => console.error("Error " + err));
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

  /** **************************************
   * URGENT
   * Throws a failed fetch error when deleting a value with null severity
   */

  const addInjury = async () => {
    const data = await fetch(API_BASE + "/injury/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newInjury,
        severity: severity,
        symptoms: newSymptoms,
      }),
    }).then((res) => res.json());

    // Get all the injuries and add the new injury
    setInjuries([...injuries, data]);
    // Get and add new injury
    setNonComplete([...nonComplete, data]);
    // Get rid of the popup menu
    setPopupActive(false);
    // Set the textbox back to empty
    setNewInjury("");
    // Set the Severity field
    setSeverity("");
    // Set the symptoms
    setSymptoms("N/A");
  };

  /*
   * Change the classname depending on the severity
   * To allow changes in color
   */
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

  // Retrieve incomplete injuries and display them below
  const nonCompleteInjuries = injuries.filter((injury) => !injury.complete);

  return (
    <div className="App">
      <h1> Welcome, Derrick</h1>
      <h4>Your Injuries</h4>

      <div className="injuries">
        {nonCompleteInjuries.map((injury) => (
          <div
            // Use _.id because the mongodb reteurns with a space
            className={"injury " + (injury.complete ? "is-complete" : "")}
            key={injury._id}
            onDoubleClick={() => completeInjury(injury._id)}
          >
            {/*
             * Pass in the current injury to the UpdateInjury
             * Component.
             */}
            {selectedInjury ? (
              <UpdateInjury
                injury={injury}

                // Add button control here?
                // Pass in parameters here for the component
              />
            ) : (
              ""
            )}

            <div className="checkbox"></div>

            <div className="text">{injury.text}</div>

            <div className={"severity " + getSeverityClass(injury.severity)}>
              Severity: {injury.severity}
            </div>

            <div className="symptom">Symptoms: {injury.symptoms}</div>

            <div className="date">
              <strong>Onset Date:</strong> {formatDate(injury.time)}{" "}
            </div>

            <div
              className="delete-injury"
              key={injury._id}
              onClick={() => deleteInjury(injury._id)}
            >
              {" "}
              x
            </div>
          </div>
        ))}
      </div>

      <div
        // Click addpopup to add new injury
        className="addPopup"
        onClick={() => {
          setPopupActive(true);
        }}
      >
        Add New Injury
      </div>

      {/*
       * Allows the user to open the edit funciton and cancel the edit function
       */}
      {selectedInjury ? (
        <div className="editInjury" onClick={() => setSelectedInjury(false)}>
          Cancel Edit Injury
        </div>
      ) : (
        <div className="editInjury" onClick={() => setSelectedInjury(true)}>
          Edit Injury
        </div>
      )}
      {/*
       * *****************************************************
       * BELOW IS THE START OF THE ADD INJURY COMPONENT
       * SHOULD REFACTOR INTO A SEPERATE COMPONENT LATER
       * *****************************************************
       */}
      {popupActive ? (
        <div className="popup">
          <div className="content-todo">
            <h3>Add Injury</h3>
            <input
              type="text"
              className="add-injury-input"
              onChange={(e) => setNewInjury(e.target.value)}
              value={newInjury}
            />
            <select
              className="add-severity-select"
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value=""></option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              type="text"
              className="add-symptoms-select"
              onChange={(e) => setSymptoms(e.target.value)}
              value={newSymptoms}
            />
            <div className="button-create" onClick={addInjury}>
              Create Injury
            </div>
          </div>

          <div className="closepopup" onClick={() => setPopupActive(false)}>
            {" "}
            x{" "}
          </div>
        </div>
      ) : (
        ""
      )}

      <div id="completed-injury">
        <Link to="/completed-injury">
          <button className="completedinjury">Completed Injuries</button>
        </Link>
      </div>
      <div id="injury-history">
        <Link to="/injury-history">
          <button className="injuryHistory">Injury History</button>
        </Link>
      </div>
    </div>
  ); // End of the return function
}

export default App;
