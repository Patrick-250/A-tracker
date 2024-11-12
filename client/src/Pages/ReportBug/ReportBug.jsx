import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reportBug } from "../../Redux/Actions";
import "./ReportBug.scss";

const ReportBug = () => {
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [device, setDevice] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const [successMessage, setSuccessMessage] = useState("");
  const [dropdownClicked, setDropdownClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reportBug({ description, severity, device, errorMessage }));
    setDescription("");
    setSeverity("");
    setDevice("");
    setErrorMessage("");
    setSuccessMessage(
      "Your report has been submitted successfully! redirecting to home..."
    );
    setTimeout(() => {
      setSuccessMessage("");
      navigate("/");
    }, 3000); // Clear the message and navigate after 3 seconds
  };

  return (
    <div className="report-bug">
      <h1>Report a Bug</h1>

      <form onSubmit={handleSubmit} className="report-bug-form">
        <div className="form-group">
          <label htmlFor="description">
            <strong>Description *</strong>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the bug in detail"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="severity">
            <strong>Severity *</strong>
          </label>
          <select
            id="severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            onClick={() => setDropdownClicked(true)}
            className={`severity-${severity}`}
            required
          >
            {!dropdownClicked && (
              <option value="" disabled>
                Select the level of severity
              </option>
            )}
            {dropdownClicked && severity === "" && (
              <option value="" disabled hidden></option>
            )}
            <option value="low" className="severity-low">
              Low
            </option>
            <option value="medium" className="severity-medium">
              Medium
            </option>
            <option value="high" className="severity-high">
              High
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="device">
            <strong>Device *</strong>
          </label>
          <select
            id="device"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            required
          >
            <option value="" disabled>
              Select the device
            </option>
            <option value="desktop">Desktop</option>
            <option value="laptop">Laptop</option>
            <option value="tablet">Tablet</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="errorMessage">
            <strong>Error Message?</strong>
          </label>
          <textarea
            id="errorMessage"
            value={errorMessage}
            onChange={(e) => setErrorMessage(e.target.value)}
            placeholder=" any error encountered, if any!"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default ReportBug;
