import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Pet {
  id: string;
  id_dono: string;
  nome: string,
  tipo_pet: string;
  raca: string;
  sexo: string;
  criado_em: Date;
}

export const petApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getPets: builder.query<Pet[], void>({
      query: () => 'pets',
    }),
    getPetsByOwner: builder.mutation<Pet, Partial<Pet>>({
      query: (pet) => ({
        url: `pets/${pet.id}`,
        method: 'GET',
        body: pet,
      }),
    }),
    createPet: builder.mutation<Pet, Partial<Pet>>({
      query: (newPet) => ({
        url: 'pets',
        method: 'POST',
        body: newPet,
      }),
    }),
    updatePet: builder.mutation<Pet, Partial<Pet>>({
      query: (pet) => ({
        url: `pets/${pet.id}`,
        method: 'PUT',
        body: pet,
      }),
    }),
    deletePet: builder.mutation<void, number>({
      query: (petId) => ({
        url: `pets/${petId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetPetsQuery, useCreatePetMutation, useUpdatePetMutation, useDeletePetMutation } = petApi;
