import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../../redux/features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      dispatch(showLoading());

      const token = localStorage.getItem("token");

      if (!token) {
        dispatch(hideLoading());
        navigate("/login");
        return;
      }

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/user/getUser",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(hideLoading());

      if (data.success) {
        dispatch(setUser(data.user));
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      navigate("/login");
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []); // ✅ dependency fixed

  // 🔒 Final protection
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
