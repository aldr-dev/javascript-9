import React from 'react';
import {useAppDispatch} from '../../app/hooks';
import {showCategoryModal} from '../../store/category/categorySlice';

interface Props extends React.PropsWithChildren {
  showModal: boolean;
  title: string;
}

const Modal: React.FC<Props> = ({showModal, title, children}) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="modal-backdrop show" style={{ display: showModal ? 'block' : 'none' }}/>
      <div className="modal show" style={{ display: showModal ? 'block' : 'none' }} onClick={() => dispatch(showCategoryModal(false))}>
        <div className="modal-dialog" onClick={(event) => event.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
              <button
                type="button"
                onClick={() => dispatch(showCategoryModal(false))}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;