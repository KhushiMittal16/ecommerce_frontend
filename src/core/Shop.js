import React, { useEffect, useState } from "react";
import { getProducts, getCategories } from "./apiCore";
import Card from "./Card";
import Layout from "./Layout";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(error);
      } else {
        setCategories(data);
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Layout
        title="Shop Page"
        description="Search and find books of Your Choice"
      >
        <div className="row">
          <div className="col-4">all categories<br/>{JSON.stringify(categories)}</div>
          <div className="col-8">Right Sidebar</div>
        </div>
      </Layout>
    </>
  );
};

export default Shop;
