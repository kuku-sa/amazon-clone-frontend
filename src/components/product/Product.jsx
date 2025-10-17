import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";
import classes from "./ProductCard.module.css";

const Product = () => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // Creates state variable products to store the fetched product data, initialized as undefined
  // Creates state variable isLoading to track loading state, initialized as true

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  //Makes HTTP GET request to the Fake Store API to fetch products
  // Handles successful API response: stores the product data in state and sets loading to false
  // Empty dependency array means this effect runs only once when component mounts

  return (
    <>
      {/* Conditional rendering: shows Loader component if still loading */}
      {/* is  loading is true, we need the loader component, otherwise the data is present */}
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products?.map((singleProduct) => {
            return (
              <ProductCard
                product={singleProduct}
                key={singleProduct.id}
                renderAdd={true}
                // Returns a ProductCard component for each product, passing
              />
            );
          })}
        </section>
      )}
    </>
  );
};

export default Product;
