interface LowStockProduct {
  id: string;
  productName: string;
  modelName: string;
  totalSales: number;
  availableStock: number;
}

interface HighSaleProduct {
  id: string;
  productName: string;
  modelName: string;
  totalSales: number;
}
interface ProductList {
  id: string;
  productName: string;
}

interface DashboardType {
  availableStocks: number;
  highSaleProduct: HighSaleProduct[];
  lowStockProduct: LowStockProduct[];
  productList: ProductList[];
  salesPerProduct: number[];
  totalProducts: number;
  totalRevenue: number;
  totalSales: number;
  userName: string;
  weeklySales: number[];
  weeklyStock: number[];
  weeklyStockReturn: number[];
}

export type { DashboardType, ProductList };
