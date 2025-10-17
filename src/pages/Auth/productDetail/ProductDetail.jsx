import React from "react";
import { useParams } from "react-router-dom";
import classes from "./ProductDetail.module.css";
import LayOut from "../../../components/LayOut/LayOut";
import axios from "axios";
import { productUrl } from "../../../Api/EndPoints";
import { useState, useEffect } from "react";
import ProductCard from "../../../components/product/ProductCard";
import Loader from "../../../components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]);
  
  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          // passes as a props
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
