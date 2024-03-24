import { createSlice } from '@reduxjs/toolkit'

import { getFileRequest } from '../../../utils/api'

const initialState = {
  getFileData: '',
  loading: false,
  error: false,
}

export const getFileSlice = createSlice({
  name: 'getFile',
  initialState,
  reducers: {
    clearGetFileData: (state) => {
      state.getFileData = ''
      state.loading = false
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFileRequest.pending, (state) => {
        state.loading = true
        state.error = false
        state.getFileData = ''
      })
      .addCase(getFileRequest.fulfilled, (state, action) => {
        state.getFileData = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(getFileRequest.rejected, (state, action) => {
        state.getFileData = ''
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearGetFileData } = getFileSlice.actions
export default getFileSlice.reducer
