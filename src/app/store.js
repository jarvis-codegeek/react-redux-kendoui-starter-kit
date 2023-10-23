import { configureStore } from '@reduxjs/toolkit'
import cardContainer from '../pages/CardContainer/reducer/cardContainerSlice';

export const store = configureStore({
  reducer: {
    form1: cardContainer,
  }
})