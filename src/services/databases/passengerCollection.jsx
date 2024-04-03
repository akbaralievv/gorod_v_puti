import { baseApiAppwrite } from '../baseSplitApi'

const IDEAS_DATABASE_ID = import.meta.env.VITE_IDEAS_DATABASE_ID
const IDEAS_COLLECTION_ID = import.meta.env.VITE_IDEAS_COLLECTION_PASSENGER_ID

const passengerCollection = baseApiAppwrite.injectEndpoints({
  endpoints: (build) => ({
    getPassengerCollection: build.query({
      query: () =>
        `databases/${IDEAS_DATABASE_ID}/collections/${IDEAS_COLLECTION_ID}/documents`,
    }),
    createPassengerCollection: build.mutation({
      url: `databases/${IDEAS_DATABASE_ID}/collections/${IDEAS_COLLECTION_ID}/documents`,
      method: 'POST',
      body: {
        name: '',
        to: '',
        from: '',
        car: '',
        numberSeats: 0,
        time: '',
        contacts: '',
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreatePassengerCollectionMutation,
  useGetPassengerCollectionQuery,
} = passengerCollection
