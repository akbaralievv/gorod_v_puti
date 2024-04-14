import { createSlice } from '@reduxjs/toolkit'

import { deleteFileRequest } from '../../../utils/api'

const initialState = {
  deleteFileData: '',
  loading: false,
  error: false,
}

export const deleteFileSlice = createSlice({
  name: 'deleteFile',
  initialState,
  reducers: {
    clearDeleteFileData: (state) => {
      state.deleteFileData = ''
      state.loading = false
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteFileRequest.pending, (state) => {
        state.loading = true
        state.error = false
        state.deleteFileData = ''
      })
      .addCase(deleteFileRequest.fulfilled, (state, action) => {
        state.deleteFileData = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(deleteFileRequest.rejected, (state, action) => {
        state.deleteFileData = ''
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearDeleteFileData } = deleteFileSlice.actions
export default deleteFileSlice.reducer
