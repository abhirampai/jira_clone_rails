import { useMutation } from "react-query";

import { signup, login } from "apis/authentication";

const useSignup = () => useMutation(signup);

const useLogin = () => useMutation(login);

export { useSignup, useLogin };
