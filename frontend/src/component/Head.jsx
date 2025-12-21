import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { removeUserData } from "../utility/authSlice";

const FALLBACK_IMAGE = "/images/profile.svg";

function Head() {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");

  const cartItems = useSelector((state) => state.cart.items);
  const userData = useSelector((state) => state.auth.userData);
  const cartCount = Array.isArray(cartItems) ? cartItems.length : 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImgError = (e) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const toggleProfile = () => {
    if (userData) setVisible((prev) => !prev);
  };

  const logout = () => {
    dispatch(removeUserData());
    setVisible(false);
    setShowMenu(false);
  };

  const show = () => {
    toast.error("Currently not available");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full  bg-white shadow-md z-70">
        <div className="max-w-7xl mx-auto px-4 h-16 lg:h-[12vh] flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link to="/">
              <img
                src="/images/logo.png"
                className="w-28 sm:w-32 lg:w-40"
                alt="logo"
              />
            </Link>

            <div
              className="hidden lg:flex items-center gap-2   cursor-pointer"
              onClick={show}
            >
              <div className="w-px h-8 bg-gray-300"></div>
              <img src="/images/2.svg" className="w-4" />
              <p className="font-semibold text-gray-700">
                Setup your precise location
              </p>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 justify-center max-w-md">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
             onClick={()=>{  navigate("/search")}}
              placeholder="Search for dishes or restaurants"
              className="rounded-2xl  lg:w-[90vw]  w-[50vw] p-3   placeholder-[#716d6d] text-[#000000] bg-[#e5e6e6] outline outline-none "
            />
              <img
                    src="/images/1.svg"
                    alt=""
                    className="w-5 ml-[-50px]   cursor-pointer"
                  />
          </div>

          <div className="hidden lg:flex items-center gap-8 font-semibold">
            <Link
              to="/cart"
              className="flex items-center gap-2 hover:text-[#ff5200]"
            >
              <img src="/images/cart.svg" className="w-5 h-5" />
              <span>Cart ({cartCount})</span>
            </Link>

            {userData ? (
              <div className="relative flex items-center gap-2 cursor-pointer">
                <img
                  src={userData?.image || FALLBACK_IMAGE}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={handleImgError}
                  onClick={toggleProfile}
                />
                <span onClick={toggleProfile}>
                  {userData?.name || "Profile"}
                </span>

                {visible && (
                  <div className="absolute right-0 top-12 bg-white shadow-lg rounded-xl px-4 py-2">
                    <button
                      onClick={logout}
                      className="text-sm font-semibold hover:text-[#ff5200]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-2 hover:text-[#ff5200]"
              >
                <img src={FALLBACK_IMAGE} className="w-6 h-6" />
                <span>Profile</span>
              </Link>
            )}
          </div>

          <div className="lg:hidden flex items-center gap-7">
            <Link to="/search">
              <img src="/images/searches.svg" className="w-5 h-5" />
            </Link>

           

            <button onClick={() => setShowMenu(true)}>
              <img src="/images/menu.jpg" className="w-6 h-6" />
            </button>

            
          </div>
        </div>
      </nav>

      {showMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-60 lg:hidden"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="absolute  right-0 top-16 h-full w-[60%] bg-white flex  flex-col font-semibold"
            onClick={(e) => e.stopPropagation()}
          >
           

            <Link
              to="/search"
              onClick={() => setShowMenu(false)}
              className="p-4 flex gap-3 hover:text-[#ff5200]"
            >
              <img src="/images/searches.svg" className="w-5 h-5" />
              Search
            </Link>
            <hr className=" border-[#5a5a5a7c] mx-2" />

            <Link
              to="/cart"
              onClick={() => setShowMenu(false)}
              className="p-4 flex gap-3 hover:text-[#ff5200]"
            >
              <img src="/images/cart.svg" className="w-5 h-5" />
              Cart ({cartCount})
            </Link>
             <hr className=" border-[#5a5a5a7c] mx-2" />

            <Link>
            {userData ? (
              <div className=" flex items-center   p-4 gap-3 cursor-pointer">
                <img
                  src={userData?.image || FALLBACK_IMAGE}
                  className="w-6 h-6 rounded-full object-cover"
                  onError={handleImgError}
                  onClick={toggleProfile}
                />
                <span onClick={toggleProfile}>
                  {userData?.name || "Profile"}
                </span>

              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center p-4 gap-2 hover:text-[#ff5200]"
              >
                <img src={FALLBACK_IMAGE} className="w-6 h-6" />
                <span>Profile</span>
              </Link>
            )}
            </Link>
             <hr className=" border-[#5a5a5a7c] mx-2" />

            {userData && (
              <button
                onClick={logout}
                className="p-4 text-left text-red-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      <div className="pt-16 lg:pt-[11vh]">
        <Outlet />
      </div>
    </>
  );
}

export default Head;
