import { http } from "./http";

const getDashboardData = async (token: string) => {
  try {
    const response = await http.get("dashboard", {
      headers: { Authorization: token },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export { getDashboardData };
