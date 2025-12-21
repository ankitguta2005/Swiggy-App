// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cartData')) || [],
    restaurant: JSON.parse(localStorage.getItem('resInfo')) || null,
  },
  reducers: {
    addToCart(state, action) {
      const { item, restaurantInfo } = action.payload;
      console.log(action);

      // Allow only if cart is empty OR same restaurant
      if (state.items.length === 0 || state.restaurant?.id === restaurantInfo.id  ) {
        state.items.push(item);
        state.restaurant = restaurantInfo;
      }
      // Else: do nothing (alert shown in Menu component)

      localStorage.setItem('cartData', JSON.stringify(state.items));
      localStorage.setItem('resInfo', JSON.stringify(state.restaurant));
    },

    removeFromCart(state, action) {
      const index = action.payload;
      state.items.splice(index, 1);

      if (state.items.length === 0) {
        state.restaurant = null;
        localStorage.removeItem('resInfo');
      }
      localStorage.setItem('cartData', JSON.stringify(state.items));
    },

    clearCart(state) {
      state.items = [];
      state.restaurant = null;
      localStorage.removeItem('cartData');
      localStorage.removeItem('resInfo');
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;