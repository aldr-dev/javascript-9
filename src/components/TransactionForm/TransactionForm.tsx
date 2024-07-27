import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchCategoryPreview} from '../../store/transaction/transactionThunks';
import {selectCategoryPreview} from '../../store/transaction/transactionSlice';
import {ApiTransaction, TransactionMutate} from '../../types';
import {selectCategories} from '../../store/category/categorySlice';
import {fetchAllCategories} from '../../store/category/categoryThunks';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const initialState: TransactionMutate = {
  type: '',
  name: '',
  amount: ''
};

interface Props {
  onSubmitTransaction: (category: ApiTransaction) => void;
  existingTransaction?: TransactionMutate;
  isEdit?: boolean;
  isLoading?: boolean;
}

const TransactionForm: React.FC<Props> = ({onSubmitTransaction, existingTransaction = initialState, isEdit = false, isLoading= false}) => {
  const dispatch = useAppDispatch();
  const categoryPreviews = useAppSelector(selectCategoryPreview);
  const categories = useAppSelector(selectCategories);
  const [selectValue, setSelectValue] = useState<TransactionMutate>(existingTransaction);
  
  useEffect(() => {
    void dispatch(fetchAllCategories());
  }, [dispatch]);
  
  const changeSelect = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = event.target;
    setSelectValue(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  useEffect(() => {
    selectValue.type.length > 0 && void dispatch(fetchCategoryPreview(selectValue.type));
  }, [dispatch, selectValue]);
  
  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const selectedCategory = categories.find(
      (category) => category.name === selectValue.name && category.type === selectValue.type
    );
    
    if (selectedCategory) {
      const newTransaction: ApiTransaction = {
        category: selectedCategory.id,
        amount: +selectValue.amount,
        createdAt: new Date().toString(),
      };
      
      onSubmitTransaction({
        ...newTransaction
      });
    }
  };
  
  return (
    <form onSubmit={onFormSubmit}>
      <h4 className="mb-3">
        {isEdit ? 'Edit category' : 'Create new Transaction'}
      </h4>
      <div className="form-group mb-3">
        <label htmlFor="type" className="text-secondary mb-2">Category type</label>
        <select
          required
          name="type"
          id="type"
          className="form-select"
          value={selectValue.type}
          onChange={changeSelect}
        >
          <option disabled value="">Select type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="name" className="text-secondary mb-2">Category name</label>
        <select
          required
          name="name"
          id="name"
          className="form-select"
          value={selectValue.name}
          onChange={changeSelect}
        >
          <option disabled value="">Select a category</option>
          {categoryPreviews.length > 0 ? (
            categoryPreviews.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))
          ) : null}
        </select>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="amount" className="text-secondary mb-2">Amount</label>
        <div className="input-group mb-3">
          <span className="input-group-text">KGS</span>
          <input type="number"
                 name="amount"
                 id="amount"
                 required
                 className="form-control"
                 value={selectValue.amount}
                 onChange={changeSelect}
          />
          <span className="input-group-text">.00</span>
        </div>
      
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

export default TransactionForm;