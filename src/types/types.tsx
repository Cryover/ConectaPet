import { StackNavigationProp } from '@react-navigation/stack';

export interface RootState {
  data: DataState;
}

export interface DateType {
  date: Date | null;
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
  criado_em: Date,
}

export interface UserInfoResponse {
  userToken: string,
  usuario: UserInfo
}

export type ColorProps = {
  color: string;
  focused: boolean;
};

export type PetInfo = {
  id: string;
  nome: string;
  tipo_pet: string;
  idade: number;
  imagem?: string; // Testar o type do dado
  dataNascimento: Date;
  raca: string;
  infoMedica?: InfoMedica;
};

export type InfoMedica = {
  alergias: string;
  tipoSanguineo: string;
};

export type Item = {
  id: string;
  nome: string;
  valor: number;
  dataDespesa: string;
};

export type SelectOptionEntry = {
  label: string,
  value: string,
}

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Registro: undefined;
  RecuperacaoConta: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type RegistroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Registro'>;
export type RecuperacaoContaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RecuperacaoConta'>;
