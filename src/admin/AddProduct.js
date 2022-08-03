import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createProduct } from "./apiAdmin";
import {getCategories} from '../core/apiCore'

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    photo: "",
    shipping: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: "",
    formData: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    category,
    quantity,
    shipping,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.file : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
    // setValues(value );
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            photo: "",
            price: "",
            quantity: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const newPostForm = () => {
    return (
      <form className="mb-3" onSubmit={clickSubmit}>
        {/* {console.log(token)} */}
        <h4>Post Photo</h4>
        <div className="form-group">
          <label className="btn btn-secondary">
            <input
              type="file"
              className="form-control"
              name="photo"
              accept="image/*"
              onChange={handleChange("photo")}
            />
          </label>
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange("description")}
            value={description}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            onChange={handleChange("price")}
            value={price}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          {/* <input type="file" value={category} /> */}
          <select className="form-control" onChange={handleChange("category")}>
            <option>Please select the category</option>
            {categories.map((c, i) => (
              <option value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Shipping</label>
          {/* <input type="file" value={category} /> */}
          <select className="form-control" onChange={handleChange("shipping")}>
            <option>Please select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            onChange={handleChange("quantity")}
            value={quantity}
          />
        </div>
        <button className="btn btn-outline-primary">Create Product</button>
      </form>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: createdProduct ? "" : "none" }}
      >{`${createdProduct} is created successfully.`}</div>
    );
  };

  const showLoading = () => {
    return (
      loading && (
        <div className="alert alert-success">
          <h2>Loading...</h2>
        </div>
      )
    );
  };
  return (
    <Layout
      title="Add a new Product"
      description={`Have a good day ${user.name} !!! Ready to add a new Product???`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showError()}
          {showSuccess()}
          {newPostForm()}
        </div>
      </div>
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
};

export default AddProduct;
