import { useMutation } from "react-query";

import { signup, login, logout } from "apis/authentication";
import { resetAuthTokens } from "apis/axios";
import { clearLocalStorageCredentials } from "utils/storage";

const useSignup = () => useMutation(signup);

const useLogin = () => useMutation(login);

const useLogout = () =>
  useMutation(logout, {
    onSuccess: () => {
      resetAuthTokens();
      clearLocalStorageCredentials();
      window.location.href = "/";
    },
  });

export { useSignup, useLogin, useLogout };
