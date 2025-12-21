import React, { useEffect, useState } from 'react'
import RestaurantCard from './RestaurantCard'

function OnlineRestaurant({ data = [] }) {
  const filterMenu = [
    { filterName: 'Ratings 4.5' },
    { filterName: 'Offers' },
    { filterName: 'Rs.300-Rs.400' },
    { filterName: 'Less than Rs.300' },
  ]

  const [filterData, setFilterData] = useState(data)
  const [customBtn, setCustomBtn] = useState(null)

  useEffect(() => {
  setFilterData(data ?? [])
}, [data])




  function handleData(e) {

    if (e?.stopPropagation) e.stopPropagation()
    setFilterData(data ?? [])
    setCustomBtn(null)
  }

  function handleBtn(filterName) {
    // toggle selection (keep your original style of setting customBtn to string)
    const newSelected = customBtn === filterName ? null : String(filterName)
    setCustomBtn(newSelected)

    // if toggled off -> show all
    if (newSelected === null) {
      setFilterData(data ?? [])
      return
    }

    // apply filter using the clicked filterName (not the previous state)
    if (newSelected === 'Ratings 4.5') {
      const datas = (data ?? []).filter(d => Number(d?.info?.avgRating) >= 4.5) || []
      setFilterData(datas)
    } else if (newSelected === 'Offers') {
      const datas = (data ?? []).filter(d => {
        return Boolean(
          d?.info?.aggregatedDiscountInfoV3 ||
          d?.info?.aggregatedDiscountInfoV2 ||
          d?.info?.aggregatedDiscountInfo
        )
      }) || []
      setFilterData(datas)
    } else if (newSelected === 'Rs.300-Rs.400') {
      const datas = (data ?? []).filter(d => {
        const price = Number(d?.info?.costForTwo?.match(/\d+/)?.[0])
        return Number.isFinite(price) && price >= 300 && price <= 400
      }) || []
      setFilterData(datas)
      // console.log(datas)
    } else if (newSelected === 'Less than Rs.300') {
      const datas = (data ?? []).filter(d => {
        const price = Number(d?.info?.costForTwo?.match(/\d+/)?.[0])
        return Number.isFinite(price) && price < 300
      }) || []
      setFilterData(datas)
    } else {
      setFilterData(data ?? [])
    }
  }

  return (
    <div className=" mt-0 lg:mt-10">
      <h1 className="header font-bold text-[18px] tracking-tight mt-1  lg:text-2xl">
        Restaurants with online food delivery in Delhi
      </h1>

      <div className="flex flex-row gap-3 mt-4 ml-1  flex-wrap cursor-pointer">
        {filterMenu.map((m) => (
          <button
            key={m.filterName}
            className={`md:text-[12px] text-[8px]  hover:scale-110 flex justify-center items-center gap-1   rounded-[10px] md:rounded-2xl border px-2 py-1 border-gray-300 ${
              customBtn === m.filterName ? 'bg-[#2321] border' : ''
            }`}
            onClick={() => handleBtn(m.filterName)}
            type="button"
          >
            {m.filterName}
            <img
              src="images/x.svg"
              alt=""
              className={`w-3 h-3  ${customBtn === m.filterName ? 'block' : 'hidden'} cursor-pointer`}
              onClick={(e) => handleData(e)}
            />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8">
        {(filterData ?? []).map((item, index) => (
          <div
            key={item?.info?.id ?? index}
            className="slider-card w-full sm:w-40 md:w-[200px] lg:w-[280px] shrink-0 duration-300 hover:translate-y-2 transition-transform rounded-2xl overflow-hidden"
          >
            <RestaurantCard item={item} link={item?.cta?.link} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OnlineRestaurant
