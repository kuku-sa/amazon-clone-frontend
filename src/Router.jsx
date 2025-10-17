import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/Auth/Landing/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Payment from "./pages/Auth/payment/Payment";
import Orders from "./pages/Auth/orders/Orders";
import Cart from "./pages/Auth/Cart/Cart";
import Results from "./pages/Auth/Results/Results";
import ProductDetail from "./pages/Auth/productDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51S9XwmRErPmY7bhngXOoLWxx53yVhPrLCYWIJX8fk2kBF9eUqmFoqEf7NDnI9J9d6qsOlxdG0yhAP90kEwI7P1YP00gbbNkcUz"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute msg={"You must log in to pay"} redirect="/payment">
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"You must log in to access your orders"}
              redirect="/orders"
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/payments" element={<Navigate to="/payment" replace />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Landing from "./pages/Auth/Landing/Landing/Landing";
// import Auth from "./pages/Auth/Auth";
// import Payment from "./pages/Auth/payment/Payment";
// import Orders from "./pages/Auth/orders/Orders";
// import Cart from "./pages/Auth/Cart/Cart";
// import Results from "./pages/Auth/Results/Results";
// import ProductDetail from "./pages/Auth/productDetail/ProductDetail";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

// const stripePromise = loadStripe(
//   "pk_test_51S9XwmRErPmY7bhngXOoLWxx53yVhPrLCYWIJX8fk2kBF9eUqmFoqEf7NDnI9J9d6qsOlxdG0yhAP90kEwI7P1YP00gbbNkcUz"
// );

// function Routing() {
//   return (
//     <Router basename="/Amazon-Clone-frontend-/">
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/auth" element={<Auth />} />
//         <Route
//           path="/payment"
//           element={
//             <ProtectedRoute msg={"You must log in to pay"} redirect="/payment">
//               <Elements stripe={stripePromise}>
//                 <Payment />
//               </Elements>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/orders"
//           element={
//             <ProtectedRoute msg={"You must log in to access your orders"} redirect="/orders">
//               <Orders />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/payments" element={<Navigate to="/payment" replace />} />
//         <Route path="/category/:categoryName" element={<Results />} />
//         <Route path="/products/:productId" element={<ProductDetail />} />
//         <Route path="/cart" element={<Cart />} />
//       </Routes>
//     </Router>
//   );
// }

// export default Routing;
