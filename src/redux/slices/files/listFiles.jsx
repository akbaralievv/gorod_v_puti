import { createSlice } from '@reduxjs/toolkit'

import { listFilesRequest } from '../../../utils/api'

const initialState = {
  listFilesData: '',
  loading: false,
  error: false,
}

export const listFilesSlice = createSlice({
  name: 'listFiles',
  initialState,
  reducers: {
    clearListFilesData: (state) => {
      state.listFilesData = ''
      state.loading = false
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listFilesRequest.pending, (state) => {
        state.loading = true
        state.error = false
        state.listFilesData = ''
      })
      .addCase(listFilesRequest.fulfilled, (state, action) => {
        state.listFilesData = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(listFilesRequest.rejected, (state, action) => {
        state.listFilesData = ''
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearListFilesData } = listFilesSlice.actions
export default listFilesSlice.reducer
