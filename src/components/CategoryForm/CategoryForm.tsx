import React, {useState} from 'react';
import {ApiCategory} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const initialState: ApiCategory = {
  type: '',
  name: ''
};

interface Props {
  onSubmitCategory: (category: ApiCategory) => void;
  existingCategory?: ApiCategory;
  isEdit?: boolean;
  isLoading?: boolean;
}

const CategoryForm: React.FC<Props> = ({onSubmitCategory, existingCategory = initialState, isEdit = false, isLoading= false}) => {
  const [category, setCategory] = useState<ApiCategory>(existingCategory);
  
  const changeCategory = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = event.target;
    
    setCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmitCategory({...category});
    setCategory(initialState);
  };
  
  return (
    <form onSubmit={onFormSubmit}>
      <h4 className="mb-3">
        {isEdit ? 'Edit category' : 'Create new category'}
      </h4>
      <div className="form-group mb-3">
        <label htmlFor="type" className="text-secondary mb-2">Category type</label>
        <select
          required
          name="type"
          id="type"
          className="form-select"
          value={category.type}
          onChange={changeCategory}
        >
          <option disabled value="">Select a category</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-group mb-4">
        <label htmlFor="name" className="text-secondary mb-2">Category name</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          className="form-control"
          value={category.name}
          onChange={changeCategory}
        />
      </div>
      <button
        type="submit"
        className="btn btn-success w-100"
        disabled={isLoading}
      >
        {isLoading && <ButtonSpinner/>}
        {isEdit ? 'Save' : 'Create'}
      </button>
    </form>
  );
};

export default CategoryForm;