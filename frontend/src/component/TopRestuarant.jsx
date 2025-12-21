import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import OnlineRestaurant from "./OnlineRestaurant";
import { Outlet } from "react-router-dom";

function TopRestaurant() {
  const [data, setData] = useState([]);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/data.json");
        const result = await response.json();

        const images =
          result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
          [];

        setData(images);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleLeft = () => {
    const card = document.querySelector(".slider-card");
    if (!card) return;
    const step = card.offsetWidth + parseInt(getComputedStyle(card).marginRight);
    setScroll((prev) => Math.min(prev + step, 0));
  };

  const handleRight = () => {
    const card = document.querySelector(".slider-card");
    if (!card) return;
    const step = card.offsetWidth + parseInt(getComputedStyle(card).marginRight);

    const containerWidth = window.innerWidth * 0.8; // w-[80vw]
    const totalWidth = data.length * step;

    if (Math.abs(scroll) + containerWidth < totalWidth) {
      setScroll((prev) => prev - step);
    }
  };

  return (
    <div className="w-screen flex flex-col justify-center items-center lg:mt-12">
      <div className="w-[90vw] lg:w-[80vw] flex flex-row justify-between mt-4">
        <h1 className="header font-bold text-[18px] tracking-tight lg:text-2xl">
          Top restaurant chains in Delhi
        </h1>

        <div className="flex gap-4 header">
          <img
            src="images/left.svg"
            alt="left"
            className="bg-gray-200 w-6 h-6 px-1 rounded-full cursor-pointer transition-transform hover:scale-150 hover:-translate-x-2.5 duration-300"
            onClick={handleLeft}
          />
          <img
            src="images/right.svg"
            alt="right"
            className="bg-gray-200 w-6 h-6 px-1 rounded-full cursor-pointer transition-transform hover:scale-150 hover:translate-x-2.5 duration-300"
            onClick={handleRight}
          />
        </div>
      </div>

      <div className="w-[90vw] lg:w-[80vw] overflow-hidden header mb-0 lg:mb-6">
        <div
          className="duration-500 transition-transform flex flex-row lg:gap-10 gap-2 mt-8"
          style={{ transform: `translateX(${scroll}px)` }}
        >
          {data.map((item, index) => (
            <div
  key={item.info.id || index}
  className="slider-card w-[150px] sm:w-[180px] md:w-[220px] lg:w-[280px] shrink-0 rounded-2xl flex flex-col duration-300 hover:translate-y-2 transition-transform overflow-hidden"
>
 
  <RestaurantCard item={item} link={item?.cta?.link} />
  
</div>

          ))}
        </div>

        <hr className="border-[0.1px] mt-0 lg:mt-2 border-gray-200" />
        <OnlineRestaurant data={data} />
        
      </div>
      
      
    </div>
    
    
   
  );
}

export default TopRestaurant;
