import { createSlice } from '@reduxjs/toolkit'

import { resetPasswordRequest } from '../../../utils/api'

const initialState = {
  resetPasswordData: '',
  loading: false,
  error: false,
}

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    clearResetPasswordData: (state) => {
      state.resetPasswordData = ''
      state.loading = false
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordRequest.pending, (state) => {
        state.loading = true
        state.error = false
        state.resetPasswordData = ''
      })
      .addCase(resetPasswordRequest.fulfilled, (state, action) => {
        state.resetPasswordData = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(resetPasswordRequest.rejected, (state, action) => {
        state.resetPasswordData = ''
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearResetPasswordData } = resetPasswordSlice.actions
export default resetPasswordSlice.reducer
