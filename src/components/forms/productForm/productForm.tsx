import { useForm } from "react-hook-form";
import FormInput from "../../formInput/formInput";
import "./productForm.scss";
import { createProduct, productType } from "../../../api/productApi";
import { useCookies } from "react-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "@tanstack/react-query";

const ProductForm = ({
  closeForm,
  refetch,
}: {
  closeForm: () => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
  const [isSubmitting, setSubmission] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [cookies] = useCookies();
  return (
    <form
      className="product-form"
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        try {
          console.log(data);
          setSubmission(true);
          await createProduct(
            { ...data, productPhoto: data.productPhoto[0] } as productType,
            cookies.jwt
          );
          toast.success("Product created successfully");
          reset();
          refetch();
        } catch (error: any) {
          const { message } = error.response.data;
          toast.error(message);
        } finally {
          setSubmission(false);
        }
      })}
    >
      <FormInput
        errors={errors}
        register={register}
        type="text"
        id="productName"
      >
        Product name
      </FormInput>
      <FormInput errors={errors} register={register} type="text" id="modelName">
        model
      </FormInput>
      <FormInput errors={errors} register={register} type="number" id="price">
        price
      </FormInput>
      <FormInput
        errors={errors}
        register={register}
        type="text"
        id="description"
        isTextArea={true}
      >
        description
      </FormInput>
      <FormInput
        errors={errors}
        register={register}
        type="file"
        id="productPhoto"
      >
        product photo
      </FormInput>
      <div className="product-form-button">
        <button
          disabled={isSubmitting}
          onClick={closeForm}
          className="btn-primary-outline product-form-button__cancel "
        >
          Cancel
        </button>
        <button
          disabled={isSubmitting}
          className="btn-primary-fill product-form-button__submit"
        >
          Add product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
