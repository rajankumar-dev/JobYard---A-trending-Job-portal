import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputFrom from "../components/shared/InputForm";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle input change
  // const handleInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  //form  function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(name, lastName, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
        {/* <div class="mb-2">
          <label className="form-label" htmlFor="location">
            Location
          </label>
          <input type="text" className="form-control" id="location" />
        </div> */}
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
  );
};

export default Register;
