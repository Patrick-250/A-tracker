import "./Sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
const Sidebar = () => {
  const { isCollapsed } = useSelector((state) => state);
  const hide = isCollapsed.collapsed;
  return (
    <div className="sidebar" style={{ width: hide ? "50px" : "280px" }}>
      {/* Top logo */}
      <div className="logo">
        <span className="s-logo">logo</span>
        <h1 className="h">QLI INVENTORY</h1>
      </div>
      {/* liknks */}
      <div className="links"></div>
      {/* footer */}
      <div className="footer">
        <span className="copy">&copy: 2024 QLI stock</span>
      </div>
    </div>
  );
};

export default Sidebar;
