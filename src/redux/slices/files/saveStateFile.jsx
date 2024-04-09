import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: '',
  isLoading: false,
  error: false,
}

const saveStateFile = createSlice({
  name: 'saveStateFile',
  initialState,
  reducers: {
    setSaveData: (state, action) => {
      state.data = action.payload
      state.isLoading = false
      state.error = false
    },
    setLoading: (state) => {
      state.data = ''
      state.isLoading = true
      state.error = false
    },
    setError: (state) => {
      state.data = ''
      state.isLoading = false
      state.error = true
    },
    clearSave: (state) => {
      state.data = ''
      state.isLoading = false
      state.error = false
    },
  },
})

export const { setError, setLoading, setSaveData, clearSave } =
  saveStateFile.actions
export default saveStateFile.reducer
