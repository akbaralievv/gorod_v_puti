import { createSlice } from '@reduxjs/toolkit'
import { fetchTransportsAll } from '../../utils/api'

const initialState = {
  fetchTransportsAllData: '',
  loading: false,
  error: false,
}

export const fetchTransportsAllSlice = createSlice({
  name: 'fetchTransportsAll',
  initialState,
  reducers: {
    clearFetchTransportsAll: (state) => {
      state.getImageData = ''
      state.loading = false
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransportsAll.pending, (state) => {
        state.loading = true
        state.error = false
        state.getImageData = ''
      })
      .addCase(fetchTransportsAll.fulfilled, (state, action) => {
        state.getImageData = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(fetchTransportsAll.rejected, (state, action) => {
        state.getImageData = ''
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearFetchTransportsAll } = fetchTransportsAllSlice.actions
export default fetchTransportsAllSlice.reducer
