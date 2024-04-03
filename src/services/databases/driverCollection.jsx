import { baseApiAppwrite } from '../baseSplitApi'

const IDEAS_DATABASE_ID = import.meta.env.VITE_IDEAS_DATABASE_ID
const IDEAS_COLLECTION_ID = import.meta.env.VITE_IDEAS_COLLECTION_DRIVER_ID

const driverCollection = baseApiAppwrite.injectEndpoints({
  endpoints: (build) => ({
    getDriverCollection: build.query({
      query: () =>
        `databases/${IDEAS_DATABASE_ID}/collections/${IDEAS_COLLECTION_ID}/documents?queries[]=orderDesc("from")`,
    }),
    createDriverCollection: build.mutation({
      query(id) {
        return {
          url: `databases/${IDEAS_DATABASE_ID}/collections/${IDEAS_COLLECTION_ID}/documents`,
          method: 'POST',
          body: {
            data: {
              username: 'aqwuqeq',
              to: 'toktogul',
              from: 'jalalbal',
              car: 'qw21eaas',
              quantity: 2,
              datetime: '12/01/2023',
              contacts: '010221e3edsadasd',
            },
            documentId: id,
          },
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetDriverCollectionQuery,
  useCreateDriverCollectionMutation,
} = driverCollection
