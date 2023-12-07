import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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

export interface User {
  username: string;
  email: string;
  nome: string;
  senha: string;
  id: string;
  tipo_usuario: string;
  criado_em: string;
}

export interface UserInfoResponse {
  userToken: string;
  usuario: User;
}

export type ColorProps = {
  color: string;
  focused: boolean;
};

export type Pet = {
  id: string;
  nome: string;
  tipo_pet: string;
  raca: string;
  sexo: string;
  cor: string;
  idade: number;
  imagem?: string; // Testar o type do dado
  data_nascimento: string;
  infoMedica?: InfoMedica;
};

export type Compromisso = {
  id: string;
  titulo: string;
  tipo_compromisso: string;
  petsParticipantes?: Pet[];
  data: Date | string;
  descricao: string;
};

export type InfoMedica = {
  alergias: string;
  tipoSanguineo: string;
};

export type Despesa = {
  id: string;
  nome: string;
  valor: number;
  data: Date | string;
};

export type SelectOptionEntry = {
  label: string;
  value: string;
};

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Registro: undefined;
  RecuperacaoConta: undefined;
  Historico: undefined;
  Agenda: undefined;
  ProfileDono: undefined;
  ProfilePets: undefined;
  Dashboard: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
export type HistoricoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Historico'
>;
export type AgendaScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Agenda'
>;
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type RegistroScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Registro'
>;
export type RecuperacaoContaScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RecuperacaoConta'
>;

export type ProfileDonoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfileDono'
>;

export type ProfilePetsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfilePets'
>;

export type DashboardScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;
