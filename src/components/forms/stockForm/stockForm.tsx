import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "./stockForm.scss";
import { maintainStock } from "../../../api/maintainStockApi";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQueryClient,
} from "@tanstack/react-query";

const StockForm = ({
  productName,
  model,
  unitPrice,
  totalStock,
  closeForm,
  productId,
  refetch,
}: {
  productName: string;
  model: string;
  unitPrice: number;
  totalStock: number;
  productId: string;
  closeForm: () => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}) => {
  const [formType, setFormType] = useState("sales");
  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors },
  } = useForm();
  const [cookies] = useCookies();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await maintainStock(
        formType,
        { productId, quantity: data.quantity, unitCost: unitPrice },
        cookies.jwt
      );
      if (formType === "sales") {
        queryClient.invalidateQueries({ queryKey: ["salesData"] });
      }
      toast.success("Stock updated successfully");
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      refetch();
      reset();
    } catch (error: any) {
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  return (
    <div className="stock-form">
      <div className="stock-form-select">
        <div
          style={
            formType === "sales"
              ? {
                  backgroundColor: "skyblue",
                  border: "4px solid skyblue",
                }
              : {}
          }
          className="stock-form-select-options"
          onClick={() => {
            setFormType("sales");
            resetField("quantity");
          }}
        >
          Add sales
        </div>
        <div
          style={
            formType === "stock"
              ? {
                  backgroundColor: "skyblue",
                  border: "4px solid skyblue",
                }
              : {}
          }
          onClick={() => {
            setFormType("stock");
            resetField("quantity");
          }}
          className="stock-form-select-options"
        >
          Add stock
        </div>
        <div
          style={
            formType === "supplier"
              ? {
                  backgroundColor: "skyblue",
                  border: "4px solid skyblue",
                }
              : {}
          }
          onClick={() => {
            setFormType("supplier");
            resetField("quantity");
          }}
          className="stock-form-select-options"
        >
          Return to supplier
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="stock-form-main">
        <div className="stock-form-main-input">
          <h2 className="stock-form-main-input-label">Product Name</h2>
          <h2 className="stock-form-main-input-element capitalize">{productName}</h2>
          <h2 className="stock-form-main-input-label">Model</h2>
          <h2 className="stock-form-main-input-element capitalize">{model}</h2>
        </div>
        <div className="stock-form-main-input">
          <h2 className="stock-form-main-input-label">Unit Price</h2>
          <h2 className="stock-form-main-input-element">{unitPrice}</h2>
          <label className="stock-form-main-input-label" htmlFor="quantity">
            {formType === "sales"
              ? "Sold quantity"
              : formType === "stock"
              ? "Stock quantity"
              : "Return quantity"}
          </label>
          <input
            style={errors?.quantity && { borderColor: "red" }}
            {...register("quantity", {
              valueAsNumber: true,
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
              validate: (value) =>
                formType !== "stock"
                  ? value <= totalStock
                    ? true
                    : "Quantity exceeds total stock"
                  : true,
            })}
            className="stock-form-main-input-element"
            type="number"
            id="quantity"
          />
        </div>
        <div className="stock-form-main-error">
          {errors.quantity && (
            <p className="stock-form-main-error-msg">
              {errors?.quantity?.message?.toString()}
            </p>
          )}
        </div>
        <div className="stock-form-main-buttons">
          <button
            type="submit"
            className="btn-primary-fill stock-form-main-buttons-btn custom-button"
          >
            Submit
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              closeForm();
            }}
            className="btn-primary-outline stock-form-main-buttons-btn cancel-btn"
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockForm;
