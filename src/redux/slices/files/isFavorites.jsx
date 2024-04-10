import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFavorites: false,
}

const isFavoritesSlice = createSlice({
  name: 'isFavorites',
  initialState,
  reducers: {
    setIsFavorites: (state, action) => {
      state.isFavorites = action.payload
    },
  },
})

export const { setIsFavorites } = isFavoritesSlice.actions
export default isFavoritesSlice.reducer
