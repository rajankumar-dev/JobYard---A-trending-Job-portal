import React from "react";
import "../../styles/Layout.css";
import { UserMenu } from "./Menus/UserMenu";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Layout = ({ children }) => {
  const sidebarMenu = UserMenu;
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div className="row">
        <div className="col-md-3 sidebar">
          <div className="logo">
            <h6>JOB PORTAL</h6>
          </div>
          <hr />
          <p className="username">Welcome : username</p>
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
            <div
              className={`menu-item`}
              onClick={() => {
                localStorage.clear();
                toast.success("Logout Successfully");
                navigate("/login");
              }}
            >
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
