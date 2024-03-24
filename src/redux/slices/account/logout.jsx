import { createSlice } from '@reduxjs/toolkit'

import { logoutRequest } from '../../../utils/api'

const initialState = {
  logoutData: '',
  loading: false,
  error: false,
}

export const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    clearLogoutData: (state) => {
      state.logoutData = ''
      state.loading = false
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutRequest.pending, (state) => {
        state.loading = true
        state.error = false
        state.logoutData = ''
      })
      .addCase(logoutRequest.fulfilled, (state, action) => {
        state.logoutData = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(logoutRequest.rejected, (state, action) => {
        state.logoutData = ''
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearLogoutData } = logoutSlice.actions
export default logoutSlice.reducer
