import { createSlice } from '@reduxjs/toolkit'

import { getUserRequest } from '../../../utils/api'

const initialState = {
  userData: '',
  loading: false,
  error: false,
}

export const getUserSlice = createSlice({
  name: 'getUser',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.userData = ''
      state.loading = false
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserRequest.pending, (state) => {
        state.loading = true
        state.error = false
        state.userData = ''
      })
      .addCase(getUserRequest.fulfilled, (state, action) => {
        state.userData = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(getUserRequest.rejected, (state, action) => {
        state.userData = ''
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearUserData } = getUserSlice.actions
export default getUserSlice.reducer
