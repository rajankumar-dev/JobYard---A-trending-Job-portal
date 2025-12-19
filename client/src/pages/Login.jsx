import React, { useState } from "react";
import InputFrom from "../components/shared/InputForm";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //form  function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
    </>
  );
};

export default Login;
