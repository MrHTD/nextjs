"use client";
import React, { useEffect, useState } from "react";
import AuthLeftSide from "@/components/AuthLeftSide";
import SignupRightForm from "@/components/SignupRightForm";
import { useRouter } from "next/navigation";
import { showNotification } from "@/utility/snackBar";
import { useDispatch } from "react-redux";
import { saveToken } from "@/config/redux/reducers/user";
import { signUp } from "@/services/auth";
import { removeStore, setStoreCookie } from "@/config/redux/reducers/store";
import { listenForNotifications, requestNotificationPermission } from "@/config/firebase/notifListener";

interface FormData {
  name: string;
  email: string;
  phone: string;
  country_code: string;
  password: string;
  confirm_password: string;
  role: string;
  device_id?: string;
}

function VendorSignup() {
  const route = useRouter();
  const dispatch = useDispatch();
  const [Token, setToken] = useState('')

  const SignupHandler = async (payload: FormData) => {
    payload.phone = payload.country_code.concat(payload.phone);
    if (payload.password !== payload.confirm_password) {
      alert("Password mismatch");
      return;
    }

    payload.role = "vendor";
    payload.device_id = Token
    signUp(payload)
      .then((res) => {
        // Handle success: Redirect, show success message, etc.
        console.log("Signup successful!", res);
        showNotification(
          "success",
          "Signup successful! Please login to continue"
        );
        dispatch(saveToken({ token: res?.token, user: res?.user }));
        route.refresh()
        window.location.reload()
        if (res?.user?.profile_completed == "true") {
          dispatch(setStoreCookie());
          route.replace("/dashboard");
        } else {
          dispatch(removeStore());
          route.replace("/store/create/internal-store");
        }
      })
      .catch((error) => {
        console.error(
          "Signup failed error:",
          error?.data.error || error.message
        );
        showNotification("error", error?.data.message || error?.data.error);
      });
  };

  useEffect(() => {
    requestNotificationPermission(setToken)
    listenForNotifications()
  }, [])
  return (
    <div className="min-h-screen max-h-full grid grid-cols-1 md:grid-cols-2">
      <div className="bg-primary flex flex-col items-center justify-center relative overflow-hidden p-8">
        <AuthLeftSide />
      </div>
      <div className="flex flex-col items-start justify-center w-full mx-auto max-w-lg px-6 py-8 md:py-12 text-textcolor">
        <SignupRightForm SignupHandler={SignupHandler} cancelLink="/login" />
      </div>
    </div>
  );
}
export default VendorSignup;
