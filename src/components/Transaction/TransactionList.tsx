import React, {useEffect} from 'react';
import TransactionItem from './TransactionItem';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDeleteTransaction, selectTransaction, selectTransactions} from '../../store/transaction/transactionSlice';
import {selectCategories} from '../../store/category/categorySlice';
import {deleteTransaction, fetchAllTransactions} from '../../store/transaction/transactionThunks';
import ModalEditTransaction from '../Modal/ModalEditTransaction';
import EditTransaction from '../../containers/EditTransaction/EditTransaction';


const TransactionList: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const transactions = useAppSelector(selectTransactions);
  const deleteLoading = useAppSelector(selectDeleteTransaction);
  const oneTransaction = useAppSelector(selectTransaction);
  
  useEffect(() => {
    if (categories.length > 0) {
      void dispatch(fetchAllTransactions(categories));
    }
  }, [categories, dispatch]);
  
  const onDeleteTransaction = async (id: string) => {
    if (window.confirm('Do you want to delete category')) {
      await dispatch(deleteTransaction(id));
    }
    await dispatch(fetchAllTransactions(categories));
  };
  
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const total = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      return acc + transaction.amount;
    } else {
      return acc - transaction.amount;
    }
  }, 0);
  
  
  return (
    <div>
      {total > 0 && (
        <h4 className="px-3 py-2 mb-5 bg-body-secondary rounded-3">Total: {total} KGS</h4>
      )}
      
      {sortedTransactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          deleteLoading={deleteLoading}
          onDelete={() => onDeleteTransaction(transaction.id)}
        />
      ))}
      <ModalEditTransaction>
        {oneTransaction &&
          <EditTransaction
            transaction={oneTransaction}
          />
        }
      </ModalEditTransaction>
    </div>
  );
};

export default TransactionList;