import { baseApiSuggest } from '../baseSplitApi'

const API_KEY = import.meta.env.VITE_API_SUGGEST_KEY

const suggestCountry = baseApiSuggest.injectEndpoints({
  endpoints: (build) => ({
    getSuggestCountry: build.query({
      query: (value) =>
        `suggest?apikey=${API_KEY}&text=${value}&lang=ru&results=5&attrs=uri`,
    }),
  }),
  overrideExisting: false,
})

export const { useLazyGetSuggestCountryQuery } = suggestCountry
