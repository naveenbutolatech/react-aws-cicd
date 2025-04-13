import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook
} from 'react-redux';


import authReducer from './authSlice';
import hospitalReducer from './hospitalSlice';
import hospitalRegistrationReducer from './hospitalRegistrationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hospital: hospitalReducer,
    hospitalRegistration: hospitalRegistrationReducer // Add this line
  },
  devTools: true
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

