import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const base_url = import.meta.env.VITE_BASE_URL
const base_url_suggest = import.meta.env.VITE_BASE_URL_SUGGEST
const X_Appwrite_Project = import.meta.env.VITE_X_APPWRITE_PROJECT
const X_Appwrite_Key = import.meta.env.VITE_X_APPWRITE_KEY

export const baseApiAppwrite = createApi({
  reducerPath: 'baseSplitApi',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      headers.set('X-Appwrite-Project', X_Appwrite_Project)
      headers.set('X-Appwrite-Key', X_Appwrite_Key)
    },
  }),
  endpoints: () => ({}),
})

export const baseApiSuggest = createApi({
  reducerPath: 'baseApiSuggest',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url_suggest,
  }),
  endpoints: () => ({}),
})
