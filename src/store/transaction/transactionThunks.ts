import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {ApiCategories, ApiTransaction, ApiTransactions, Category, CategoryMutation, Transaction} from '../../types';
import {RootState} from '../../app/store';

export const createTransaction = createAsyncThunk<void, ApiTransaction, {state: RootState}>(
  'transaction/create',
  async (transaction) => {
    await axiosApi.post('/transactions.json', transaction);
  }
);

export const fetchCategoryPreview = createAsyncThunk<CategoryMutation[], string, {state: RootState}>(
  'transaction/fetchCategoryId',
  async (inputType) => {
    const response = await axiosApi.get<ApiCategories | null>('/categories.json');
    const categories = response.data;
    
    if (!categories) {
      return [];
    }
    
    const fetchedCategories: Category[] = Object.keys(categories).map((id) => {
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
export const fetchAllTransactions = createAsyncThunk<Transaction[], Category[], {state: RootState}>(
  'transaction/fetchAll',
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
  'transaction/fetchOne',
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
  'transaction/update',
  async ({id, transaction}) => {
    await axiosApi.put('/transactions/' + id + '.json', transaction);
  }
);

export const deleteTransaction = createAsyncThunk<void, string, {state: RootState}>(
  'transaction/delete',
  async (id) => {
    await axiosApi.delete('/transactions/' + id + '.json');
  });