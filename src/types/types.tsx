import type {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Dashboard: {userId: string};
  Login: undefined;
  //Feed: { sort: 'latest' | 'top' } | undefined;
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type DashboardScreenRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

export type {
  HomeScreenRouteProp,
  DashboardScreenRouteProp,
  LoginScreenRouteProp,
};
