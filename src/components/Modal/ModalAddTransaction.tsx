import React, {PropsWithChildren} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectShowTransaction, showAddTransactionModal} from '../../store/transaction/transactionSlice';

const ModalAddTransaction: React.FC<PropsWithChildren> = ({children}) => {
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectShowTransaction);
  
  const onInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  
  const onClose = () => {
    dispatch(showAddTransactionModal(false));
  };
  
  return show && (
    <>
      <Backdrop show={show} onClick={onClose}/>
      <div className="modal show" style={{display: show ? 'block' : 'none'}} onClick={onClose}>
        <div className="modal-dialog" onClick={onInnerClick}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body m-0 p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddTransaction;