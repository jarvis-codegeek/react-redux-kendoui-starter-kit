import { configureStore } from '@reduxjs/toolkit'
import cardContainerReducer from '../pages/CardContainer/reducer/cardContainerSlice';

export const store = configureStore({
  reducer: {
    cardContainer: cardContainerReducer,
  }
})