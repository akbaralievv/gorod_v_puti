import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFavorites: false,
  isToggleFavorites: false,
}

const isFavoritesSlice = createSlice({
  name: 'isFavorites',
  initialState,
  reducers: {
    setIsFavorites: (state, action) => {
      state.isFavorites = action.payload
    },
    setIsToggleFavorites: (state, action) => {
      state.isToggleFavorites = action.payload
    },
  },
})

export const { setIsFavorites, setIsToggleFavorites } = isFavoritesSlice.actions
export default isFavoritesSlice.reducer
