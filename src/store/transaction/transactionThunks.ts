import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {
  FetchApiCategory,
  ApiTransaction,
  ApiTransactions,
  ApiCategory,
  Transaction,
  ApiCategoryMutation
} from '../../types';
import {RootState} from '../../app/store';

export const createTransaction = createAsyncThunk<void, ApiTransaction, {state: RootState}>(
  'transaction/createTransaction',
  async (transaction) => {
    await axiosApi.post('/transactions.json', transaction);
  }
);

export const fetchCategoryPreview = createAsyncThunk<ApiCategoryMutation[], string, {state: RootState}>(
  'transaction/fetchCategoryPreview',
  async (inputType) => {
    const response = await axiosApi.get<FetchApiCategory | null>('/categories.json');
    const categories = response.data;

    if (!categories) {
      return [];
    }

    const fetchedCategories: ApiCategory[] = Object.keys(categories).map((id) => {
      const category = categories[id];
      return {
        id,
        ...category
      };
    });

    const newCategories = fetchedCategories.filter((category) => category.type === inputType);

    return newCategories.map((category) => {
      return {
        id: category.id,
        name: category.name
      };
    });
  }
);
export const fetchAllTransactions = createAsyncThunk<Transaction[], ApiCategory[], {state: RootState}>(
  'transaction/fetchAllTransactions',
  async (categories) => {
    const response = await axiosApi.get<ApiTransactions | null>('/transactions.json');
    const transactions = response.data;

    if (!transactions) {
      return [];
    }

    const filteredTransactions: Transaction[] = Object.keys(transactions).flatMap((id) => {
      const transaction = transactions[id];

      return categories
        .filter((category) => category.id === transaction.category)
        .map((category) => ({
          id,
          amount: transaction.amount,
          createdAt: transaction.createdAt,
          category: category.name,
          type: category.type,
        }));
    });
    return filteredTransactions;
  }
);

export const fetchOneTransaction = createAsyncThunk<Transaction, string, {state: RootState}>(
  'transaction/fetchOneTransaction',
  async (id) => {
    const response = await axiosApi.get<ApiTransaction | null>('/transactions/' + id + '.json');
    const transaction = response.data;

    if (transaction === null) {
      throw new Error('Item not found');
    }
    const oneTransaction: Transaction = {
      id,
      ...transaction,
      type: transaction.amount >= 0 ? 'income' : 'expense',
    };

    return oneTransaction;
  }
);

interface UpdateContactParams {
  id: string;
  transaction: ApiTransaction;
}

export const updateTransaction = createAsyncThunk<void, UpdateContactParams, {state: RootState}>(
  'transaction/updateTransaction',
  async ({id, transaction}) => {
    await axiosApi.put('/transactions/' + id + '.json', transaction);
  }
);

export const deleteTransaction = createAsyncThunk<void, string, {state: RootState}>(
  'transaction/deleteTransaction',
  async (id) => {
    await axiosApi.delete('/transactions/' + id + '.json');
  });