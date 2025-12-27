import React from "react";
import "../../styles/Layout.css";
import { UserMenu } from "./Menus/UserMenu";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

const Layout = ({ children }) => {
  //menu list
  const sidebarMenu = UserMenu;
  //
  const { user } = useSelector((state) => state.auth);

  //hooks
  const parseUser = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //handle logout
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
    dispatch(setUser(null));
    navigate("/login");
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3 sidebar">
          <div className="logo">
            <h6>JOB PORTAL</h6>
          </div>
          <hr />
          <p className="username">
            Welcome <span>{user?.name}</span>
          </p>
          <hr />
          <div className="menu">
            {sidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`menu-item ${isActive && "active"}`}
                  key={menu.name}
                >
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className={`menu-item`} onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">{children}</div>
      </div>
    </>
  );
};

export default Layout;
