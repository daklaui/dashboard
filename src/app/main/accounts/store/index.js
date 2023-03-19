import { combineReducers } from "@reduxjs/toolkit";
import accounts from "./accountSlice";
const reducer = combineReducers({
  accounts
});

export default reducer;
