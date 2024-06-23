import { baseApiAppwrite } from '../baseSplitApi'

const IDEAS_DATABASE_ID = import.meta.env.VITE_IDEAS_DATABASE_ID
const IDEAS_COLLECTION_ID = import.meta.env.VITE_IDEAS_COLLECTION_DRIVER_ID

const driverCollection = baseApiAppwrite.injectEndpoints({
  endpoints: (build) => ({
    getDriverCollection: build.query({
      query: ({ search, user_id }) => {
        const params = new URLSearchParams()

        if (search.from) {
          params.append(
            'queries[]',
            JSON.stringify({
              method: 'search',
              attribute: 'from',
              values: [search.from],
            }),
          )
        }
        if (search.to) {
          params.append(
            'queries[]',
            JSON.stringify({
              method: 'search',
              attribute: 'to',
              values: [search.to],
            }),
          )
        }
        // if (search.numberOfPassengers) {
        //   params.append(
        //     'queries[]',
        //     JSON.stringify({
        //       method: 'search',
        //       attribute: 'numberOfPassengers',
        //       values: [search.numberOfPassengers],
        //     }),
        //   )
        // }
        if (search.formattedDateTime) {
          const formattedDateTime = search.formattedDateTime.replace(
            / в \d{2}:\d{2}/,
            '',
          )
          params.append(
            'queries[]',
            JSON.stringify({
              method: 'search',
              attribute: 'formattedDateTime',
              values: [formattedDateTime],
            }),
          )
        }
        if (user_id) {
          params.append(
            'queries[]',
            JSON.stringify({
              method: 'equal',
              attribute: 'user_id',
              values: [user_id],
            }),
          )
        }

        const queryString = `databases/${IDEAS_DATABASE_ID}/collections/${IDEAS_COLLECTION_ID}/documents?${params.toString()}`
        return queryString
      },
    }),
    createDriverCollection: build.mutation({
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
    updateDriverCollection: build.mutation({
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
    deleteDriverCollection: build.mutation({
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
  useGetDriverCollectionQuery,
  useCreateDriverCollectionMutation,
  useUpdateDriverCollectionMutation,
  useDeleteDriverCollectionMutation,
} = driverCollection
