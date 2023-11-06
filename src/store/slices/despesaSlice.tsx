import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Despesa {
  id: string;
  id_dono: string,
  id_pet: string;
  nome: string;
  valor: number;
  data_despesa: Date;
}

export const despesaApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getDespesas: builder.query<Despesa[], void>({
      query: () => 'despesa',
    }),
    createDespesa: builder.mutation<Despesa, Partial<Despesa>>({
      query: (newDespesa) => ({
        url: 'despesa',
        method: 'POST',
        body: newDespesa,
      }),
    }),
    updateDespesa: builder.mutation<Despesa, Partial<Despesa>>({
      query: (despesa) => ({
        url: `despesa/${despesa.id}`,
        method: 'PUT',
        body: despesa,
      }),
    }),
    deleteDespesa: builder.mutation<void, number>({
      query: (despesaId) => ({
        url: `despesa/${despesaId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetDespesasQuery, useCreateDespesaMutation, useUpdateDespesaMutation, useDeleteDespesaMutation } = despesaApi;
