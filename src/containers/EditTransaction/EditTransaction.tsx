import React from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategories, selectFetchOneLoading} from '../../store/category/categorySlice';
import {ApiTransaction, Transaction, TransactionMutate} from '../../types';
import {fetchAllTransactions, updateTransaction} from '../../store/transaction/transactionThunks';
import {fetchAllCategories} from '../../store/category/categoryThunks';
import {showEditTransactionModal} from '../../store/transaction/transactionSlice';
import Spinner from '../../components/Spinner/Spinner';
import TransactionForm from '../../components/TransactionForm/TransactionForm';

interface Props {
  transaction: Transaction;
}

const EditTransaction: React.FC<Props> = ({transaction}) => {
  const transactionLoading = useAppSelector(selectFetchOneLoading);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  
  const existingTransaction: TransactionMutate = {
    type: transaction.type,
    name: transaction.category,
    amount: transaction.amount.toString()
  };
  
  const onSubmit = async (newTransaction: ApiTransaction) => {
    await dispatch(updateTransaction({id: transaction.id, transaction: newTransaction}));
    await dispatch(fetchAllCategories());
    await dispatch(fetchAllTransactions(categories));
    dispatch(showEditTransactionModal(false));
  };
  
  let formSection = <Spinner/>;
  
  if (!transactionLoading) {
    if (transaction) {
      formSection = (
        <TransactionForm
          onSubmitTransaction={onSubmit}
          existingTransaction={existingTransaction}
          isLoading={transactionLoading}
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

export default EditTransaction;