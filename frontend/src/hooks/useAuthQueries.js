import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../apiCall/authApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data) => loginApi(data),
  });
};