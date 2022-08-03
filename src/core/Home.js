import React, { useEffect, useState } from "react";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Layout from "./Layout";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductBySell = () => {
    getProducts("createdAt")
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setProductsBySell(data);
        }
      })
      .catch((err) => {
        console.log(error);
      });
  };
  const loadProductByArrival = () => {
    getProducts("createdAt")
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setProductsByArrival(data);
        }
      })
      .catch((err) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   loadProductBySell();
  //   loadProductByArrival();
  // }, [])

  return (
    <>
      <Layout title="Home Page" description="Node React App">
        {/* <Card product={productsBySell}/> */}
        {/* <Card product={productsByArrival}/> */}
        <h2>Best Sellers</h2>
        <div className="row">
          {productsBySell.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
        <h2>New Arrivals</h2>
        <div className="row">
          {productsByArrival.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Home;
