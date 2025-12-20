import React, { useState } from "react";
import InputFrom from "../components/shared/InputForm";
import { Link, useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //redux state
  const { loading } = useSelector((state) => state.alerts);

  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //form  function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      if (data.success) {
        dispatch(hideLoading());
        localStorage.setItem("token", data.token);
        toast.success("Login Successfully");
        navigate("/dashboard");
      } else {
        dispatch(hideLoading());
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("invalid form Details please try again !");
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container card">
          <img src="/images/logo.png" alt="" className="reg-logo" />
          <form onSubmit={handleSubmit}>
            <InputFrom
              htmlFor="email"
              labelText={"Email"}
              type={"email"}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <InputFrom
              htmlFor="password"
              labelText={"Password"}
              type={"password"}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <div className="d-flex btn-container">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <p>
                Not a member? <Link to="/register">Register Here!</Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
