import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  formType: null, // 'signIn' or 'signUp'
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.formType = action.payload
    },
    closeModal: state => {
      state.isOpen = false
      state.formType = null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
