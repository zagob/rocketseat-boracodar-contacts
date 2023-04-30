import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stateContactsSlice, {
  StateReducerContacts,
} from "./reducers/reducerStateContacts";

export interface RootState {
  stateContactsSlice: StateReducerContacts;
}

const rootReducer = combineReducers({
  stateContactsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  localStorage.setItem(
    "contactsPage",
    JSON.stringify(store.getState().stateContactsSlice.contacts)
  );
});
