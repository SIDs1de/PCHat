import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { toggleBurger } from '../store/burgerSlice'
import { setAuthorized, setId, setName, setUser, setLogin } from '../store/userSlice'
import { closeModal, openModal } from '../store/modalSlice'

const rootActions = {
  toggleBurger,
  setAuthorized,
  setId,
  setName,
  setUser,
  setLogin,
  openModal,
  closeModal
}

export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
