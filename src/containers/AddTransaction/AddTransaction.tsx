import React from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCreateTransactionLoading, showAddTransactionModal} from '../../store/transaction/transactionSlice';
import {ApiTransaction} from '../../types';
import {createTransaction, fetchAllTransactions} from '../../store/transaction/transactionThunks';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import {selectCategories} from '../../store/category/categorySlice';

const AddTransaction: React.FC = () => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateTransactionLoading);
  const categories = useAppSelector(selectCategories);
  
  const onSubmit = async (transaction: ApiTransaction) => {
    await dispatch(createTransaction(transaction));
    void dispatch(fetchAllTransactions(categories));
    dispatch(showAddTransactionModal(false));
  };
  
  return (
    <div>
      <TransactionForm
        onSubmitTransaction={onSubmit}
        isLoading={createLoading}/>
    </div>
  );
};

export default AddTransaction;