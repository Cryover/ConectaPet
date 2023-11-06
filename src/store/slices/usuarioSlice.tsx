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

export const usuarioApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getUsuarios: builder.query<Usuario[], void>({
      query: () => 'usuarios',
    }),
    createUsuario: builder.mutation<Usuario, Partial<Usuario>>({
      query: (newUsuario) => ({
        url: 'usuarios',
        method: 'POST',
        body: newUsuario,
      }),
    }),
    updateUsuario: builder.mutation<Usuario, Partial<Usuario>>({
      query: (usuario) => ({
        url: `usuarios/${usuario.id}`,
        method: 'PUT',
        body: usuario,
      }),
    }),
    deleteUsuario: builder.mutation<void, number>({
      query: (usuarioId) => ({
        url: `usuarios/${usuarioId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetUsuariosQuery, useCreateUsuarioMutation, useUpdateUsuarioMutation, useDeleteUsuarioMutation } = usuarioApi;
