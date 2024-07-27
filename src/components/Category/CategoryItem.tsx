import React from 'react';
import {Category} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {showEditCategoryModal} from '../../store/category/categorySlice';
import {fetchOneCategory} from '../../store/category/categoryThunks';
import {useAppDispatch} from '../../app/hooks';

interface Props {
  category: Category;
  deleteLoading: boolean | string;
  onDelete: React.MouseEventHandler;
}
const CategoryItem: React.FC<Props> = ({category, deleteLoading, onDelete}) => {
  const dispatch = useAppDispatch();
  
  const typeStyle = ['badge'];
  
  if (category.type === 'expense') {
    typeStyle.push('text-bg-warning');
  } else {
    typeStyle.push('text-bg-success');
  }
  
  const fetchCategory = async (id: string) => {
    dispatch(showEditCategoryModal(true));
    await dispatch(fetchOneCategory(id));
  };
  
  return (
    <div className="card mb-3">
      <div className="d-flex align-items-center px-3 py-4">
        <div className="col-8">
          <h5 className="card-title">{category.name}</h5>
        </div>
        <div className="col-2">
          <span className={typeStyle.join(' ')}>{category.type}</span>
        </div>
        <div className="col-2 d-flex gap-3 align-items-center justify-content-end">
          <button
            className="btn btn-outline-secondary d-flex align-items-center justify-content-center p-3"
            onClick={() => fetchCategory(category.id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
          </button>
          <button
            className="btn btn-danger d-flex align-items-center justify-content-center p-3"
            disabled={deleteLoading ? deleteLoading === category.id : false}
            onClick={onDelete}
          >
            {deleteLoading && deleteLoading === category.id && <ButtonSpinner/>}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;