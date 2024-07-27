import React from 'react';
import CategoryItem from './CategoryItem';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  selectCategories,
  selectCategory,
  selectDeleteLoading,
  selectFetchLoading
} from '../../store/category/categorySlice';
import Spinner from '../Spinner/Spinner';
import {deleteCategory, fetchAllCategories} from '../../store/category/categoryThunks';
import EditCategory from '../../containers/EditCategory/EditCategory';
import ModalEditCategory from '../Modal/ModalEditCategory';

const CategoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const oneCategory = useAppSelector(selectCategory);
  const loading = useAppSelector(selectFetchLoading);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  
  const onDeleteCategory = async (id: string) => {
    if (window.confirm('Do you want to delete category')) {
      await dispatch(deleteCategory(id));
    }
    await dispatch(fetchAllCategories());
  };
  
  return (
    <div>
      {loading && <Spinner/>}
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          deleteLoading={deleteLoading}
          onDelete={() => onDeleteCategory(category.id)}
        />
      ))}
      <ModalEditCategory>
        {oneCategory &&
          <EditCategory
            category={oneCategory}
          />
        }
      </ModalEditCategory>
    </div>
  );
};

export default CategoryList;