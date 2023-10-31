export interface RootState {
  data: DataState; // DataState is the state for the data reducer
  // Add other reducer states as needed
}

export interface DataState {
  data: string | null;
  loading: boolean;
  error: string | null;
}
