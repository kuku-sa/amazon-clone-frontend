import React from "react";
import LayOut from "../../../../components/LayOut/LayOut";
import Carousel from "../../../../components/carousel/Carousel";
import Category from "../../../../components/Category/Category";
import Product from "../../../../components/product/Product";

function Landing() {
  return (
    <LayOut>
      <Carousel />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing;
