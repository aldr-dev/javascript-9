import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCategories, ApiCategory, Category} from '../../types';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';

export const createCategory = createAsyncThunk<void, ApiCategory, {state: RootState}>(
  'category/create',
  async (category: ApiCategory) => {
    await axiosApi.post('/categories.json', category);
  }
);

export const fetchAllCategories = createAsyncThunk<Category[], undefined, {state: RootState}>(
  'category/fetchAll',
  async () => {
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
    
    return fetchedCategories;
  }
);

export const fetchOneCategory = createAsyncThunk<Category, string, {state: RootState}>(
  'categories/fetchOne',
  async (id) => {
    const response = await axiosApi.get<ApiCategory | null>('/categories/' + id + '.json');
    const category = response.data;
    
    if (category === null) {
      throw new Error('Item not found');
    }
    const oneCategory: Category = {
      id,
      ...category
    };
    return oneCategory;
  }
);

interface UpdateContactParams {
  id: string;
  category: ApiCategory;
}

export const updateCategory = createAsyncThunk<void, UpdateContactParams, {state: RootState}>(
  'category/update',
  async ({id, category}) => {
    await axiosApi.put('/categories/' + id + '.json', category);
  }
);

export const deleteCategory = createAsyncThunk<void, string, {state: RootState}>(
  'category/delete',
  async (id: string) => {
    await axiosApi.delete('/categories/' + id + '.json');
  }
);