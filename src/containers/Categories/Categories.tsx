import React, {useEffect} from 'react';
import {showAddCategoryModal} from '../../store/category/categorySlice';
import {useAppDispatch} from '../../app/hooks';
import CategoryList from '../../components/Category/CategoryList';
import ModalAddCategory from '../../components/Modal/ModalAddCategory';
import AddCategory from '../AddCategory/AddCategory';
import {fetchAllCategories} from '../../store/category/categoryThunks';

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-5 pb-5 border-bottom">
        <h3>Categories</h3>
        <button
          className="btn btn-outline-primary"
          onClick={() => dispatch(showAddCategoryModal(true))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill me-2" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
          </svg>
          Add
        </button>
      </div>
      <CategoryList/>
      <ModalAddCategory>
        <AddCategory/>
      </ModalAddCategory>
    </>
  );
};

export default Categories;