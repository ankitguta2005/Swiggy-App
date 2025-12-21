export function extractFoodItems(menuInfo, restaurantInfo) {
  if (!menuInfo?.cards) return [];

  return menuInfo.cards
    .filter(c => c?.card?.card?.itemCards)
    .flatMap(section =>
      section.card.card.itemCards.map(item => ({
        id: item.card.info.id,
        name: item.card.info.name,
        description: item.card.info.description || "",
        price:
          item.card.info.defaultPrice ??
          item.card.info.price ??
          0,
        imageId: item.card.info.imageId,
        restaurantName: restaurantInfo?.name,
        restaurantId: restaurantInfo?.id,
      }))
    );
}
