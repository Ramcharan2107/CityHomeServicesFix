import api from "./api";

const getAll = async () => {

    const response = await api.get("/ServiceCategories");

    return response.data;

};

const getById = async (id) => {

    const response = await api.get(`/ServiceCategories/${id}`);

    return response.data;

};

export default {

    getAll,
    getById

};