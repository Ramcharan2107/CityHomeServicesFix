import api from "./api";

const getAll = async () => {

    const response = await api.get("/JobProgress");

    return response.data;

};

const getById = async (id) => {

    const response = await api.get(

        `/JobProgress/${id}`

    );

    return response.data;

};

const create = async (data) => {

    const response = await api.post(

        "/JobProgress",

        data

    );

    return response.data;

};

const update = async (id, data) => {

    const response = await api.put(

        `/JobProgress/${id}`,

        data

    );

    return response.data;

};

const remove = async (id) => {

    const response = await api.delete(

        `/JobProgress/${id}`

    );

    return response.data;

};

export default {

    getAll,

    getById,

    create,

    update,

    delete: remove

};