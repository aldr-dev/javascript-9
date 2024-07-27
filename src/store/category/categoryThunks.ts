import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {ApiCategory, MutationApiCategory} from '../../types';
import {RootState} from '../../app/store';

export const createCategory = createAsyncThunk<void, ApiCategory, {state: RootState}>(
  'category/createCategory',
  async (category: ApiCategory) => {
    await axiosApi.post('/categories.json' , category);
  }
);

export const fetchOneCategory = createAsyncThunk<MutationApiCategory | undefined, string, {state: RootState}>(
  'category/fetchOneCategory',
  async (id: string) => {
    const response = await axiosApi.get<MutationApiCategory | undefined>(`/categories/${id}.json`);

    if (response.data !== undefined) {
      return response.data;
    }
  }
);

export const fetchDataCategories = createAsyncThunk<MutationApiCategory[] | null, void, {state: RootState}>(
  'category/fetchDataCategories',
  async () => {
    const response = await axiosApi.get<{ [key: string]: MutationApiCategory}>('/categories.json');

    if (response.data !== null) {
      return Object.keys(response.data).map(key => ({
        ...response.data[key],
        id: key,
      }));
    } else {
      return [];
    }
  }
);

export const updateCategory = createAsyncThunk<void, {id: string, categoryData: ApiCategory}, {state: RootState}>(
  'category/updateCategory', async ({id, categoryData}) => {
    await axiosApi.put<ApiCategory>(`/categories/${id}.json`, categoryData);
  }
);

export const deleteCategory = createAsyncThunk<void, string, {state: RootState}>(
  'category/deleteCategory',
  async (id: string) => {
    await axiosApi.delete(`/categories/${id}.json`);
  }
);