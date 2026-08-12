import api from "./api";

const getMyBookings = async () => {
    const response = await api.get("/Customers/bookings");
    return response.data;
};

const getBooking = async (id) => {
    const response = await api.get(`/Customers/bookings/${id}`);
    return response.data;
};

const cancelBooking = async (id) => {
    const response = await api.put(`/Customers/bookings/${id}/cancel`);
    return response.data;
};

export default {
    getMyBookings,
    getBooking,
    cancelBooking
};