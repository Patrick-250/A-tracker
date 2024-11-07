import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { reportBug } from "../../Redux/Actions";
import "./ReportBug.scss";

const ReportBug = () => {
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reportBug({ description, severity }));
    setDescription("");
    setSeverity("low");
  };

  return (
    <div className="report-bug">
      <h1>Report a Bug</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="severity">Severity</label>
          <select
            id="severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportBug;
