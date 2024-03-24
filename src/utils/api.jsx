import { createAsyncThunk } from '@reduxjs/toolkit'
import { ID } from 'appwrite'

import { account } from '../libs/appwrite'
import { storage } from '../libs/appwrite'

const id_user = ID.unique()
const bucket_id = import.meta.env.VITE_BUCKET_ID

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
      return rejectWithValue(error.message)
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
      return rejectWithValue(error.message)
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
      return rejectWithValue(error.message)
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
      return rejectWithValue(error.message)
    }
  },
)

export const resetPasswordRequest = createAsyncThunk(
  'resetPassword/resetPasswordRequest',
  async (data, { rejectWithValue }) => {
    try {
      const response = await account.account.createRecovery(
        data.email,
        data.hostname,
      )
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const updatePasswordRequest = createAsyncThunk(
  'updatePassword/updatePasswordRequest',
  async (data, { rejectWithValue }) => {
    try {
      const response = await account.updateRecovery(
        data.userId,
        data.secret,
        data.newPassword,
        data.confirmPassword,
      )
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const createFileRequest = createAsyncThunk(
  'createFile/createFileRequest',
  async ({ image, userId }, { rejectWithValue }) => {
    try {
      const response = await storage.createFile(bucket_id, userId, image)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
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
      return rejectWithValue(error.message)
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
      return rejectWithValue(error.message)
    }
  },
)
