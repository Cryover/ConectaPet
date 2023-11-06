import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Consulta {
  id: string;
  id_dono: string,
  id_pet: string;
  nome_veterinario: string;
  descricao: string;
  data_consulta: Date;
}

export const consultaApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getConsultas: builder.query<Consulta[], void>({
      query: () => 'consulta',
    }),
    createConsulta: builder.mutation<Consulta, Partial<Consulta>>({
      query: (newConsulta) => ({
        url: 'consulta',
        method: 'POST',
        body: newConsulta,
      }),
    }),
    updateConsulta: builder.mutation<Consulta, Partial<Consulta>>({
      query: (consulta) => ({
        url: `consulta/${consulta.id}`,
        method: 'PUT',
        body: consulta,
      }),
    }),
    deleteConsulta: builder.mutation<void, number>({
      query: (consultaId) => ({
        url: `consulta/${consultaId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetConsultasQuery, useCreateConsultaMutation, useUpdateConsultaMutation, useDeleteConsultaMutation } = consultaApi;
