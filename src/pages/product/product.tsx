import { useState } from "react";
import ProductForm from "../../components/forms/productForm/productForm";
import ProductList from "../../components/list/productList/productList";
import ProductFormModal from "../../components/modal/productForm/productFormModal";
import useProducts from "../../customeHooks/useProductHook";
import "./product.scss";

const Product = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [isLoading, products, refetch, isError] = useProducts();

  return (
    <div className="product">
      <ProductList
        isError={isError}
        isLoading={isLoading}
        products={products}
        refetch={refetch}
      />
      <button
        onClick={() => setAddProduct(!addProduct)}
        className="product-add-btn btn-primary-fill"
      >
        Add new product
      </button>
      {addProduct && (
        <ProductFormModal
          refetch={refetch}
          closeForm={() => setAddProduct(false)}
        />
      )}

      {/* {addProduct && (
        <ProductForm refetch={refetch} closeForm={() => setAddProduct(false)} />
      )} */}
    </div>
  );
};

export default Product;
