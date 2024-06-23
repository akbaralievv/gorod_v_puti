import { baseApiAppwrite } from '../baseSplitApi'

const IDEAS_DATABASE_ID = import.meta.env.VITE_IDEAS_DATABASE_ID
const IDEAS_COLLECTION_ID = import.meta.env.VITE_IDEAS_COLLECTION_PASSENGER_ID

const passengerCollection = baseApiAppwrite.injectEndpoints({
  endpoints: (build) => ({
    getPassengerCollection: build.query({
      query: ({ search, user_id }) => {
        return `databases/${IDEAS_DATABASE_ID}/collections/${IDEAS_COLLECTION_ID}/documents?${search.from ? `queries[0]={"method":"search","attribute":"from","values":["${search.from}"]}` : ''}${search.to ? `queries[0]={"method":"search","attribute":"to","values":["${search.to}"]}` : ''}${search.numberOfPassengers ? `queries[0]={"method":"search","attribute":"nemberOfPassengers","values":["${search.nemberOfPassengers}"]}` : ''}${search.formattedDateTime ? `queries[0]={"method":"search","attribute":"formattedDateTime","values":["${search.formattedDateTime?.replace(/ в \d{2}:\d{2}/, '')}"]}` : ''}${user_id ? `queries[0]={"method":"equal","attribute":"user_id","values":["${user_id}"]}` : ''}`
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
    updatePassengersCollection: build.mutation({
      query({ id_unique, dataForm }) {
        return {
          url: `databases/${IDEAS_DATABASE_ID}/collections/${IDEAS_COLLECTION_ID}/documents/${id_unique}`,
          method: 'PATCH',
          body: {
            data: dataForm,
          },
        }
      },
    }),
    deletePassengersCollection: build.mutation({
      query({ id_unique }) {
        return {
          url: `databases/${IDEAS_DATABASE_ID}/collections/${IDEAS_COLLECTION_ID}/documents/${id_unique}`,
          method: 'DELETE',
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreatePassengerCollectionMutation,
  useGetPassengerCollectionQuery,
  useUpdatePassengersCollectionMutation,
  useDeletePassengersCollectionMutation,
} = passengerCollection
