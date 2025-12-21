import React, { useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderSuccess from "./component/OrderSuccess";
import { Suspense } from "react";

import Head from "./component/Head";
import Body from "./component/Body";
// import Menu from "./component/Menu";
import TopRestaurant from "./component/TopRestuarant";
import Cart from "./component/Cart";
import Search from "./component/Search";
import LoginPage from "./component/LoginPage";
import Shimmer from "./component/Shimmer";
import { hideShimmer } from "./utility/shimmerSlice";
import { lazy } from "react";

const Menu = lazy(()=>import("./component/Menu"))

function App() {
  const shimmer = useSelector((state) => state.shimmer.shimer);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideShimmer());
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="w-screen min-h-screen">
      <Suspense>
      <Head />

      <Routes>
        <Route
          path="/"
          element={
            shimmer ? (
              <Shimmer />
            ) : (
              <>
                <Body />
                <TopRestaurant />
              </>
            )
          }
        />
        <Route path="menu/:id" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
      </Suspense>
    </div>
  );
}

export default App;
