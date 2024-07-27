import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {showAddTransactionModal} from '../../store/transaction/transactionSlice';
import ModalAddTransaction from '../Modal/ModalAddTransaction';
import AddTransaction from '../../containers/AddTransaction/AddTransaction';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-sm">
        <Link to="/" className="navbar-brand">
          Finance tracker
        </Link>
        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/categories" className="nav-link">Categories</NavLink>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => dispatch(showAddTransactionModal(true))}
            >
              Add
            </button>
          </li>
        </ul>
      </div>
      <ModalAddTransaction>
        <AddTransaction/>
      </ModalAddTransaction>
    </nav>
  );
};

export default Navbar;