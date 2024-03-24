import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { baseSplitApi } from '../services/baseSplitApi'
import getUser from './slices/account/getUser'
import isAuthUser from './slices/account/isAuthUser'
import login from './slices/account/login'
import logout from './slices/account/logout'
import register from './slices/account/register'
import resetPassword from './slices/account/resetPassword'
import updatePassword from './slices/account/updatePassword'
import createFile from './slices/files/createFile'
import listFiles from './slices/files/listFiles'
import getFile from './slices/files/getFile'

export const store = configureStore({
  reducer: {
    [baseSplitApi.reducerPath]: baseSplitApi.reducer,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
    listFiles,
    createFile,
    getUser,
    isAuthUser,
    getFile,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseSplitApi.middleware),
})

setupListeners(store.dispatch)
