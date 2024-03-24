import { createSlice } from '@reduxjs/toolkit'

import { loginRequest } from '../../../utils/api'

const initialState = {
  loginData: '',
  loading: false,
  error: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearLoginData: (state) => {
      state.loginData = ''
      state.loading = false
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, (state) => {
        state.loading = true
        state.error = false
        state.loginData = ''
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.loginData = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.loginData = ''
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearLoginData } = loginSlice.actions
export default loginSlice.reducer
