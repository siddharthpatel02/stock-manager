import { http } from "./http";

interface SalesResponseType {
  _id: string;
  productName: string;
  modelName: string;
  date: string; // Assuming the date is returned as a string
  productId: string;
  userId: string;
  qtySold: number;
  unitCost: number;
  __v: number;
}

const fetchSalesData = async (token: string, sortOrder: string) => {
  try {
    const salesData = await http.get(`sales?type=user&sort=${sortOrder}`, {
      headers: { Authorization: token },
    });
    return salesData.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export { fetchSalesData };
export type { SalesResponseType };
