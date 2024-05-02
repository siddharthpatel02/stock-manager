import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import ProductForm from "../../forms/productForm/productForm";
import "./productFormModal.scss";
import { AiFillCloseCircle } from "react-icons/ai";

const ProductFormModal = ({
  closeForm,
  refetch,
}: {
  closeForm: () => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-container-cls-btn">
          <button onClick={closeForm}>
            <AiFillCloseCircle size={"2.4rem"} />
          </button>
        </div>
        <div className="modal-container-form">
          <ProductForm closeForm={closeForm} refetch={refetch}></ProductForm>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
