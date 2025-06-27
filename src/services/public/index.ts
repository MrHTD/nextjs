import { CategoriesTypes } from "@/constants/Types";
import ApiHandler from "../index";
import { publicEndPoints } from "../endpoints";

const getCategories = async (params: CategoriesTypes) => {
    try {
        const response = await ApiHandler().get(`${publicEndPoints.GET_CATEGORIES}?type=${params}`);
        console.log("get categories Response:", response?.data);
        return response?.data;
    } catch (error: any) {
        console.error("get categories Error:", error?.data?.error || error?.message);
        throw error;
    }
};

const getTags = async () => {
    try {
        const response = await ApiHandler().get(publicEndPoints.GET_TAGS);
        console.log("get Tags Response:", response?.data);
        return response?.data;
    } catch (error: any) {
        console.error("get Tags Error:", error?.data?.error || error?.message);
        throw error;
    }
};


const getProductById = async (product_id: string) => {
    try {
        const response = await ApiHandler().get(`publicEndPoints.GET_PRODUCT_BY_ID?id=${product_id}`);
        console.log("get Product by id Response:", response?.data);
        return response?.data;
    } catch (error: any) {
        console.error("get Product by id Error:", error?.data?.error || error?.message);
        throw error;
    }
};


export { getCategories, getTags, getProductById };   