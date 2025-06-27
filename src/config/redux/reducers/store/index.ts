import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreData } from "@/constants/Types";
import { removeCookie, saveCookie } from "@/utility";

interface StoreState {
  store: StoreData | null,
  isHaveStore: boolean,
}

const initialState: StoreState = {
  store: null,
  isHaveStore: false,
};

const StoreSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    saveStore(state, action: PayloadAction<StoreData>) {
      console.log('Save Store' , action.payload)
      state.store = action.payload;
      saveCookie("h_s", '1');
      state.isHaveStore = true;
    },
    removeStore(state) {
      removeCookie("h_s");
      state.store = null;
      state.isHaveStore = false;
    },
    setStoreCookie(state) {
      saveCookie("h_s", '1');
      state.isHaveStore = true;
    },
  },
});

export const { saveStore , removeStore , setStoreCookie } = StoreSlice.actions;
export default StoreSlice.reducer;
