import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
