import Layout from '../../components/Layout/Layout';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectButtonDeleteCategoryLoading,
  selectCategoriesData,
  selectCategoryModal,
  selectGetDataLoading,
  showCategoryModal, updateStateCategoriesData
} from '../../store/category/categorySlice';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import { useEffect } from 'react';
import {deleteCategory, fetchDataCategories} from '../../store/category/categoryThunks';
import Spinner from '../../components/Spinner/Spinner';
import {toast} from 'react-toastify';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';
import {Link, useNavigate} from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categoryModal = useAppSelector(selectCategoryModal);
  const categoriesData = useAppSelector(selectCategoriesData);
  const getDataLoading = useAppSelector(selectGetDataLoading);
  const buttonDeleteCategoryLoading = useAppSelector(selectButtonDeleteCategoryLoading);

  const handleDeleteCategory = async (id: string) => {
    try {
      const confirmDeleteCategory = confirm('Are you sure you want to remove this category?');
      if (confirmDeleteCategory) {
        await dispatch(deleteCategory(id)).unwrap();
        dispatch(updateStateCategoriesData(id));
      }
    } catch (error) {
      toast.error('An unexpected error occurred, please try again later.');
      console.error('An unexpected error occurred, please try again later.');
    }
  };

  const handleModalCategoryOpen = () => {
    dispatch(showCategoryModal(true));
    navigate('/categories');
  };

  useEffect(() => {
    dispatch(fetchDataCategories());
  }, [dispatch]);

  return (
    <Layout>
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Categories</h4>
          <button onClick={handleModalCategoryOpen} className="btn btn-primary">Add</button>
          {categoryModal && <CategoryForm />}
        </div>
      </div>

      {categoriesData.length === 0 && !getDataLoading && (
        <p>The list of categories is empty, the title is something.</p>
      )}

      {getDataLoading ? (<Spinner />) : (
        <>
          {categoriesData.map((categoriesItem) => {
            const textColorClass = categoriesItem.type === 'expense' ? 'text-danger' : 'text-success';
            return (
              <div key={categoriesItem.id} className="card mb-2">
                <div className="card-body">
                  <div className="row d-flex align-items-center">
                    <div className="col-8">
                      {categoriesItem.name}
                    </div>
                    <div className="col-2 text-end">
                      <span className={`${textColorClass} text-capitalize fw-medium`}>{categoriesItem.type}</span>
                    </div>
                    <div className="col-2 text-end justify-content-end d-flex gap-2">
                      <Link to={`/categories/${categoriesItem.id}/edit`}
                        onClick={() => dispatch(showCategoryModal(true))}
                        className="btn btn-outline-secondary">
                        <i className="fs-5 bi bi-pencil-square"></i>
                      </Link>
                      <button
                        disabled={buttonDeleteCategoryLoading ? buttonDeleteCategoryLoading === categoriesItem.id : false}
                        onClick={() => handleDeleteCategory(categoriesItem.id)}
                        className="btn btn-outline-secondary">
                        {buttonDeleteCategoryLoading && buttonDeleteCategoryLoading === categoriesItem.id && <ButtonSpinner/>}
                        <i className=" fs-5 bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </Layout>
  );
};

export default Categories;
