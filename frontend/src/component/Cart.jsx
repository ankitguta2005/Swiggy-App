import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../utility/cartSlice";
import toast from "react-hot-toast";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartData = useSelector((state) => state.cart.items) || [];
  const resData = useSelector((state) => state.cart.restaurant) || {};
  const userData = useSelector((state) => state.auth.userData);

  const safeCartData = Array.isArray(cartData) ? cartData : [];

  let totalAmount = 0;
  for (let i = 0; i < safeCartData.length; i++) {
    let price = (safeCartData[i]?.defaultPrice + "").slice(0, -2);
    totalAmount += Number(price);
  }

  function cartRemove(index) {
    dispatch(removeFromCart(index));
    toast.success("Item removed");
  }

  function handleResInfo() {
    localStorage.removeItem("resInfo");
  }

  function allcartRemove() {
    dispatch(clearCart());
    toast.success("Cart cleared");
  }

  async function allItemOrder() {
    if (!userData) {
      toast.error("Please login before placing order");
      setTimeout(() => navigate("/auth"), 1500);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalAmount }),
        }
      );

      const order = await res.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Swiggy",
        description: "Food Order Payment",
        order_id: order.id,

        handler: async function (response) {
          const verifyRes = await fetch(
            `${import.meta.env.VITE_API_URL}/api/payment/verify`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );

          const result = await verifyRes.json();

          if (result.success) {
            dispatch(clearCart());
            toast.success("Payment Successful");
            navigate("/order-success");
          } else {
            toast.error("Payment verification failed");
          }
        },

        theme: {
          color: "#ff5200",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment failed");
    }
  }

  return (
    <>
      {safeCartData.length > 0 ? (
        <div className="w-full min-h-screen bg-gray-50 pt-10 pb-10 flex justify-center">
          <div className="w-full max-w-4xl px-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Your Cart
            </h1>

            <h1 className="text-[20px] font-bold mb-6 text-gray-800">
              Restaurant :
              <span className="text-[#ff5200]"> {resData?.name}</span>
            </h1>

            {safeCartData.map((data, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-2xl mb-4 p-4 flex justify-between gap-4"
              >
                <div className="flex flex-col gap-1 max-w-[65%]">
                  <p className="lg:text-lg text-[14px] font-bold text-gray-900">
                    {data.name}
                  </p>

                  <p className="text-base font-medium text-gray-800">
                    ₹{" "}
                    {data.defaultPrice === 99
                      ? 99
                      : (data.defaultPrice + "").slice(0, -2)}
                  </p>

                  <div className="flex items-center gap-1 text-[12px] text-gray-600">
                    {data.rating?.rating && (
                      <img
                        src="/images/stars.svg"
                        alt=""
                        className="w-4"
                      />
                    )}
                    <span>{data.rating?.rating}</span>
                    {data.rating?.ratingCount && (
                      <span>({data.rating.ratingCount})</span>
                    )}
                  </div>

                  <p className="text-[12px] text-gray-500 line-clamp-2">
                    {data.description}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${data.imageId}`}
                    alt=""
                    className="w-[130px] h-[130px] rounded-lg object-cover"
                  />

                  <button
                    onClick={() => cartRemove(i)}
                    className="text-sm font-semibold text-red-600 border border-red-200 px-4 py-1.5 rounded-lg bg-white hover:bg-red-50 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-xl shadow-xl p-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold text-gray-800">
                  Total Amount
                </p>
                <p className="text-xl font-bold text-gray-900">
                  ₹ {totalAmount}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={allcartRemove}
                  className="flex-1 py-2 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-600 transition"
                >
                  Clear Cart
                </button>

                <button
                  onClick={allItemOrder}
                  className="flex-1 py-2 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700 transition"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-gray-50">
          <img
            src="/images/noitem.png"
            alt=""
            className="w-[220px] h-[220px]"
          />

          <h1 className="text-xl font-semibold text-gray-800">
            Your cart is empty
          </h1>

          <Link to="/">
            <button
              onClick={handleResInfo}
              className="mt-2 px-5 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
            >
              Browse Restaurants
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Cart;

// for running on localhost use below code and remove above code

  // import { Link, useNavigate } from "react-router-dom";
  // import { useSelector, useDispatch } from "react-redux";
  // import { removeFromCart, clearCart } from "../utility/cartSlice";
  // import toast from "react-hot-toast";

  // function Cart() {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  //   const cartData = useSelector((state) => state.cart.items) || [];
  //   const resData = useSelector((state) => state.cart.restaurant) || {};
  //   const userData = useSelector((state) => state.auth.userData);

  //   const safeCartData = Array.isArray(cartData) ? cartData : [];

  //   let totalAmount = 0;
  //   for (let i = 0; i < safeCartData.length; i++) {
  //     let price = (safeCartData[i]?.defaultPrice + "").slice(0, -2);
  //     totalAmount += Number(price);
  //   }

  //   function cartRemove(index) {
  //     dispatch(removeFromCart(index));
  //     toast.success("Item removed");
  //   }

  //   function handleResInfo() {
  //     localStorage.removeItem("resInfo");
  //   }

  //   function allcartRemove() {
  //     dispatch(clearCart());
  //     toast.success("Cart cleared");
  //   }

  //   async function allItemOrder() {
  //     if (!userData) {
  //       toast.error("Please login before placing order");
  //       setTimeout(() => navigate("/auth"), 1500);
  //       return;
  //     }

  //     try {
  //       const res = await fetch(
  //         "http://localhost:5000/api/payment/create-order",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ amount: totalAmount }),
  //         }
  //       );

  //       const order = await res.json();

  //       const options = {
  //         key: import.meta.env.VITE_RAZORPAY_KEY,
  //         amount: order.amount,
  //         currency: "INR",
  //         name: "Swiggy ",
  //         description: "Food Order Payment",
  //         order_id: order.id,

  //         handler: async function (response) {
  //           const verifyRes = await fetch(
  //             "http://localhost:5000/api/payment/verify",
  //             {
  //               method: "POST",
  //               headers: { "Content-Type": "application/json" },
  //               body: JSON.stringify(response),
  //             }
  //           );

  //           const result = await verifyRes.json();

  //           if (result.success) {
  //             dispatch(clearCart());
  //             toast.success("Payment Successful 🎉");
  //             navigate("/order-success");
  //           } else {
  //             toast.error("Payment verification failed");
  //           }
  //         },

  //         theme: {
  //           color: "#ff5200",
  //         },
  //       };

  //       const rzp = new window.Razorpay(options);
  //       rzp.open();
  //     } catch (error) {
  //       toast.error("Payment failed" + error);
  //     }
  //   }

  //   return (
  //     <>
  //       {safeCartData.length > 0 ? (
  //         <div className="w-full min-h-screen bg-gray-50 pt-10 pb-10 flex justify-center">
  //           <div className="w-full max-w-4xl px-4">
  //             <h1 className="text-2xl font-bold mb-6 text-gray-800">
  //               Your Cart
  //             </h1>

  //             <h1 className="text-[20px] font-bold mb-6 text-gray-800">
  //               Restaurant :
  //               <span className="text-[#ff5200]"> {resData?.name}</span>
  //             </h1>

  //             {safeCartData.map((data, i) => (
  //               <div
  //                 key={i}
  //                 className="bg-white rounded-xl shadow-2xl mb-4 p-4 flex justify-between gap-4"
  //               >
  //                 <div className="flex flex-col gap-1 max-w-[65%]">
  //                   <p className="lg:text-lg text-[14px] font-bold text-gray-900">
  //                     {data.name}
  //                   </p>

  //                   <p className="text-base font-medium text-gray-800">
  //                     ₹{" "}
  //                     {data.defaultPrice === 99
  //                       ? 99
  //                       : (data.defaultPrice + "").slice(0, -2)}
  //                   </p>

  //                   <div className="flex items-center gap-1 text-[12px] text-gray-600">
  //                     {data.rating?.rating && (
  //                       <img
  //                         src="/images/stars.svg"
  //                         alt=""
  //                         className="w-4"
  //                       />
  //                     )}
  //                     <span>{data.rating?.rating}</span>
  //                     {data.rating?.ratingCount && (
  //                       <span>({data.rating.ratingCount})</span>
  //                     )}
  //                   </div>

  //                   <p className="text-[12px] text-gray-500 line-clamp-2">
  //                     {data.description}
  //                   </p>
  //                 </div>

  //                 <div className="flex flex-col items-center gap-3">
  //                   <img
  //                     src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${data.imageId}`}
  //                     alt=""
  //                     className="w-[130px] h-[130px] rounded-lg object-cover"
  //                   />

  //                   <button
  //                     onClick={() => cartRemove(i)}
  //                     className="text-sm font-semibold text-red-600 border border-red-200 px-4 py-1.5 rounded-lg bg-white hover:bg-red-50 transition"
  //                   >
  //                     Remove
  //                   </button>
  //                 </div>
  //               </div>
  //             ))}

  //             <div className="bg-white rounded-xl shadow-xl p-4 mt-6">
  //               <div className="flex justify-between items-center mb-4">
  //                 <p className="text-lg font-semibold text-gray-800">
  //                   Total Amount
  //                 </p>
  //                 <p className="text-xl font-bold text-gray-900">
  //                   ₹ {totalAmount}
  //                 </p>
  //               </div>

  //               <div className="flex gap-4">
  //                 <button
  //                   onClick={allcartRemove}
  //                   className="flex-1 py-2 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-600 transition"
  //                 >
  //                   Clear Cart
  //                 </button>

  //                 <button
  //                   onClick={allItemOrder}
  //                   className="flex-1 py-2 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700 transition"
  //                 >
  //                   Place Order
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-gray-50">
  //           <img
  //             src="/images/noitem.png"
  //             alt=""
  //             className="w-[220px] h-[220px]"
  //           />

  //           <h1 className="text-xl font-semibold text-gray-800">
  //             Your cart is empty
  //           </h1>

  //           <Link to="/">
  //             <button
  //               onClick={handleResInfo}
  //               className="mt-2 px-5 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
  //             >
  //               Browse Restaurants
  //             </button>
  //           </Link>
  //         </div>
  //       )}
  //     </>
  //   );
  // }

  // export default Cart;

