import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function OrderSuccess() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <CheckCircle size={80} className="text-green-500 mb-4" />

      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Order Placed Successfully
      </h1>

      <p className="text-gray-600 mb-6 m-2">
        Your payment was successful and your order is being prepared.
      </p>

      <Link to="/">
        <button className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}

export default OrderSuccess;
