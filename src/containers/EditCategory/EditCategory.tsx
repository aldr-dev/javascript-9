import React from 'react';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectFetchOneLoading, showEditCategoryModal} from '../../store/category/categorySlice';
import {ApiCategory, Category} from '../../types';
import Spinner from '../../components/Spinner/Spinner';
import {fetchAllCategories, updateCategory} from '../../store/category/categoryThunks';

interface Props {
  category: Category;
}

const EditCategory: React.FC<Props> = ({category}) => {
  const categoryLoading = useAppSelector(selectFetchOneLoading);
  const dispatch = useAppDispatch();
  
  const existingCategory: ApiCategory = {
    type: category.type,
    name: category.name
  };
  
  const onSubmit = async (existingCategory: ApiCategory) => {
    await dispatch(updateCategory({id: category.id, category: existingCategory}));
    dispatch(showEditCategoryModal(false));
    await dispatch(fetchAllCategories());
  };
  
  let formSection = <Spinner/>;
  
  if (!categoryLoading) {
    if (category) {
      formSection = (
        <CategoryForm
          onSubmitCategory={onSubmit}
          existingCategory={existingCategory}
          isLoading={categoryLoading}
          isEdit
        />
      );
    } else {
      formSection = <h4>Not found!</h4>;
    }
  }
  
  
  return (
    <div>
      {formSection}
    </div>
  );
};

export default EditCategory;