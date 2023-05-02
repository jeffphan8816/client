import { configureStore } from "@reduxjs/toolkit";
import cartLocalStorageMiddleware from "../middlewares";
import cartReducer from "../state";

// import { useDispatch } from 'react-redux';


const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: [cartLocalStorageMiddleware],
});


export default store;