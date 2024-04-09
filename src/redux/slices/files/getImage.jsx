import { createSlice } from '@reduxjs/toolkit'

import { getImageRequest } from '../../../utils/api'

const initialState = {
  getImageData: '',
  loading: false,
  error: false,
}

export const getImageSlice = createSlice({
  name: 'getImage',
  initialState,
  reducers: {
    clearGetImageData: (state) => {
      state.getImageData = ''
      state.loading = false
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImageRequest.pending, (state) => {
        state.loading = true
        state.error = false
        state.getImageData = ''
      })
      .addCase(getImageRequest.fulfilled, (state, action) => {
        state.getImageData = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(getImageRequest.rejected, (state, action) => {
        state.getImageData = ''
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearGetImageData } = getImageSlice.actions
export default getImageSlice.reducer
