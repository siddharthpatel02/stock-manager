import { http } from "./http";

interface MaintainStockInterface {
  productId: string;
  quantity: number;
  unitCost: number;
}

const maintainStock = async (
  type: string,
  data: MaintainStockInterface,
  token: string
) => {
  try {
    let response;
    if (type === "sales") {
      response = await http.post(
        "sales",
        {
          productId: data.productId,
          qtySold: data.quantity,
          unitCost: data.unitCost,
        },
        {
          headers: { Authorization: token },
        }
      );
    } else if (type === "stock") {
      response = await http.post(
        "stock",
        {
          productId: data.productId,
          stockQty: data.quantity,
          unitCost: data.unitCost,
        },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      response = await http.post(
        "stock-returns",
        {
          productId: data.productId,
          stockQty: data.quantity,
          unitCost: data.unitCost,
        },
        {
          headers: { Authorization: token },
        }
      );
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export { maintainStock };
