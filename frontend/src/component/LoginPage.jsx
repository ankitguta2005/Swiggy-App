import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";

import { auth, provider } from "../config/firebaseAuth";
import { addUserData } from "../utility/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleAuth() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(
        addUserData({
          name: user.displayName,
          image: user.photoURL,
        })
      );

      toast.success("Login successful");
      navigate("/"); 
    } catch (error) {
      toast.error("Login failed");
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ff5200] relative ">
     
        <img src="images/log1.png" alt="" className="sm:w-[300px] sm:h-[500px] w-[150px] h-[250px] fixed left-0 top-[10%] "/>
        <img src="images/log2.png" alt=""  className="sm:w-[300px] sm:h-[500px] w-[150px] h-[250px] fixed right-0 bottom-[10%]" />
     
     
      <div className="bg-white w-[340px] p-4 sm:p-6 rounded-xl shadow-lg">

        <h1 className="sm:text-2xl text-[20px] font-bold text-center text-gray-800 mb-6">
          Login to Continue
        </h1>

        <button
          onClick={handleAuth}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 font-semibold text-gray-700 hover:bg-gray-100 transition"
        >
          <img
            src="/images/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By continuing, you agree to our <span className="font-bold">Terms</span>  & <span className="font-bold">Privacy Policy</span>
        </p>

      </div>
      
    </div>
  );
}

export default LoginPage;
