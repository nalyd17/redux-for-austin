import { combineReducers } from "@reduxjs/toolkit";
import practicesReducer from "../features/practices/practicesSlice";

const rootReducer = combineReducers({
  practices: practicesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
