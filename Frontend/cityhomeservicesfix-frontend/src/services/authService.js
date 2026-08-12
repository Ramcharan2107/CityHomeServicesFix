import api from "./api";

const login = async (request) => {
    const response = await api.post("/Auth/login", request);
    return response.data;
};

const register = async (request) => {
    const response = await api.post("/Auth/register", request);
    return response.data;
};

export default {
    login,
    register
};