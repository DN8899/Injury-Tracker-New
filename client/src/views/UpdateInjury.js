import { useState } from "react";

const API_BASE = "http://localhost:3000";

function UpdateInjury({ injury, editInjury }) {
  const [severity, setSeverity] = useState(injury.severity);
  const [symptoms, setSymptoms] = useState(injury.symptoms);

  const handleUpdate = async () => {
    const updatedInjury = await fetch(
      API_BASE + "/injury/update/" + injury._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          severity: severity,
          symptoms: symptoms,
          time: Date.now,
        }),
      }
    ).then((res) => res.text());

    console.log(UpdateInjury);
    console.log(injury.severity);
    console.log(injury.symptoms);
    window.location.reload();
  };

  return (
    <div>
      <div key={injury._id} className="editWrap">
        <select
          className="update-severity"
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value=""></option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="text"
          className="update-symptoms"
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <div className="button" onClick={handleUpdate}>
          Update Injury
        </div>
      </div>
    </div>
  );
}

export default UpdateInjury;
