import React, { useContext } from "react";
import classes from "./Header.module.css";
import {Link} from 'react-router-dom'
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import LowerHeader from "./LowerHeader";
import { BiCart } from "react-icons/bi";
import { DataContext } from "../dataProvider/DataProvider";
import { auth } from "../../utility/firebase";

const Header = () => {
  const [{user, basket }, dispatch] = useContext(DataContext);
  //   Destruct the basket array and dispatch function from the shared context
  // basket contains shopping cart items, dispatch is for updating state
  // Gets the shopping basket data from the shared context
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  // Handle sign out
  const handleSignOut = () => {
    auth.signOut();
  };

  //Reduces the basket array to calculate total quantity of items. Sums up the amount property of each item in the basket stat at 0
  return (
    <>
      <section className={classes.fixed}>
        <div className={classes.header_container}>
          {/* Logo */}
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivering to</p>
                <span>Ethiopia</span>
                {/* <p>Update Location</p> */}
              </div>
            </div>
          </div>

          {/* Search section */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search product" />
            <BsSearch />
          </div>

          {/* Right Side Links */}
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt=""
              />

              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            {/* Account Section - Fixed conditional rendering */}
            {user === undefined ? (
              // Loading state
              <div>
                <p>Loading...</p>
              </div>
            ) : user ? (
              // User is logged in
              <div>
                <p>Hello {user.email?.split("@")[0]}</p>
                <span 
                  onClick={handleSignOut}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Sign Out
                </span>
              </div>
            ) : (
              // User is logged out
              <Link to="/auth">
                <div>
                  <p>Hello, Sign in</p>
                  <span>Account & Lists</span>
                </div>
              </Link>
            )}

            <Link to="/orders">
              <p>Returns &</p>
              <span>Orders</span>
            </Link>

            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              {/* This sets both the width and height of the icon to 35 pixels shopping cart*/}
              <span>{totalItem}</span>
              {/* Shopping cart link with cart icon and item count
Shows the calculated totalItem number */}
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
};

export default Header;