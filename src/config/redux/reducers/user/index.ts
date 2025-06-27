import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, saveCookie } from "@/utility";
import { saveTokenDataType } from "./types";
import { userData } from "@/constants/Types";

const initialState: userData = {
  token: null,
  user: {
    id: null,
    name: null,
    email: null,
    role: null,
    store_id: null,
    phone: null,
    is_subscribed: null,
  },
};

const cartSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveToken(state, action: PayloadAction<saveTokenDataType>) {
      console.log("action.payload", action.payload);
      state.token = action.payload.token;
      state.user = action.payload.user;
      saveCookie("V_at", action.payload.token || "unkown Token");
      saveCookie("V_PL", JSON.stringify(action.payload?.user) || "unkown data");
      saveCookie("s_s", action.payload?.user?.is_subscribed || "false");
    },
    saveSubscription(state, action: PayloadAction<{ is_subscribed: boolean }>) {
      console.log("action.payload", action.payload);
      state.user.is_subscribed = action.payload.is_subscribed;
      saveCookie("s_s", (action.payload?.is_subscribed).toString() as string || "false");
    },
    getToken(state) {
      state.token = getCookie("V_at");
      state.user = { ...JSON.parse(getCookie("V_PL") || "{}") };
    },
  },
});

export const { saveToken, getToken, saveSubscription } = cartSlice.actions;
export default cartSlice.reducer;
