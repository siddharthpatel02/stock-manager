import { http } from "./http";

export interface productType {
  productName: string;
  modelName: string;
  price: string;
  description: string;
  productPhoto: File;
}
export interface productResponseType {
  _id: string;
  productName: string;
  modelName: string;
  price: number;
  description: string;
  availableStock: number;
  productPhoto: string;
  status: boolean;
  createdOn: string;
  createdBy: string;
  __v: number;
}

const createProduct = async (data: productType, token: string) => {
  const formData = new FormData();
  formData.append("productName", data.productName);
  formData.append("modelName", data.modelName);
  formData.append("price", data.price);
  formData.append("description", data.description);
  formData.append("productPhoto", data.productPhoto);

  try {
    const response = await http.post("products", formData, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getProducts = async (token: string) => {
  try {
    const response = await http.get("products", {
      headers: { Authorization: token },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export { createProduct, getProducts };
