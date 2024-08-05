import { createSlice } from '@reduxjs/toolkit'

export interface IBurger {
  isBurgerOpen: boolean
}

const initialState: IBurger = {
  isBurgerOpen: false,
}

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    toggleBurger: state => {
      state.isBurgerOpen = !state.isBurgerOpen
    },
  },
})

export const { toggleBurger } = burgerSlice.actions
export default burgerSlice.reducer
