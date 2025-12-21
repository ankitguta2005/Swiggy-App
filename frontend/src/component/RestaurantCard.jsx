import React from 'react'
import { Link } from 'react-router-dom'

function RestaurantCard({item , link}) {

  return (
    
   
    <>
   
  
 <Link to={`menu/${link.split('/')[5]}`}>
<div className="w-full rounded-2xl overflow-hidden">
  <img
    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${item.info.cloudinaryImageId}`}
    alt="food"
    className="w-full h-[120px] sm:h-[140px] md:h-40 lg:h-[186px] object-cover object-center cursor-pointer"
  />
</div>

{item.info.aggregatedDiscountInfoV3 && (
  <h2 className="z-50 text-[12px] sm:text-[14px] md:text-[16px] font-extrabold mt-[-30px] pl-2 sm:pl-4 text-[#FFEEE5]">
    {item.info.aggregatedDiscountInfoV3.header}{" "}
    {item.info.aggregatedDiscountInfoV3.subHeader}
  </h2>
)}
<h3 className="mt-3 text-[14px] sm:text-[16px] md:text-[18px] font-bold">{item?.info?.name}</h3>

  <div className="flex flex-row flex-wrap items-center">
    <img src="images/star.svg" alt="" className='w-2.5 md-:w-[22px] '   />
    <p className="ml-1  text-[10px]  md:text-[16px] font-semibold mr-1">{item?.info?.avgRating} </p> |<p className="ml-1 font-semibold text-[10px] md:text-[16px] "> {item?.info?.sla?.slaString}</p>
  </div>
  <div className="flex flex-row items-center gap-2 flex-wrap overflow-hidden mt-1">
    {item?.info?.cuisines.map((items,i)=>(
        <p className=" text-[10px] md:text-[14px] text-justify mt-1 font-medium transition-transform hover:-translate-y-1 duration-150  px-2 bg-gray-100 rounded-[5px] leading-relaxed" key={i} >
             {items} 
        </p>
    ))}
     
  </div>
  <p className=" text-[10px] md:text-[14px] text-justify font-medium px-1 animate-pulse leading-relaxed mt-1.5"> {item.info?.areaName}</p>
</Link>
    </>
  )
}

export default RestaurantCard