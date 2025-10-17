// import styles from "./Category.module.css";
 import classes from "./Category.module.css";
import { Link } from "react-router-dom";

const CategoryCard = ({ data }) => {
  console.log(data);

  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <img src={data?.imgLink} alt={data.title} />
        <span>
          <h2 className={classes.titleCenter}>{data?.title}</h2>
          {/* <h2>{data?.title}</h2> */}
          <p>shop now</p>
        </span>
      </Link>
    </div>
  );
};

export default CategoryCard;
// The component creates a clickable category card that displays an image and title, with the entire card serving as a link to a category page. The use of optional chaining (?.) makes it safe to use even if the data prop is missing or incomplete

{/* <Link to={`/category/${data.name}`}>

Creates a Link component for navigation
Uses template literal to create dynamic URL: /category/[category-name]
data.name provides the category name for the route */}

// <img src={data?.imgLink} alt={data.title} />

// Displays category image
// data?.imgLink uses optional chaining to safely access imgLink property
// alt attribute uses data.title for accessibility
// <h2 className={classes.titleCenter}>{data?.title}</h2>
// Displays category title as heading
