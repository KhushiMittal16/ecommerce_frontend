import React, { useState } from "react";
import Layout from "../core/Layout";
import { signin, authenticate,isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    err: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, redirectToReferrer } = values;
  const {user}= isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, err: false, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, err: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, err: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({ ...values, redirectToReferrer: true });
        });
      }
    });
  };
  const signinForm = () => {
    return (
      <form>
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

  const showLoading = () => {
    return (
      values.loading && (
        <div
          className="alert alert-info"
          style={{ display: values.loading ? "" : "none" }}
        >
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if(user&&user.role===1){
        return <Redirect to="/admin/dashboard" />;
      }else{
        return <Redirect to="/user/dashboard" />;
      }
      if(isAuthenticated){
        return <Redirect to="/" />;
      }
    }
  };

  return (
    <>
      <Layout
        title="Signin Page"
        description="Signin to Node React App"
        className="container col-md-8 offset-md-2"
      >
        {showError()}
        {showLoading()}
        {signinForm()}
        {redirectUser()}
      </Layout>
    </>
  );
};

export default Signin;
