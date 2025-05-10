import axios from "axios";

const apiUrl = "http://localhost:8080/api/";

const apiClient = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})

export default apiClient