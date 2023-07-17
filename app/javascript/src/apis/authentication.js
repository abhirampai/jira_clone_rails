import axios from "axios";

const authenticationUrl = "/api/v1/users";
const signup = payload => axios.post(`${authenticationUrl}`, { user: payload });

const login = payload =>
  axios.post("/session", {
    login: payload,
  });

const logout = () => axios.delete(`/session`);

export { signup, login, logout };
