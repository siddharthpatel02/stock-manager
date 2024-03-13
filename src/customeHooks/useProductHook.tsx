import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productApi";

const useProducts = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: products,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const data = await getProducts(cookies.jwt);
        console.log(cookies.jwt);
        return data;
      } catch (error: any) {
        // if (error.response.status === 401) {
        //   queryClient.removeQueries();
        //   navigate("/login");
        // }
        throw error;
      }
    },
    retry: 2,
  });
  return [isLoading, products, refetch, isError];
};

export default useProducts;
