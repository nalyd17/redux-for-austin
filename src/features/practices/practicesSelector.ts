import { RootState } from "../../app/rootReducer";

export const selectAllPractices = (state: RootState) =>
  state.practices.practices;
export const selectPracticesStatus = (state: RootState) =>
  state.practices.status;
export const selectPracticesError = (state: RootState) => state.practices.error;
