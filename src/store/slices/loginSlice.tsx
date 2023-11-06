import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Usuario {
  id: string;
  username: string,
  email: string;
  nome: string;
  senha: string;
  tipo_usuario: string;
  criado_em: Date;
}

export const loginApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getUsuarios: builder.query<Usuario[], void>({
      query: () => 'login',
    }),
    createUsuario: builder.mutation<Usuario, Partial<Usuario>>({
      query: (newUsuario) => ({
        url: 'login',
        method: 'POST',
        body: newUsuario,
      }),
    }),
    updateUsuario: builder.mutation<Usuario, Partial<Usuario>>({
      query: (usuario) => ({
        url: `login/${usuario.id}`,
        method: 'PUT',
        body: usuario,
      }),
    }),
    deleteUsuario: builder.mutation<void, number>({
      query: (usuarioId) => ({
        url: `login/${usuarioId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetUsuariosQuery, useCreateUsuarioMutation, useUpdateUsuarioMutation, useDeleteUsuarioMutation } = loginApi;
