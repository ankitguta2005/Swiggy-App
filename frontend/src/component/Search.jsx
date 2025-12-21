import React, { useEffect, useState } from "react";
import { searchFoodItems } from "../utils/searchFood";
import { Link, useNavigate } from "react-router-dom";

function Search() {
  const [restaurants, setRestaurants] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("DISHES");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRestaurants() {
      const res = await fetch("/data.json");
      const json = await res.json();
      const list =
        json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      setRestaurants(list);
    }
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      const data = await searchFoodItems(query, restaurants);
      setResults(data);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, restaurants]);

  const groupedResults = results.reduce((acc, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = {
        restaurantName: item.restaurantName,
        restaurantId: item.restaurantId,
        items: [],
      };
    }
    acc[item.restaurantId].items.push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#f6f7f8]  pt-5 lg:pt-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-md px-4 h-14">
          <button onClick={() => navigate(-1)} className="text-xl">←</button>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for dishes !    eg:- biryani"
            className="flex-1 outline-none lg:text-lg text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xl text-gray-500"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex gap-3 mt-6 text-sm lg:text-lg">
          {["RESTAURANTS", "DISHES"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-full font-semibold shadow ${
                tab === t
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading && (
          <div className="w-full h-full flex justify-center flex-col gap-4 items-center mt-20">
            {/* <div className="lg:w-10 lg:h-10 w-8 h-8 border-4 border-t-[#353535c9] border-[#4444447d] rounded-full animate-spin"></div> */}
            <div>
           
                <img src="images/foods.svg" alt=""  className="animate-bounce ml-2 w-20 h-20"/>
            </div>
          

          </div>
        )}

        {!loading && query.length >= 2 && results.length === 0 && (
          <div className="mt-16 flex flex-col items-center text-center text-gray-600">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-xl font-semibold">Dish not found</h2>
            <p className="mt-2 text-sm max-w-sm">
              We couldn’t find any dishes matching your search. Try a different keyword.
            </p>
          </div>
        )}

        {!loading &&
          Object.values(groupedResults).map((group) => (
            <div
              key={group.restaurantId}
              className="bg-white rounded-2xl shadow-lg mt-8 p-6"
            >
              <Link
                to={`/menu/${group.restaurantName
                  .toLowerCase()
                  .replace(/\s+/g, "-")}-rest${group.restaurantId}`}
                className="flex justify-between items-center mb-5"
              >
                <h2 className="font-bold text-lg">
                  By {group.restaurantName}
                </h2>
                <span className="text-xl">→</span>
              </Link>

              <hr className="mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.items.map((item) => (
                  <Link
                    key={item.id}
                    to={`/menu/${group.restaurantName
                      .toLowerCase()
                      .replace(/\s+/g, "-")}-rest${group.restaurantId}`}
                    className="flex justify-between gap-4 hover:bg-gray-50 p-3 rounded-xl transition"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="font-medium mt-1 text-gray-700">
                        ₹ {(item.price + "").slice(0, -2)}
                      </p>
                      <button className="mt-3 text-sm px-4 py-1 rounded-full shadow">
                        More Details
                      </button>
                    </div>

                    <div className="relative">
                      <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/${item.imageId}`}
                        alt=""
                        className="w-28 h-28 rounded-xl object-cover shadow"
                      />
                      <button className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white shadow-md px-6 py-1 rounded-lg font-bold text-green-600">
                        ADD
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Search;
