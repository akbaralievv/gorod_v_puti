import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { baseApiAppwrite, baseApiSuggest } from '../services/baseSplitApi'
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
import getImage from './slices/files/getImage'
import saveStateFile from './slices/files/saveStateFile'
import isFavorites from './slices/files/isFavorites'
import deleteFile from './slices/files/deleteFile'

export const store = configureStore({
  reducer: {
    [baseApiAppwrite.reducerPath]: baseApiAppwrite.reducer,
    [baseApiSuggest.reducerPath]: baseApiSuggest.reducer,
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
    getImage,
    saveStateFile,
    isFavorites,
    deleteFile,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApiAppwrite.middleware,
      baseApiSuggest.middleware,
    ),
})

setupListeners(store.dispatch)
