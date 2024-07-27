import Modal from '../Modal/Modal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import React, {useEffect, useState} from 'react';
import {ApiCategory} from '../../types';
import {
  selectButtonSaveAndEditLoading,
  selectCategoryModal, selectGetDataModalLoading,
  selectOneCategory, showCategoryModal,
} from '../../store/category/categorySlice';
import {
  createCategory,
  fetchDataCategories,
  fetchOneCategory,
  updateCategory
} from '../../store/category/categoryThunks';
import {toast} from 'react-toastify';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import Spinner from '../Spinner/Spinner';
import {useParams} from 'react-router-dom';

const initialState: ApiCategory = {
  type: '',
  name: ''
};

const CategoryForm = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const oneCategory = useAppSelector(selectOneCategory);
  const categoryModal = useAppSelector(selectCategoryModal);
  const buttonSaveAndEditLoading = useAppSelector(selectButtonSaveAndEditLoading);
  const getDataModalLoading = useAppSelector(selectGetDataModalLoading);
  const [categoryData, setCategoryData] = useState<ApiCategory>(initialState);

  useEffect(() => {
    if (oneCategory && id) {
      setCategoryData((prevState) => {
        return {
          ...prevState,
          type: oneCategory.type,
          name: oneCategory.name,
        };
      });
    } else {
      setCategoryData(initialState);
    }
  }, [oneCategory, id]);

  useEffect(() => {
    const getOneCategory = async () => {
      try {
        if (id) {
          await dispatch(fetchOneCategory(id)).unwrap();
        }
      } catch (error) {
        toast.error('An unexpected error occurred, please try again later.');
        console.error('An unexpected error occurred, please try again later.');
      }
    };
    void getOneCategory();
  }, [dispatch, id]);


  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setCategoryData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      if (categoryData.name.trim().length !== 0) {
        if (id) {
          await dispatch(updateCategory({id, categoryData})).unwrap();
          await dispatch(fetchDataCategories()).unwrap();
          dispatch(showCategoryModal(false));
        } else {
          await dispatch(createCategory(categoryData)).unwrap();
          await dispatch(fetchDataCategories()).unwrap();
          dispatch(showCategoryModal(false));

          setCategoryData({
            type: '',
            name: '',
          });
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred, please try again later.');
      console.error('An unexpected error occurred, please try again later.');
    }
  };

  return (
    <Modal title="Create/Edit Category" showModal={categoryModal}>
      {getDataModalLoading ? (<Spinner/>) : (
        <form onSubmit={onFormSubmit}>
          <div className="modal-body">
            <div className="form-group mb-3">
              <label htmlFor="type" className="text-secondary mb-2">Category type:</label>
              <select
                onChange={onFieldChange}
                id="type"
                required
                name="type"
                className="form-select"
                value={categoryData.type}>
                <option disabled value="">Select a category</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="name" className="text-secondary mb-2">Category name:</label>
              <input
                onChange={onFieldChange}
                id="name"
                required
                type="text"
                name="name"
                className="form-control"
                value={categoryData.name}/>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" disabled={buttonSaveAndEditLoading} className="btn btn-primary">
              {buttonSaveAndEditLoading && (<ButtonSpinner/>)} Save
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default CategoryForm;