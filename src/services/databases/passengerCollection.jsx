import { baseApiAppwrite } from '../baseSplitApi'

const IDEAS_DATABASE_ID = import.meta.env.VITE_IDEAS_DATABASE_ID
const IDEAS_COLLECTION_ID = import.meta.env.VITE_IDEAS_COLLECTION_PASSENGER_ID

const passengerCollection = baseApiAppwrite.injectEndpoints({
  endpoints: (build) => ({
    getPassengerCollection: build.query({
      query: (params) => {
        return `databases/${IDEAS_DATABASE_ID}/collections/${IDEAS_COLLECTION_ID}/documents?${params.from ? `queries[]=search("from",${params.from})` : ''}${params.to ? `queries[]=search("to",${params.to})` : ''}${params.numberOfPassengers ? `queries[]=equal("numberOfPassengers",${params.numberOfPassengers})` : ''}${params.formattedDateTime ? `queries[]=search("formattedDateTime",${params.formattedDateTime?.replace(/ в \d{2}:\d{2}/, '')})` : ''}`
      },
    }),
    createPassengerCollection: build.mutation({
      query({ id_unique, dataForm }) {
        return {
          url: `databases/${IDEAS_DATABASE_ID}/collections/${IDEAS_COLLECTION_ID}/documents`,
          method: 'POST',
          body: {
            data: dataForm,
            documentId: id_unique,
          },
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreatePassengerCollectionMutation,
  useGetPassengerCollectionQuery,
} = passengerCollection
