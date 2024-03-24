import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  isAuthUser: false,
}

const isAuthUserSlice = createSlice({
  name: 'isAuthUser',
  initialState,
  reducers: {
    setIsAuthUser: (state, action) => {
      state.isAuthUser = action.payload
    },
  },
})

export const { setIsAuthUser } = isAuthUserSlice.actions
export default isAuthUserSlice.reducer
