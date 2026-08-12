import api from "./api";
import { jwtDecode } from "jwt-decode";

const getUserId = () => {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Authentication token not found.");
    }

    const decoded = jwtDecode(token);

    const userId =
        decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

    if (!userId) {
        throw new Error("User ID not found in authentication token.");
    }

    return Number(userId);
};


const getMyProfile = async () => {

    const userId = getUserId();

    const response =
        await api.get(`/Users/${userId}`);

    return response.data;
};


const updateProfile = async (data) => {

    const userId = getUserId();

    const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        phoneNumber: data.phoneNumber,
        profileImageUrl: data.profileImageUrl ?? null
    };

    const response =
        await api.put(
            `/Users/${userId}`,
            payload
        );

    return response.data;
};


export default {

    getMyProfile,

    updateProfile

};