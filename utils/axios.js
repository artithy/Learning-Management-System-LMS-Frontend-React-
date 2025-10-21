import axios from 'axios';

const getAxios = () => {
    return axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: { "Content-Type": "application/json" },
    });
};


export default getAxios;