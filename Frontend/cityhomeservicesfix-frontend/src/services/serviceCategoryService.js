import api from "./api";

const getAll = async () => {

    const response = await api.get("/ServiceCategories");

    return response.data;

};

const getById = async (id) => {

    const response = await api.get(`/ServiceCategories/${id}`);

    return response.data;

};

const create = async (category) => {

    const response = await api.post(
        "/ServiceCategories",
        category
    );

    return response.data;

};

const update = async (category) => {

    const response = await api.put(
        "/ServiceCategories",
        category
    );

    return response.data;

};

const remove = async (id) => {

    const response = await api.delete(
        `/ServiceCategories/${id}`
    );

    return response.data;

};

const serviceCategoryService = {

    getAll,

    getById,

    create,

    update,

    delete: remove

};

export default serviceCategoryService;