import axios from "axios";

const getAxios = () => {
    const token = localStorage.getItem("token");
    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });

    return instance;
};

export default getAxios;
