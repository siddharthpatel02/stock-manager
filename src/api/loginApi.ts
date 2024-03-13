import { http } from "./http";

export interface loginType {
  userName: string;
  password: string;
}

export const loginUser = async (loginCredentials: loginType) => {
  try {
    const response = await http.post("user/login", loginCredentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
