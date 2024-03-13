import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import Layout from "./components/layout/layout";
import SignIn from "./features/signIn/signIn";
import Product from "./pages/product/product";
import Stock from "./pages/stock/stock";
import Sales from "./pages/sales/sales";
import SignUp from "./features/signUp/signUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * 60000,
      },
    },
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "sales",
          element: <Sales />,
        },
        {
          path: "product",
          element: <Product />,
        },
        {
          path: "stock",
          element: <Stock />,
        },
      ],
    },
    { path: "login", element: <SignIn /> },
    { path: "register", element: <SignUp /> },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          success: { duration: 5000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
