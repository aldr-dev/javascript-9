import React, {useEffect} from 'react';
import TransactionList from '../../components/Transaction/TransactionList';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectFetchTransactionsLoading} from '../../store/transaction/transactionSlice';
import Spinner from '../../components/Spinner/Spinner';
import {fetchAllCategories} from '../../store/category/categoryThunks';

const Home: React.FC = () => {
  const transactionLoading = useAppSelector(selectFetchTransactionsLoading);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    void dispatch(fetchAllCategories());
  }, [dispatch]);
  
  return (
    <div>
      {transactionLoading && <Spinner/>}
      <TransactionList/>
    </div>
  );
};

export default Home;