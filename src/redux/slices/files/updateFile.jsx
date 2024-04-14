import { createSlice } from '@reduxjs/toolkit'

import { updateFileRequest } from '../../../utils/api'

const initialState = {
  updateFileData: '',
  loading: false,
  error: false,
}

export const updateFileSlice = createSlice({
  name: 'updateFile',
  initialState,
  reducers: {
    clearUpdateFileData: (state) => {
      state.updateFileData = ''
      state.loading = false
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateFileRequest.pending, (state) => {
        state.loading = true
        state.error = false
        state.updateFileData = ''
      })
      .addCase(updateFileRequest.fulfilled, (state, action) => {
        state.updateFileData = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(updateFileRequest.rejected, (state, action) => {
        state.updateFileData = ''
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearUpdateFileData } = updateFileSlice.actions
export default updateFileSlice.reducer
