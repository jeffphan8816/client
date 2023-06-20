import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  isCartOpen: false,
  cart: savedCart.cart || [],
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    setItems: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItemInState = state.cart.find(
        (cartItem) => cartItem.id === id
      );

      if (existingItemInState) {
        // Item already exists in cart, update quantity
        state.cart = state.cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        // Item doesn't exist in cart, add it
        state.cart = [...state.cart, action.payload];
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    increaseQuantity: (state, action) => {
      console.log("🚀 ~ file: index.js:44 ~ state:", state)
      state.cart = state.cart.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },

    decreaseQuantity: (state, action) => {
      state.cart = state.cart.map((item) => 
        item.id === action.payload && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
    },

    updateCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const {
  setIsCartOpen,
  setItems,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
