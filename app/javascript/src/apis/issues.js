import axios from "axios";

const url = "/api/v1/issues";

const get = () => axios.get(url);

export { get };
