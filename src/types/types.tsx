export interface RootState {
  data: DataState;
}

export interface DataState {
  data: string | null;
  loading: boolean;
  error: string | null;
}
