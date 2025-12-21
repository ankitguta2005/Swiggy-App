import { menuCache } from "./menuCache";
import { extractFoodItems } from "./extractFoodItems";

export async function searchFoodItems(query, restaurants) {
  const results = [];

  if (!query || query.length < 2) return results;

  for (const res of restaurants.slice(0, 25)) {
    const resId = res?.info?.id;
    if (!resId) continue;

    try {
      let menuData;

    
      if (menuCache.has(resId)) {
        menuData = menuCache.get(resId);
      } else {
        const resp = await fetch(
          `https://swiggy-data-api.vercel.app/restaurants/${resId}.json`
        );
        menuData = await resp.json();
        menuCache.set(resId, menuData);
      }

      const menuInfo =
        menuData?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR;

      const restaurantInfo =
        menuData?.data?.cards?.[2]?.card?.card?.info;

      const items = extractFoodItems(menuInfo, restaurantInfo);

      const matched = items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      results.push(...matched);
    } catch (err) {
      console.error("Search failed for restaurant:", resId + err);
    }
  }

  return results;
}
