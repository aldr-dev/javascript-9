import {Category} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {createCategory, deleteCategory, fetchAllCategories, fetchOneCategory} from './categoryThunks';

interface CategoryState {
  categories: Category[];
  category: Category | null;
  createLoading: boolean;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  updateLoading: boolean;
  deleteLoading: false | string;
  showAddModal: boolean;
  showEditModal: boolean;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  createLoading: false,
  fetchLoading: false,
  fetchOneLoading: false,
  updateLoading: false,
  deleteLoading: false,
  showAddModal: false,
  showEditModal: false
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    showAddCategoryModal: (state, action: PayloadAction<boolean>) => {
      state.showAddModal = action.payload;
    },
    showEditCategoryModal: (state, action: PayloadAction<boolean>) => {
      state.showEditModal = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(createCategory.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createCategory.rejected, (state) => {
      state.createLoading = false;
    });
    
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, {payload: categories}) => {
      state.fetchLoading = false;
      state.categories = categories.reverse();
    });
    builder.addCase(fetchAllCategories.rejected, (state) => {
      state.fetchLoading = false;
    });
    
    builder.addCase(fetchOneCategory.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneCategory.fulfilled, (state,{payload: category}) => {
      state.fetchOneLoading = false;
      state.category = category;
    });
    builder.addCase(fetchOneCategory.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    
    builder.addCase(deleteCategory.pending, (state, {meta}) => {
      state.deleteLoading = meta.arg;
    });
    builder.addCase(deleteCategory.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const categoryReducer = categorySlice.reducer;
export const {
  showAddCategoryModal,
  showEditCategoryModal
} = categorySlice.actions;

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategory = (state: RootState) => state.categories.category;
export const selectAddCategoryModal = (state: RootState) => state.categories.showAddModal;
export const selectEditCategoryModal = (state: RootState) => state.categories.showEditModal;
export const selectCreateLoading = (state: RootState) => state.categories.createLoading;
export const selectFetchLoading = (state: RootState) => state.categories.fetchLoading;
export const selectFetchOneLoading = (state: RootState) => state.categories.fetchOneLoading;
export const selectUpdateLoading = (state: RootState) => state.categories.updateLoading;
export const selectDeleteLoading = (state: RootState) => state.categories.deleteLoading;