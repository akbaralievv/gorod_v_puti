import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const IDEAS_DATABASE_ID = '65d09222ef711ff641b4';
export const IDEAS_COLLECTION_ID = '65d0923909866e6a3ad9';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
