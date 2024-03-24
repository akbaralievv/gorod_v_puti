import { createSlice } from '@reduxjs/toolkit'

import { createFileRequest } from '../../../utils/api'

const initialState = {
  createFileData: '',
  loading: false,
  error: false,
}

export const createFileSlice = createSlice({
  name: 'createFile',
  initialState,
  reducers: {
    clearCreateFileData: (state) => {
      state.createFileData = ''
      state.loading = false
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFileRequest.pending, (state) => {
        state.loading = true
        state.error = false
        state.createFileData = ''
      })
      .addCase(createFileRequest.fulfilled, (state, action) => {
        state.createFileData = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(createFileRequest.rejected, (state, action) => {
        state.createFileData = ''
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearCreateFileData } = createFileSlice.actions
export default createFileSlice.reducer
