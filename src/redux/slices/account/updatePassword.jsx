import { createSlice } from '@reduxjs/toolkit'

import { updatePasswordRequest } from '../../../utils/api'

const initialState = {
  updatePasswordData: '',
  loading: false,
  error: false,
}

export const updatePasswordSlice = createSlice({
  name: 'updatePassword',
  initialState,
  reducers: {
    clearUpdatePasswordData: (state) => {
      state.updatePasswordData = ''
      state.loading = false
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePasswordRequest.pending, (state) => {
        state.loading = true
        state.error = false
        state.updatePasswordData = ''
      })
      .addCase(updatePasswordRequest.fulfilled, (state, action) => {
        state.updatePasswordData = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(updatePasswordRequest.rejected, (state, action) => {
        state.updatePasswordData = ''
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearUpdatePasswordData } = updatePasswordSlice.actions
export default updatePasswordSlice.reducer
