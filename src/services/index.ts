import { getCookie } from "@/utility";
import axios from "axios";

const baseURL = "https://mawrid.backend.devxonic.com";
// const baseURL = "http://localhost:4008";

const ApiHandler = (isMultipart = false) => {
    const instance = axios.create({
        baseURL: baseURL,
        headers: {
            ["Content-Type"]: isMultipart
                ? "multipart/form-data"
                : "application/json",
        },
    });
    instance.interceptors.request.use(
        (config) => {
            try {
                const token = getCookie("V_at");
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        (error) => {
            console.log("REQUEST error ==>> ", error);
            return Promise.reject(error);
        }
    );
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                console.log("Error Response", error?.response);
            }
            return Promise.reject(error.response);
        }
    );

    return instance;
};

export const uploadFileAPI = async (formData: any) => {
    try {
        const response = await axios({
            method: "post",
            url: "https://upload.devxonic.com/api/upload",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("File upload failed:", error);
        throw error;
    }
};

export default ApiHandler;