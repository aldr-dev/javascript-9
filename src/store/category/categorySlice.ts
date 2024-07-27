import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MutationApiCategory} from '../../types';
import {createCategory, deleteCategory, fetchDataCategories, fetchOneCategory, updateCategory} from './categoryThunks';

export interface CategoryState {
  categories: MutationApiCategory[];
  oneCategory: MutationApiCategory | null;
  getDataLoading: boolean;
  getDataModalLoading: boolean;
  buttonSaveAndEditLoading: boolean;
  buttonDeleteCategoryLoading: boolean | string;
  categoryModal: boolean;
}

const initialState: CategoryState = {
  categories: [],
  oneCategory: null,
  getDataLoading: false,
  getDataModalLoading: false,
  buttonSaveAndEditLoading: false,
  buttonDeleteCategoryLoading: false,
  categoryModal: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    showCategoryModal: (state: CategoryState, action: PayloadAction<boolean>) => {
      state.categoryModal = action.payload;
    },
    updateStateCategoriesData: (state: CategoryState, {payload: id}: PayloadAction<string>) => {
      state.categories = state.categories.filter((item) => item.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCategory.pending, (state: CategoryState) => {
      state.buttonSaveAndEditLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state: CategoryState) => {
      state.buttonSaveAndEditLoading = false;
    });
    builder.addCase(createCategory.rejected, (state: CategoryState) => {
      state.buttonSaveAndEditLoading = false;
    });

    builder.addCase(fetchOneCategory.pending, (state: CategoryState) => {
      state.getDataModalLoading = true;
    });
    builder.addCase(fetchOneCategory.fulfilled, (state: CategoryState, {payload: category}: PayloadAction<MutationApiCategory | undefined>) => {
      state.getDataModalLoading = false;
      if (category !== undefined) {
        state.oneCategory = category;
      }
    });
    builder.addCase(fetchOneCategory.rejected, (state: CategoryState) => {
      state.getDataModalLoading = false;
    });

    builder.addCase(fetchDataCategories.pending, (state: CategoryState) => {
      state.getDataLoading = true;
    });
    builder.addCase(fetchDataCategories.fulfilled, (state: CategoryState, {payload: categories}: PayloadAction<MutationApiCategory[] | null>) => {
      state.getDataLoading = false;
      if (categories !== null) {
        state.categories = categories.reverse();
      }
    });
    builder.addCase(fetchDataCategories.rejected, (state: CategoryState) => {
      state.getDataLoading = false;
    });

    builder.addCase(deleteCategory.pending, (state: CategoryState, {meta: {arg: dishId}}) => {
      state.buttonDeleteCategoryLoading = dishId;
    });
    builder.addCase(deleteCategory.fulfilled, (state: CategoryState) => {
      state.buttonDeleteCategoryLoading = false;
    });
    builder.addCase(deleteCategory.rejected, (state: CategoryState) => {
      state.buttonDeleteCategoryLoading = false;
    });

    builder.addCase(updateCategory.pending, (state: CategoryState) => {
      state.buttonSaveAndEditLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state: CategoryState) => {
      state.buttonSaveAndEditLoading = false;
    });
    builder.addCase(updateCategory.rejected, (state: CategoryState) => {
      state.buttonSaveAndEditLoading = false;
    });
  },
  selectors: {
    selectCategoriesData: (state: CategoryState) => state.categories,
    selectOneCategory: (state: CategoryState) => state.oneCategory,
    selectGetDataLoading: (state: CategoryState) => state.getDataLoading,
    selectGetDataModalLoading: (state: CategoryState) => state.getDataModalLoading,
    selectButtonSaveAndEditLoading: (state: CategoryState) => state.buttonSaveAndEditLoading,
    selectButtonDeleteCategoryLoading: (state: CategoryState) => state.buttonDeleteCategoryLoading,
    selectCategoryModal: (state: CategoryState) => state.categoryModal,
  }
});

export const categoryReducer = categorySlice.reducer;
export const {
  selectCategoriesData,
  selectOneCategory,
  selectGetDataLoading,
  selectGetDataModalLoading,
  selectButtonSaveAndEditLoading,
  selectButtonDeleteCategoryLoading,
  selectCategoryModal,
} = categorySlice.selectors;
export const {
  showCategoryModal,
  updateStateCategoriesData,
} = categorySlice.actions;
