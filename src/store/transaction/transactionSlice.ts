import {CategoryMutation, Transaction} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  createTransaction,
  deleteTransaction,
  fetchAllTransactions,
  fetchCategoryPreview,
  fetchOneTransaction
} from './transactionThunks';
import {RootState} from '../../app/store';

interface TransactionState {
  transactions: Transaction[];
  transaction: Transaction | null;
  categoryPreview: CategoryMutation[];
  createLoading: boolean;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  updateLoading: boolean;
  fetchPreviewLoading: boolean;
  deleteLoading: false | string;
  showAddModal: boolean;
  showEditModal: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  transaction: null,
  categoryPreview: [],
  createLoading: false,
  fetchLoading: false,
  fetchOneLoading: false,
  updateLoading: false,
  fetchPreviewLoading: false,
  deleteLoading: false,
  showAddModal: false,
  showEditModal: false,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    showAddTransactionModal: (state, action: PayloadAction<boolean>) => {
      state.showAddModal = action.payload;
    },
    showEditTransactionModal: (state, action: PayloadAction<boolean>) => {
      state.showEditModal = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(createTransaction.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createTransaction.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTransaction.rejected, (state) => {
      state.createLoading = false;
    });
    
    builder.addCase(fetchCategoryPreview.pending, (state) => {
      state.fetchPreviewLoading = true;
    });
    builder.addCase(fetchCategoryPreview.fulfilled, (state, {payload: categories}) => {
      state.fetchPreviewLoading = false;
      state.categoryPreview = categories;
    });
    builder.addCase(fetchCategoryPreview.rejected, (state) => {
      state.fetchPreviewLoading = false;
    });
    
    builder.addCase(fetchAllTransactions.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAllTransactions.fulfilled, (state, {payload: transactions}) => {
      state.fetchLoading = false;
      state.transactions = transactions;
    });
    builder.addCase(fetchAllTransactions.rejected, (state) => {
      state.fetchLoading = false;
    });
    
    builder.addCase(fetchOneTransaction.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneTransaction.fulfilled, (state, {payload: transaction}) => {
      state.fetchOneLoading = false;
      state.transaction = transaction;
    });
    builder.addCase(fetchOneTransaction.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    
    builder.addCase(deleteTransaction.pending, (state, {meta}) => {
      state.deleteLoading = meta.arg;
    });
    builder.addCase(deleteTransaction.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteTransaction.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});


export const transactionReducer = transactionSlice.reducer;

export const {
  showAddTransactionModal,
  showEditTransactionModal
} = transactionSlice.actions;


export const selectTransactions = (state: RootState) => state.transaction.transactions;
export const selectTransaction = (state: RootState) => state.transaction.transaction;
export const selectCategoryPreview = (state: RootState) => state.transaction.categoryPreview;
export const selectFetchTransactionsLoading = (state: RootState) => state.transaction.fetchLoading;
export const selectCreateTransactionLoading = (state: RootState) => state.transaction.createLoading;
export const selectShowTransaction = (state: RootState) => state.transaction.showAddModal;
export const selectShowEditTransaction = (state: RootState) => state.transaction.showEditModal;
export const selectDeleteTransaction = (state: RootState) => state.transaction.deleteLoading;