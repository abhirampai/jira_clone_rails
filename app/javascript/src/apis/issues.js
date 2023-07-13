import axios from "axios";

const fetchUrl = "/api/v1/issues";
const searchUrl = `${fetchUrl}/search`;
const getUrl = id => `${fetchUrl}/${id}`;

const index = () => axios.get(fetchUrl);
const get = id => axios.get(getUrl(id));
const create = payload => axios.post(fetchUrl, { issue: payload });
const update = (id, payload) => axios.put(getUrl(id), { issue: payload });
const search = payload => axios.get(searchUrl, { params: { search: payload } });
const destroy = id => axios.delete(getUrl(id));

export { index, get, create, update, search, destroy };
