import api from "./api";


const getAll = async () => {

    const response =
        await api.get("/Notifications");

    return response.data;
};


const getById = async (id) => {

    const response =
        await api.get(`/Notifications/${id}`);

    return response.data;
};


const getUnreadCount = async () => {

    const response =
        await api.get("/Notifications/unread-count");

    return response.data;
};


const markAsRead = async (id) => {

    const response =
        await api.put(`/Notifications/${id}/read`);

    return response.data;
};


export default {

    getAll,

    getById,

    getUnreadCount,

    markAsRead

};