import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CategoryMutation, Transaction} from '../../types';
import {
  createTransaction,
  deleteTransaction,
  fetchAllTransactions,
  fetchCategoryPreview,
  fetchOneTransaction, updateTransaction
} from './transactionThunks';

export interface TransactionState {
  transactions: Transaction[];
  transaction: Transaction | null;
  categoryPreview: CategoryMutation[];
  getDataLoading: boolean;
  getDataModalLoading: boolean;
  buttonSaveAndEditLoading: boolean;
  buttonDeleteTransactionLoading: boolean | string;
  transactionModal: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  transaction: null,
  categoryPreview: [],
  getDataLoading: false,
  getDataModalLoading: false,
  buttonSaveAndEditLoading: false,
  buttonDeleteTransactionLoading: false,
  transactionModal: false,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    showTransactionModal: (state: TransactionState, action: PayloadAction<boolean>) => {
      state.transactionModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTransaction.pending, (state: TransactionState) => {
      state.buttonSaveAndEditLoading = true;
    });
    builder.addCase(createTransaction.fulfilled, (state: TransactionState) => {
      state.buttonSaveAndEditLoading = false;
    });
    builder.addCase(createTransaction.rejected, (state: TransactionState) => {
      state.buttonSaveAndEditLoading = false;
    });

    builder.addCase(fetchCategoryPreview.pending, (state: TransactionState) => {
      state.getDataLoading = true;
    });
    builder.addCase(fetchCategoryPreview.fulfilled, (state: TransactionState, {payload: categories}) => {
      state.getDataLoading = false;
      state.categoryPreview = categories;
    });
    builder.addCase(fetchCategoryPreview.rejected, (state: TransactionState) => {
      state.getDataLoading = false;
    });

    builder.addCase(fetchAllTransactions.pending, (state: TransactionState) => {
      state.getDataLoading = true;
    });
    builder.addCase(fetchAllTransactions.fulfilled, (state: TransactionState, {payload: transactions}) => {
      state.getDataLoading = false;
      state.transactions = transactions;
    });
    builder.addCase(fetchAllTransactions.rejected, (state: TransactionState) => {
      state.getDataLoading = false;
    });

    builder.addCase(fetchOneTransaction.pending, (state: TransactionState) => {
      state.getDataModalLoading = true;
    });
    builder.addCase(fetchOneTransaction.fulfilled, (state: TransactionState, {payload: transaction}) => {
      state.getDataModalLoading = false;
      state.transaction = transaction;
    });
    builder.addCase(fetchOneTransaction.rejected, (state: TransactionState) => {
      state.getDataModalLoading = false;
    });

    builder.addCase(deleteTransaction.pending, (state: TransactionState, {meta: {arg: dishId}}) => {
      state.buttonDeleteTransactionLoading = dishId;
    });
    builder.addCase(deleteTransaction.fulfilled, (state: TransactionState) => {
      state.buttonDeleteTransactionLoading = false;
    });
    builder.addCase(deleteTransaction.rejected, (state: TransactionState) => {
      state.buttonDeleteTransactionLoading = false;
    });

    builder.addCase(updateTransaction.pending, (state: TransactionState) => {
      state.buttonSaveAndEditLoading = true;
    });
    builder.addCase(updateTransaction.fulfilled, (state: TransactionState) => {
      state.buttonSaveAndEditLoading = false;
    });
    builder.addCase(updateTransaction.rejected, (state: TransactionState) => {
      state.buttonSaveAndEditLoading = false;
    });
  },
  selectors: {
    selectTransactions: (state: TransactionState) => state.transactions,
    selectTransaction: (state: TransactionState) => state.transaction,
    selectGetDataLoading: (state: TransactionState) => state.getDataLoading,
    selectGetDataModalLoading: (state: TransactionState) => state.getDataModalLoading,
    selectButtonSaveAndEditLoading: (state: TransactionState) => state.buttonSaveAndEditLoading,
    selectButtonDeleteTransactionsLoading: (state: TransactionState) => state.buttonDeleteTransactionLoading,
    selectCategoryModal: (state: TransactionState) => state.transactionModal,
  }
});

export const transactionReducer = transactionSlice.reducer;
export const {
  selectTransactions,
  selectTransaction,
  selectGetDataLoading,
  selectGetDataModalLoading,
  selectButtonSaveAndEditLoading,
  selectButtonDeleteTransactionsLoading,
  selectCategoryModal,
} = transactionSlice.selectors;

export const {
  showTransactionModal,
} = transactionSlice.actions;