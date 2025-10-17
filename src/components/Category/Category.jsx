import React from "react";
import { categoryImage } from "./CategoryFullInfos"; 
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

export default function Category() {
  return (
    <section className="category-section">
      <section className={classes.categorySection}>
        {categoryImage.map((infos, index) => (
          <CategoryCard key={index} data={infos} />
        ))}
      </section>
    </section>
  );
}
// Uses JavaScript's map() method to iterate over the categoryImage array. For each item (infos) and its position (index), it will render JSX.
// Renders a CategoryCard component for each item in the array:
// key={index}: Provides a unique key (using array index) for React's reconciliation process
// data={infos}: Passes the current category data object as a prop named data
