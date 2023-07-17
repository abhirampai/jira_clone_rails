import { useMutation } from "react-query";

import { signup } from "apis/authentication";

const useSignup = () => useMutation(signup);

export { useSignup };
