import axios from "axios";

const fetchUrl = "/api/v1/issues";
const getUrl = id => `${fetchUrl}/${id}`;

const index = () => axios.get(fetchUrl);
const get = id => axios.get(getUrl(id));
const create = payload => axios.post(fetchUrl, { issue: payload });
const update = (id, payload) => axios.put(getUrl(id), { issue: payload });

export { index, get, create, update };
