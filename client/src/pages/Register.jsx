import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  //form  function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(
        formData.name,
        formData.lastName,
        formData.email,
        formData.password
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form-container card">
      <img src="/images/logo.png" alt="" className="reg-logo" />
      <form onSubmit={handleSubmit}>
        <div class="mb-2">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div class="mb-2">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>
        <div class="mb-2">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div class="mb-2">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
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
