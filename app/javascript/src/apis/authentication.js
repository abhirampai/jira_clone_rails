import axios from "axios";

const authenticationUrl = "/signup";
const signup = payload =>
  axios.post(`${authenticationUrl}`, JSON.stringify(payload));

export { signup };
