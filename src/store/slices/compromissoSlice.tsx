import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Compromisso {
  id: number;
  id_dono: string,
  id_pet: string;
  email: string;
  nome: string;
  descricao: string;
  tipo_compromisso: string;
  criado_em: Date;
}

export const compromissoApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getCompromissos: builder.query<Compromisso[], void>({
      query: () => 'compromisso',
    }),
    createCompromisso: builder.mutation<Compromisso, Partial<Compromisso>>({
      query: (newCompromisso) => ({
        url: 'compromisso',
        method: 'POST',
        body: newCompromisso,
      }),
    }),
    updateCompromisso: builder.mutation<Compromisso, Partial<Compromisso>>({
      query: (compromisso) => ({
        url: `compromisso/${compromisso.id}`,
        method: 'PUT',
        body: compromisso,
      }),
    }),
    deleteCompromisso: builder.mutation<void, number>({
      query: (compromissoId) => ({
        url: `compromisso/${compromissoId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetCompromissosQuery, useCreateCompromissoMutation, useUpdateCompromissoMutation, useDeleteCompromissoMutation } = compromissoApi;
