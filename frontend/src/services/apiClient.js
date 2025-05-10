import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080/api/";

const apiClient = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})

export default apiClient