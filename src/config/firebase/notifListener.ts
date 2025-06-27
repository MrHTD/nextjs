import { getCookie, saveCookie } from "@/utility";
import { messaging, getToken, onMessage } from "./firebase";

const registerServiceWorker = async () => {
  try {
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('Service Worker registered with scope:', registration.scope);
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    throw error;
  }
};

export const requestNotificationPermission = async (setTokenCallback: (e: string) => void) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        // First check for existing token in cookies
        const existingToken = getCookie("f_t");

        if (existingToken) {
          console.log("Using existing FCM token from cookie:", existingToken);
          if (setTokenCallback) {
            setTokenCallback(existingToken);
          }
        } else {
          // No existing token, generate new one
          await registerServiceWorker();

          const currentToken = await getToken(messaging, {
            vapidKey: "BEgwsT1udZjl8q_s-uCbA4kSP2Nw780ypoUB4JDLWqhExsXcK4e_Ng4vsCLs1CHPIL62_giWUxNAh-veVIgfPZ0"
          });

          if (currentToken) {
            console.log("Generated new FCM Token:", currentToken);
            if (setTokenCallback) {
              console.log("Setting token callback:", currentToken);
              saveCookie("f_t", currentToken);
              setTokenCallback(currentToken);
            }
          } else {
            console.warn("No registration token available");
          }
        }
      } catch (error) {
        console.error("Error getting FCM token:", error);
        // Retry after a delay if it's a service worker registration error
        if (error instanceof Error && error.message.includes("ServiceWorker")) {
          setTimeout(() => {
            requestNotificationPermission(setTokenCallback);
          }, 2000);
        }
      }
    } else {
      console.warn("Notification permission not granted");
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
  }
};

export const listenForNotifications = () => {
  try {
    onMessage(messaging, (payload) => {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(payload?.notification?.title as string, {
            body: payload?.notification?.body,
            icon: "/assets/images/logo.png",
            badge: "/assets/images/logo.png",
            data: payload?.data
          });
        }
      });
    });
  } catch (error) {
    console.error("Error setting up notification listener:", error);
  }
};