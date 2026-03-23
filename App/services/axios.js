import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"

const axiosInstance = axios.create({
    // baseURL: 'http://192.168.0.34:8080/api/v1', // My Home IP
    baseURL: 'http://10.10.1.34:8080/api/v1', // Office IP
    withCredentials: true
});

// Add a request interceptor to add JWT token to requests headers
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;