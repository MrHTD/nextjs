"use client";
import React, { useEffect, useState } from "react";
import AuthLeftSide from "@/components/AuthLeftSide";
import LoginRightForm from "@/components/LoginRightForm";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showNotification } from "@/utility/snackBar";
import { saveToken } from "@/config/redux/reducers/user";
import { Login } from "@/services/auth";
import { getCookie, saveCookie } from "@/utility";
import { removeStore, saveStore, setStoreCookie } from "@/config/redux/reducers/store";
import { listenForNotifications, requestNotificationPermission } from "@/config/firebase/notifListener";

interface LoginProps {
  title?: string;
  loginlink?: string;
  signuplink?: string;
}
interface FormData {
  password: string;
  identifier?: string;
  device_id?: string
}



function VendorLogin({ title }: LoginProps) {

  const route = useRouter();
  const dispatch = useDispatch();
  const [Token, setToken] = useState('')

  const LoginHandler = (payload: FormData) => {
    if (!payload.password || payload.password.length < 6) {
      showNotification("error", 'Please enter valid phone number and password');
      return;
    }
    payload.device_id = Token.length > 0 ? Token : getCookie('f_t')
    console.log("see the cookie", payload)
    Login(payload).then((res) => {
      // Handle success: Redirect, show success message, etc.
      console.log('Signup successful!', res);
      showNotification('success', 'Login successful!');
      dispatch(saveToken({ token: res?.token, user: res?.user }));
      route.refresh()
      window.location.reload()
      if ((res?.user?.profile_completed) == 'true') {
        dispatch(saveStore({
          id: res?.user?.store_id as string,
          name: "",
          cover_image: "",
          profile_image: "",
          category_id: "",
          description: "",
          owner_user: "",
          address: "",
          type: "internal",
          opening_time: "",
          closing_time: "",
          opening_days: "",
          closing_days: "",
          pickup_location: "",
          default_delivery_location: null
        }))
        dispatch(setStoreCookie());
        route.replace('/dashboard')
      } else {
        dispatch(removeStore());
        route.replace('/store/create/internal-store')
      }
    }).catch((error) => {
      console.error("Signup failed", error);
      showNotification("error", error?.data?.message || error?.data?.error || error.data);
    });
  };
  useEffect(() => {
    requestNotificationPermission(setToken)
    console.log('get token', Token)
    listenForNotifications()
  }, [])
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="bg-primary flex flex-col items-center justify-center relative overflow-hidden p-8">
        <AuthLeftSide />
      </div>
      <div className="flex flex-col items-start justify-center mx-auto px-6 py-8 md:py-12 text-textcolor">
        <LoginRightForm title={title} loginlink="/login" signuplink="/signup" LoginHandler={LoginHandler} />
      </div>
    </div>
  );
}
export default VendorLogin;