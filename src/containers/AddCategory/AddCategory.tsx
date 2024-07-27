import React from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCreateLoading, showAddCategoryModal} from '../../store/category/categorySlice';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import {ApiCategory} from '../../types';
import {createCategory, fetchAllCategories} from '../../store/category/categoryThunks';

const AddCategory: React.FC = () => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateLoading);
  
  const onSubmit = async (category: ApiCategory) => {
    await dispatch(createCategory(category));
    await dispatch(fetchAllCategories());
    dispatch(showAddCategoryModal(false));
  };
  
  return (
    <div>
      <CategoryForm
        onSubmitCategory={onSubmit}
        isLoading={createLoading}
      />
    </div>
  );
};

export default AddCategory;