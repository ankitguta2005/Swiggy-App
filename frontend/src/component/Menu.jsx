import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import { cartContext } from "../context/ContextApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../utility/cartSlice";
import toast from 'react-hot-toast';
import { clearCart } from "../utility/cartSlice";
import Load from "./Load";

function Menu() {

  const [menu, setData] = useState(null);
  const [load, setLoad] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [discount, setDiscount] = useState([]);
  const [menuInfo, setMenuInfo] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);
  const [showMore, setShowMore] = useState({});  
  const[isDiffRes,setDiffRes]  = useState(false)
  console.log(menu);
 

  const [topPicks, setTopPicks] = useState([]);  
  // const [cartData,setCartData] = useContext(cartContext)
  const [added, setAdded ] = useState(false)  
  // redux
 const cartItems = useSelector((state) => state.cart.items);

 const savedRestaurant = useSelector((state) => state.cart.restaurant);
 const dispatch = useDispatch()

  function toggleShow(itemId) {
    setShowMore((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  }
    // const resInfo = useSelector((state)=>state.cartSlice.resInfo)
  
 

const addCart = (itemObj) => {
  if (cartItems.length === 0) {
    dispatch(addToCart({ item: itemObj, restaurantInfo }));
    toast.success('Added to cart')
  }
   else if (cartItems.some(item => item?.id === itemObj.id)) {
  toast.error('Already in cart');
}


    else if (savedRestaurant?.id === restaurantInfo.id  ) {
    dispatch(addToCart({ item: itemObj, restaurantInfo }));
    toast.success('Added to cart')
  } else  {
   
    toast.error('Cannot add items from different restaurants!')
    setDiffRes(!isDiffRes)

  }
};

  const { id } = useParams();    

  const newId = id?.split("-") || [];
  const ids = newId.at(-1)?.split("rest")?.pop() || "";

  const [move, setMove] = useState(0);
  const [moves, setMoves] = useState(0);    

  const sliderWidths=
    typeof window !== "undefined" && window.innerWidth >= 1024 ? 250 : 300;
  const maxMoves =
    topPicks.length > 0 ? -sliderWidths * (topPicks.length - 1) : 0;   

  function onLefts() {
    setMoves((prev) => Math.min(prev + sliderWidths, 0));
  }

  function onRights() {
    setMoves((prev) => Math.max(prev - sliderWidths, maxMoves));
  }

  const sliderWidth =
    typeof window !== "undefined" && window.innerWidth >= 1024 ? 23 : 57;
  const maxMove =
    discount.length > 0 ? -sliderWidth * (discount.length - 1) : 0;
     const [search,setSearch] = useState("")
  function handleSearch(e)
  {
    console.log(e.toLocaleLowerCase());
    setSearch(e.toLocaleLowerCase())
  }

const filterMenu =
  menuInfo?.cards
    ?.map((section) => {
      const filteredItems =
        section?.card?.card?.itemCards?.filter((item) =>
          item?.card?.info?.name
            ?.toLowerCase()
            .includes(search)
        ) || [];

      if (filteredItems.length === 0) return null;

      return {
        ...section,
        card: {
          ...section.card,
          card: {
            ...section.card.card,
            itemCards: filteredItems,
          },
        },
      };
    })
    .filter(Boolean) || [];

console.log(filterMenu);


  function scrollup(index) {
  setOpenIndex((prev) => {
    if (prev === index) return prev; // do nothing
    return index; // switch section
  });
}


  function onLeft() {
    setMove((prev) => Math.min(prev + sliderWidth, 0));
  }

  function onRight() {
    setMove((prev) => Math.max(prev - sliderWidth, maxMove));
  }
 

   function allcartRemove() {
     
          dispatch(clearCart());
       toast.success('All Item removed')
       setDiffRes(!isDiffRes)
  
    }

  useEffect(() => {
    setMove((prev) => Math.max(prev, maxMove));
  }, [discount.length, maxMove]);

  useEffect(() => {
    async function test() {
      try {
        const resp = await fetch(
          `https://swiggy-data-api.vercel.app/restaurants/${ids}.json`
        );
        
        const res = await resp.json();
        
        setData(res);      
        setRestaurantInfo(res?.data?.cards?.[2]?.card?.card?.info ?? null);
        setDiscount(
          res?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle
            ?.offers || []
        );
        setMenuInfo(
          res?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR ?? null
        );

        setTopPicks(
          res?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
            .filter((datas) => datas.card.card.title == "Top Picks")[0]
            ?.card?.card?.carousel || []
        )
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setTimeout(()=>{
             setLoad(true);
        },1000)
     
      }
    }
    if (ids) test();
  }, [ids]);

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {!load ? (
        <Load/>
      ) : (
        <div className="flex justify-center items-center mt-10 ">
          <div className="flex flex-col w-[94vw] lg:w-[50vw] min-h-screen ">
            <h1 className="text-[10px] tracking-wider font-light  cursor-pointer">
              <Link to="/">
                <span className="hover:font-bold"> Home </span>
              </Link>{" "}
              /{" "}
              <span className="hover:font-bold">
                {menu?.data?.cards?.[2]?.card?.card?.info?.city}
              </span>{" "}
              /{" "}
              <span className="font-bold">
                {menu?.data?.cards?.[0]?.card?.card?.text}
              </span>
            </h1>

            <h1 className="font-bold mt-8 text-2xl ml-4">
              {menu?.data?.cards?.[0]?.card?.card?.text}
            </h1>

            <div className="m-4 rounded-[20px] p-4 flex flex-col header bg-linear-to-b from-white via-gray-100 to-gray-200">
              <div className="flex flex-col gap-2 mt-2 bg-white rounded-[20px] border-gray-100 border">
                <div className="flex flex-row gap-1 p-4">
                  <img src="/images/star.svg" alt="" width="23px" height="4px" />
                  <h4 className="text-[14px] font-bold">
                    {restaurantInfo?.avgRating}
                  </h4>
                  <h4 className="text-[14px] font-semibold">
                    ({restaurantInfo?.totalRatingsString})
                  </h4>
                  <h4 className="text-[14px] font-semibold">
                    . {restaurantInfo?.costForTwoMessage}
                  </h4>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-[12px] text-[#ff5200] underline decoration-[#ff5200] -mt-2.5 tracking-wide pl-4 font-semibold">
                    {restaurantInfo?.cuisines?.slice(0, 2).join(",")}
                  </h4>

                  <div className="flex flex-row gap-3 pl-4">
                    <div className="flex flex-col w-7 justify-center items-center mt-4">
                      <div className="w-[7px] h-[7px] rounded-full bg-[#c4c4c4]"></div>
                      <div className="bg-[#c4c4c4] w-px h-7"></div>
                      <div className="w-[7px] h-[7px] rounded-full bg-[#c4c4c4]"></div>
                    </div>

                    <div className="flex flex-col w-full justify-center items-start mt-4">
                      <div className="flex flex-row gap-4 items-center">
                        <h1 className="text-[14px] font-bold tracking-wider">
                          Outlet
                        </h1>
                        <h1 className="text-[12px] text-[#aeadad] tracking-wider">
                          {restaurantInfo?.locality}
                        </h1>
                      </div>
                      <div className="bg-[#ffffff] w-px h-4"></div>
                      <div>
                        <h1 className="text-[14px] font-bold tracking-wider">
                          {restaurantInfo?.sla?.slaString}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4 border-gray-300" />

                  <div className="flex flex-row items-center gap-4">
                    <img
                      src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_86,h_30/v1634558776/swiggy_one/OneLogo_3x.png"
                      className="pb-3 ml-3"
                      width="40"
                      height="40"
                      alt="one"
                    />
                    <h1 className="pb-3 text-[15px] font-bold text-[#ff5200] tracking-wide">
                      {restaurantInfo?.aggregatedDiscountInfo?.header}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-col flex gap-4 mt-6 overflow-hidden">
              <div className="flex flex-row justify-between p-1">
                <h1 className="text-[16px] font-bold">Deals for you</h1>

                <div className="flex flex-row gap-6">
                  <button onClick={onLeft}>
                    <img
                      src="/images/left.svg"
                      alt=""
                      className="w-6 bg-[#ebecf0] p-1 rounded-2xl hover:scale-125 transition-transform"
                    />
                  </button>

                  <button onClick={onRight}>
                    <img
                      src="/images/right.svg"
                      alt=""
                      className="w-6 bg-[#ebecf0] p-1 rounded-2xl hover:scale-125 transition-transform"
                    />
                  </button>
                </div>
              </div>

              <div className="w-full overflow-hidden mt-4">
                <div
                  className="flex flex-row gap-4 flex-nowrap transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(${move}vw)` }}
                >
                  {discount.map((data, id) => (
                    <div
                      key={id}
                      className="border-2 border-[#3a3f4548] min-w-[60vw] lg:min-w-[27vw] rounded-2xl flex lg:p-1 flex-row items-center gap-3"
                    >
                      <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${data?.info?.offerLogo}`}
                        width="48"
                        className="m-3"
                        height="48"
                        alt="Offer logo"
                      />
                      <div className="flex flex-col">
                        <h1 className="font-bold text-[14px] md:text-[16px]">
                          {data?.info?.header}
                        </h1>
                        <h1 className="text-[12px] md:text-[14px] text-[#9b9996]">
                          {data?.info?.primaryDescription}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-row justify-center gap-3">
                  <img src="/images/deco.svg" alt="" className="w-5" />
                  <h1 className="tracking-[0.3em] font-semibold text-[14px] text-[#716d6d]">
                    Menu
                  </h1>
                  <img src="/images/deco.svg" alt="" className="w-5" />
                </div>

                {/* top picks */}
                <div className="mt-8 flex flex-row">
                  <input
                    type="text"
                    placeholder="Search for dishes"
                    className="rounded-2xl w-[90vw] lg:w-[50vw] p-3 text-center mb-6 placeholder-[#716d6d] text-[#000000] bg-[#e5e6e6] outline outline-none" onChange={(e)=>{handleSearch(e.target.value)}}
                  />
                  <img
                    src="/images/1.svg"
                    alt=""
                    className="w-5 ml-[-50px] mb-6 cursor-pointer"
                  />
                </div>

                {added && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                      className="absolute inset-0 bg-black/50"
                      onClick={() => setAdded(false)}
                      aria-hidden="true"
                    />
                    <div
                      className="relative bg-white  rounded-2xl shadow-lg p-4 flex flex-col items-center gap-2"
                      role="alert"
                      aria-live="assertive"
                    >
                      <p className="text-[#ff5200] text-[18px] tracking-wider font-extrabold p-5">
                        Item already in Cart !
                      </p>
                    </div>
                  </div>
                )}

                {topPicks.length > 0 && (
                  <div className="flex flex-row justify-between p-1">
                    <h1 className="text-[20px] font-extrabold">Top Picks</h1>

                    <div className="flex flex-row gap-6">
                      <button onClick={onLefts}>
                        <img
                          src="/images/left.svg"
                          alt=""
                          className="w-6 bg-[#ebecf0] p-1 rounded-2xl hover:scale-125 transition-transform"
                        />
                      </button>

                      <button onClick={onRights}>
                        <img
                          src="/images/right.svg"
                          alt=""
                          className="w-6 bg-[#ebecf0] p-1 rounded-2xl hover:scale-125 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                )}

                <div className="w-full overflow-hidden mt-4">
                  <div
                    className="flex flex-row gap-4 flex-nowrap transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(${moves}px)` }}
                  >
                    {topPicks.length > 0 &&
                      topPicks.map((data, id) => 
                        (
                          <div
                            key={id}
                            className=" border-[#3a3f4548]   flex  flex-row items-center gap-3"
                          >
                            <img
                              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${data?.creativeId}`}
                              alt="no image"
                              className="w-[300px] rounded-[20px] h-[292px] shrink-0 border-0 outline-0 object-cover"
                              aria-hidden="true"
                            ></img>
                            <div className="w-[300px] h-[292px] rounded-[20px] absolute">
                              
                             
                             
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>

                <div className="mt-5 header">
               
                  {filterMenu.map((data, idx) => (
                    <div key={idx} className="mb-2">
                      <div className="flex flex-row justify-between p-2 mb-3">
                        <h1 className="font-bold text-[16px] lg:text-[20px]">
                          {data?.card?.card?.title}{" "}
                          <span>
                            ({data?.card?.card?.itemCards.length})
                          </span>
                        </h1>

                        <i
                          className={`${
                            openIndex === idx
                              ? "fa-solid fa-angle-up"
                              : "fa-solid fa-angle-down"
                          } transition-transform hover:scale-110 duration-200 cursor-pointer`}
                          onClick={() => scrollup(idx)}
                        ></i>
                      </div>

                      {openIndex === idx && (
                        <div className="m-4">
                          {data?.card?.card?.itemCards.map((datas, i) => {
                            const itemId = datas?.card?.info?.id;
                            const descriptions =
                              datas?.card?.info?.description || " ";
                            const isOpen = showMore[itemId];
                            const desc =
                              isOpen
                                ? descriptions
                                : descriptions.slice(0, 150) +
                                  (descriptions.length > 150
                                    ? " ..."
                                    : "");
                                   
                                   
                            const obj = {
                              id: datas?.card?.info?.id ?? "",
                              name: datas?.card?.info?.name ?? "",
                              imageId: datas?.card?.info?.imageId ?? "",
                              description:datas?.card?.info?.description ?? "",
                              defaultPrice:datas?.card?.info?.defaultPrice  ??  datas?.card?.info?.price,
                              vegClassifier:datas?.card?.info?.itemAttribute?.vegClassifier ?? "",
                              rating : datas?.card?.info?.ratings?.aggregatedRating,
                            }
                           
                            return (
                              <>
                                <div
                                  key={i}
                                  className="pb-3 w-full flex flex-row gap-2 relative justify-between items-center lg:items-start "
                                >
                                  <div className="flex flex-col mt-4 ">
                                    <img
                                      src={
                                        datas?.card?.info?.itemAttribute
                                          ?.vegClassifier === "VEG"
                                          ? "/images/veg.svg"
                                          : "/images/nonveg.svg"
                                      }
                                      alt=""
                                      className="w-4 h-4 mt-4 mb-1"
                                    />

                                    <h1 className="text-[15px] lg:text-[18px] text-[#020509] font-bold">
                                      {datas?.card?.info?.name}
                                    </h1>

                                    <p className="text-[15px] text-[#02060B]  font-semibold">
                                      {" "}
                                      ₹{" "}
                                      {(
                                        (datas?.card?.info?.defaultPrice ??
                                          datas?.card?.info?.price ??
                                          0) + ""
                                      ).slice(0, -2)}
                                    </p>

                                    <div className="flex flex-row mt-1 mb-1 items-center">
                                      <img
                                        src="/images/stars.svg"
                                        className="w-5 h-5"
                                        alt="no image"
                                      />
                                      <p className="text-[14px] font-semibold text-[#E8AC1E]">
                                        {
                                          datas?.card?.info?.ratings
                                            ?.aggregatedRating?.rating
                                        }
                                      </p>
                                      <p className="text-[12px] font-semibold ml-0.5 text-[#687d93]">
                                        (
                                        {
                                          datas?.card?.info?.ratings
                                            ?.aggregatedRating?.ratingCountV2
                                        }
                                        )
                                      </p>
                                    </div>

                                    <div>
                                      <p
                                        className={`text-[#01040766] text-[12px] lg:text-[15px] font-semibold  leading-4 tracking-wide lg:leading-normal  mb-3 wrap-break-word text-balance text-ellipsis `}
                                      >
                                        {desc}
                                        {desc.length > 150 && (
                                          <button
                                            onClick={() => {
                                              toggleShow(itemId);
                                            }}
                                            className="text-[13px] ml-1 underline font-semibold  text-[#353535b6]"
                                          >
                                            {isOpen ? "less" : "more"}
                                          </button>
                                        )}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="mb-3 mt-3 shrink-0 flex flex-col gap-0 items-center ">
                                    <img
                                      loading="lazy"
                                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${
                                        datas?.card?.info?.imageId || ""
                                      }`}
                                      alt={
                                        datas?.card?.info?.name ||
                                        "dish image"
                                      }
                                      className="rounded-xl object-cover mt-2 w-[150px] h-[150px] lg:w-[170px] lg:h-[165px]"
                                    />

                                    <button
                                      className="bg-white text-[#1fac91] border w-[120px] z- px-1 py-2 text-[18px]  rounded-xl tracking-wide font-extrabold border-[#302e2f39] -mt-5 hover:bg-[#e5dbdb] transition-transform duration-1000 ease-in-out"
                                      onClick={() => {
                                        addCart(obj);
                                      }}
                                    >
                                      ADD
                                    </button>
                                  </div>
                                  {isDiffRes && 
                                  <>
                                  <div className="hidden lg:flex fixed w-[520px] h-[204px] bg-white shadow-xl z-50 bottom-8 left-[34%]  flex-col gap-2  px-8 py-6 ">
                                  
                                    <h1 className="text-[20px] font-bold">Items already in cart</h1>
                                    <p className="text-[14px] font-normal tracking-wide">Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                                    <div className="flex flex-row gap-2 mt-3">
                                      <button onClick={()=>{setDiffRes(!isDiffRes)}} className="w-[220px] h-[45px] text-center py-2 border-[#1ba672] border-2 text-[#1ba672] ">NO</button>
                                      <button onClick={allcartRemove} className="w-[220px] h-[45px] text-center py-2 border-[#1ba672] border-2 bg-[#1ba672] text-white ">YES, START AFRESH</button>
                                    </div>

                                  </div>
                                  
                                  <div className="fixed flex lg:hidden w-[90%] h-[204px] bg-white shadow-xl z-50 bottom-5 left-[4%]  flex-col gap-2  px-8 py-6 ">
                                  
                                    <h1 className="text-[20px] font-bold">Items already in cart</h1>
                                    <p className="text-[14px] font-normal tracking-wide">Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                                    <div className="flex flex-row items-center justify-center gap-5 mt-3">
                                      <button onClick={()=>{setDiffRes(!isDiffRes)}} className="w-[230px] h-[45px] text-center py-2 border-[#1ba672] border-2 text-[#1ba672] text-[14px] ">NO</button>
                                      <button onClick={allcartRemove} className="w-[230px] h-[45px] text-center py-2 border-[#1ba672] border-2 bg-[#1ba672] text-white text-[14px] ">YES, START AFRESH</button>
                                    </div>

                                  </div>
                                  </>
                                  }
                                </div>


                                <hr className="h-[0.5px] border-0 bg-[#e3e3e3] rounded-2xl " />
                              </>
                            );
                          })}
                        </div>
                      )}

                      <hr className="h-4 border-0 bg-[#f2f2f3]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
