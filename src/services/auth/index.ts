import { LoginPayload, signupPayload } from "@/constants/Types";
import ApiHandler from "../index";
import { authEndPoints } from "../endpoints";
import { AxiosResponse } from "axios";

const signUp = async (body: signupPayload) => {
    try {
        const response = await ApiHandler().post(authEndPoints.SIGNUP, body);
        console.log("Signup Response:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Signup Error:", error?.data.error || error.message);
        throw error;
    }
};

const Login = async (body: LoginPayload) => {
    try {
        const response: AxiosResponse = await ApiHandler().post(
            authEndPoints.LOGIN,
            body
        );
        console.log("Login Response:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error?.response?.data || error.message);
        throw error;
    }
};

export { signUp, Login };