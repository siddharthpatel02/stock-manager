import { http } from "./http";

const authenticateUser = async (token: string) => {
  console.log("authentication started");
  try {
    const response = await http.get("auth", {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { authenticateUser };
