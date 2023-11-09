export interface RootState {
  data: DataState;
}

export interface DataState {
  data: string | null;
  loading: boolean;
  error: string | null;
}

export interface UserInfo {
  username: string,
  email: string,
  nome: string,
  senha: string,
  id: string,
  tipo_usuario: string,
  criado_em: Date
}

export interface UserInfoResponse {
  userToken: string,
  usuario: UserInfo
}

export type ColorProps = {
  color: string;
  focused: boolean;
};

export type Pet = {
  id: string;
  nome: string;
  tipoAnimal: string;
  idade: number;
  imagem: string; // Testar o type do dado
  dataNascimento: Date;
  raca: string;
  infoMedica: InfoMedica;
};

export type InfoMedica = {
  alergias: string;
  tipoSanguineo: string;
};
