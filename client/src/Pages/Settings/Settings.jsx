import "./Settings.scss";
import { MdOutlineModeEdit } from "react-icons/md";
import { useState } from "react";
const Settings = () => {
  const [selected, setSelected] = useState(1);
  const [show, setShow] = useState(false);
  return (
    <div className="settings">
      <div className="btns">
        <button
          className="btn"
          onClick={() => {
            setSelected(1);
            setShow(false);
          }}
          style={{
            boxShadow:
              selected === 1 ? "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" : "",
            color: selected === 1 ? "blue" : "gray",
          }}
        >
          Edit Profile
        </button>
        <button
          className="btn"
          onClick={() => {
            setSelected(2);
            setShow((prev) => !prev);
          }}
          style={{
            boxShadow:
              selected === 2 ? "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" : "",
            color: selected === 2 ? "blue" : "gray",
          }}
        >
          {show ? "Cancel" : "Security"}
        </button>
        {show && (
          <div className="formx">
            <div className="form-title">Change Password</div>{" "}
            <form className="form">
              <div className="inputx">
                <label className="label" style={{ marginBottom: "10px" }}>
                  <span className="sp">Current Password</span>
                  <input type="text" placeholder="**********" className="in" />
                </label>
                <label className="label">
                  <span className="sp">New Password</span>
                  <input type="text" className="in" placeholder="**********" />
                </label>
              </div>

              <button className="savex">Change Password</button>
            </form>
          </div>
        )}
      </div>
      <div className="info">
        <div className="image">
          <img
            src="/images/pic.jpg"
            alt=""
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div className="icon">
            <MdOutlineModeEdit color="white" size={20} />
          </div>
        </div>
        <div className="formWrapper">
          <form className="form">
            <div className="input">
              <label className="label">
                <span className="sp">Your Name</span>
                <input type="text" placeholder="patrick " className="in" />
              </label>
              <label className="label">
                <span className="sp">User Name</span>
                <input type="text" className="in" placeholder="visacci" />
              </label>
            </div>
            <div className="input">
              <label className="label">
                <span className="sp">Email</span>
                <input
                  type="text"
                  placeholder="visacciallanz@gmail.com"
                  className="in"
                />
              </label>
              <label className="label">
                <span className="sp">Password</span>
                <input type="text" className="in" placeholder="**********" />
              </label>
            </div>
            <div className="input">
              <label className="label">
                <span className="sp">Permanent Address</span>
                <input type="text" placeholder="Omaha, NE" className="in" />
              </label>
              <label className="label">
                <span className="sp">Country</span>
                <input type="text" className="in" placeholder="USA" />
              </label>
            </div>
            <button className="save">save</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Settings;
