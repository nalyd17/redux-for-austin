import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
// import anotherFeatureReducer from '../features/anotherFeature/anotherFeatureSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  // anotherFeature: anotherFeatureReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
