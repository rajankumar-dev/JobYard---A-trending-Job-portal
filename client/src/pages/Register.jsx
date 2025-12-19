import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputFrom from "../components/shared/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from "./../components/shared/Spinner";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle input change
  // const handleInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  //redux state
  const { loading } = useSelector((state) => state.alerts);

  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //form  function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(name, lastName, email, password);
      if (!name || !lastName || !email || !password) {
        return alert("Please fill all the fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          name,
          lastName,
          email,
          password,
        }
      );
      console.log(data);
      dispatch(hideLoading());
      if (data?.success) {
        alert("Register Successfully");
        navigate("/login");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      dispatch(hideLoading());
      alert("Invalid form Details please try again !");
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
              htmlFor="name"
              labelText={"Name"}
              type={"text"}
              value={name}
              handleChange={(e) => setName(e.target.value)}
              name="name"
            />
            <InputFrom
              htmlFor="lastName"
              labelText={"Last Name"}
              type={"text"}
              value={lastName}
              handleChange={(e) => setLastName(e.target.value)}
              name="lastName"
            />
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
                Register
              </button>
              <p>
                Already a member? <Link to="/login">Login </Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
