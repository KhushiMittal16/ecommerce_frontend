import React, { useState } from "react";
import Layout from "../core/Layout";
import {signup} from "../auth"
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    err: "",
    success: false,
  });

  const { name, email, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, err: false, [name]: event.target.value });
  };


  const clickSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, err: data.error, success: false });
      } else {
        setValues({ ...values, name: "", email: "", err: "", success: true });
      }
    });
  };
  const signUpForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange("name")}
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={handleChange("email")}
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={handleChange("password")}
            value={password}
          />
        </div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          Submit
        </button>
      </form>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: values.err ? "" : "none" }}
      >
        {values.err}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: values.success ? "" : "none" }}
      >
        New account is created, Please <Link to="/signin">Signin</Link>
      </div>
    );
  };
  return (
    <>
      <Layout
        title="Signup Page"
        description="Signup to Node React App"
        className="container col-md-8 offset-md-2"
      >
        {showError()}
        {showSuccess()}
        {signUpForm()}
        {/* {JSON.stringify(values)} */}
      </Layout>
    </>
  );
};

export default Signup;
