import { http } from "./http";

export interface registerUserInterface {
  name: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  type:string
}
export const registerUser = async (data: registerUserInterface) => {
  try {
    const response = await http.post("user", data);
    return response;
  } catch (error) {
    throw error;
  }
};


