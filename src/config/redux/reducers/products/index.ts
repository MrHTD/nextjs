import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/constants/Types"; // Update the import to Products
import { removeCookie, saveCookie } from "@/utility";

interface ProductState {
    products: Product[] | null, // Change type to Products
}

const initialState: ProductState = {
    products: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Product>) { // Change type to Products
            if (state.products) {
                state.products.push(action.payload);
            } else {
                state.products = [action.payload];
            }
        },
        saveProducts(state, action: PayloadAction<Product[]>) { // Change type to Products
            state.products = action.payload;
        },
        removeProductById(state, action: PayloadAction<string>) {
            if (state.products) {
                state.products = state.products.filter((product:Product) => product.id !== action.payload);
            }
        },
        removeProducts(state) {
            state.products = null;
        },
    },
});

export const { saveProducts, removeProducts, removeProductById } = productSlice.actions;
export default productSlice.reducer;
