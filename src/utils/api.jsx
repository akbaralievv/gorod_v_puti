import { createAsyncThunk } from '@reduxjs/toolkit'
import { ID } from 'appwrite'
import { account, storage } from '../libs/appwrite'

const id_user = ID.unique()
const bucket_id = import.meta.env.VITE_BUCKET_ID
const baseUrl = `${window.location.protocol}//${window.location.host}`
const resetPasswordUrl = `${baseUrl}/update-password`

export const loginRequest = createAsyncThunk(
  'login/loginRequest',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await account.createEmailSession(
        data.email,
        data.password,
      )
      dispatch(getUserRequest())
      return response
    } catch (error) {
      return rejectWithValue(error.code)
    }
  },
)

export const logoutRequest = createAsyncThunk(
  'logout/logoutRequest',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await account.deleteSession('current')
      dispatch(getUserRequest())
      return response
    } catch (error) {
      return rejectWithValue(error.code)
    }
  },
)

export const registerRequest = createAsyncThunk(
  'register/registerRequest',
  async (data, { rejectWithValue }) => {
    try {
      const response = await account.create(
        id_user,
        data.email,
        data.password,
        data.username,
      )
      return response
    } catch (error) {
      return rejectWithValue(error.code)
    }
  },
)

export const getUserRequest = createAsyncThunk(
  'getUser/getUserRequest',
  async (data, { rejectWithValue }) => {
    try {
      const response = await account.get()
      return response
    } catch (error) {
      return rejectWithValue(error.code)
    }
  },
)

export const resetPasswordRequest = createAsyncThunk(
  'resetPassword/resetPasswordRequest',
  async (data, { rejectWithValue }) => {
    try {
      const response = await account.createRecovery(
        data.email,
        resetPasswordUrl,
      )
      return response
    } catch (error) {
      return rejectWithValue(error.code)
    }
  },
)

export const updatePasswordRequest = createAsyncThunk(
  'updatePassword/updatePasswordRequest',
  async (
    { userId, secret, newPassword, confirmPassword },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await account.updateRecovery(
        userId,
        secret,
        newPassword,
        confirmPassword,
      )
      return response
    } catch (error) {
      return rejectWithValue(error.code)
    }
  },
)

export const createFileRequest = createAsyncThunk(
  'createFile/createFileRequest',
  async ({ image, userId }, { rejectWithValue }) => {
    try {
      const response = await storage.createFile(bucket_id, userId, image)
      return response.$id
    } catch (error) {
      return rejectWithValue(error.code)
    }
  },
)

export const listFilesRequest = createAsyncThunk(
  'listFiles/listFilesRequest',
  async (bucket_id, { rejectWithValue }) => {
    try {
      const response = await storage.listFiles(bucket_id)
      return response
    } catch (error) {
      return rejectWithValue(error.code)
    }
  },
)

export const getFileRequest = createAsyncThunk(
  'getFile/getFileRequest',
  async (file_id, { rejectWithValue }) => {
    try {
      const response = await storage.getFileView(bucket_id, file_id)
      return response.href
    } catch (error) {
      return rejectWithValue(error.code)
    }
  },
)

export const getImageRequest = createAsyncThunk(
  'getImage/getImageRequest',
  async (file_id, { rejectWithValue }) => {
    try {
      const response = await storage.getFileView(bucket_id, file_id)
      return response.href
    } catch (error) {
      return rejectWithValue(error.code)
    }
  },
)

export const deleteFileRequest = createAsyncThunk(
  'deleteFile/deleteFileRequest',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await storage.deleteFile(bucket_id, id)
      return response
    } catch (error) {
      return rejectWithValue(error.code)
    }
  },
)
