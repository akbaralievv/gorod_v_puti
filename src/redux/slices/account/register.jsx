import { createSlice } from '@reduxjs/toolkit'

import { registerRequest } from '../../../utils/api'

const initialState = {
  registerData: '',
  loading: false,
  error: false,
}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    clearRegisterData: (state) => {
      state.registerData = ''
      state.loading = false
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerRequest.pending, (state) => {
        state.loading = true
        state.error = false
        state.registerData = ''
      })
      .addCase(registerRequest.fulfilled, (state, action) => {
        state.registerData = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(registerRequest.rejected, (state, action) => {
        state.registerData = ''
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearRegisterData } = registerSlice.actions
export default registerSlice.reducer
