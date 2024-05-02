import axios from "axios";
// const baseURL = "http://localhost:80/";
const baseURL = "http://3.26.30.11/";

const http = axios.create({ baseURL });

const setupResponseInterceptor = (callback: () => void) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        callback();
      } else {
        return Promise.reject(error);
      }
    }
  );
};

// http.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();d
//     if (error.response.status === 401) {
//       queryClient.removeQueries();
//       navigate("/login");
//     }
//     throw error;
//   }
// );

export { http, setupResponseInterceptor };
