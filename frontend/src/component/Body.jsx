import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { hideShimmer } from "../utility/shimmerSlice";


function Body() {
  const [data, setData] = useState([]);
  const [scroll, setScroll] = useState(0);
  const dispatch = useDispatch()

useEffect(() => {
  const timer = setTimeout(async () => {
    try {
      const response = await fetch("/data.json");
      const result = await response.json();

      const images =
        result?.data?.cards?.[0]?.card?.card?.imageGridCards?.info || [];

      setData(images);
      dispatch(hideShimmer());
    } catch (err) {
      console.error(err);
    }
  });

  return () => clearTimeout(timer);
}, [dispatch]);


  
  const getScrollStep = () => {
    if (window.innerWidth >= 1024) return 144 + 8; 
    if (window.innerWidth >= 768) return 112 + 8;  
    return 80 + 8; // mobile w-20 + gap-2
  };

 
  const handleLeft = () => {
    const step = getScrollStep();
    if (scroll < 0) setScroll(scroll + step); 
  };


  const handleRight = () => {
    const step = getScrollStep();
    const totalWidth = data.length * step;       
    const visibleWidth = window.innerWidth * 0.8; 

 
    if (Math.abs(scroll) + visibleWidth < totalWidth) {
      setScroll(scroll - step);
    }
  };

  return (
    <div className="w-screen flex flex-col justify-center items-center mt-10 md:mt-15 lg:mt-20  ">
      <div>
        <h1 className="text-[#FFEEE5] header lg:leading-[46px] md:leading-8 leading-5 md:text-2xl text-[18px] lg:text-4xl font-bold absolute top-[19%] md:top-[18%] lg:top-[38%] left-[10%]  lg:left-[13%]">
          Order Online Delivery <br /> Restaurants Near Me
        </h1>
        <img src="images/food.png" alt="no image" className="w-[90vw] lg:w-[80vw] h-[18vh] lg:h-[45vh] sm:h-[20vh] sm:w-[90vw] object-fit" />
      </div>

      <div className="w-[90vw] lg:w-[80vw] flex flex-row justify-between mb-2 mt-10">
        <h1 className="header font-bold text-[18px] tracking-tight lg:text-2xl">
          What's on your mind?
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

      <div className="w-[90vw] lg:w-[80vw]  overflow-hidden header">
        <div
          className="duration-500 transition-transform flex flex-row gap-2"
          style={{ transform: `translateX(${scroll}px)` }}
        >
          {data.map((item, index) => (
            <img
              key={item.id || index}
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
              alt="food"
              className="transition-transform hover:-translate-y-4 lg:w-36 lg:h-44 md:w-28 md:h-36 w-20 h-26"
            />
          ))}
        </div>
        <hr className="border-[0.1px] mt-8 border-gray-200" />
      </div>
    </div>
  );
}

export default Body;
