import {configureStore} from '@reduxjs/toolkit';
import {categoryReducer} from '../store/category/categorySlice';
import {transactionReducer} from '../store/transaction/transactionSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    transaction: transactionReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;