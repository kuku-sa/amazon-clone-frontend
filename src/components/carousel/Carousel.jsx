import React from "react";
import "./Carousel.css"; 
import { Carousel } from "react-responsive-carousel";
import { img } from "../carousel/img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {/* 
       {/* {img.map((imageItemLink, index) => {
          return (
            <img
              key={index}
              src={imageItemLink}
              alt={`Carousel item ${index}`}
            />
          );
        })} */}
        {img.map((imageItemLink, index) => {
  return (
    <div key={index} style={{ height: '400px', overflow: 'hidden' }}>
      <img
        src={imageItemLink}
        alt={`Carousel item ${index}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
})}
      </Carousel>
      <div className="hero_img"></div>
    </div>
  );
}

export default CarouselEffect;
