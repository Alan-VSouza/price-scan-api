import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPrices, Produto } from "../api/FetchPrices";

interface ProductsState {
  list: Produto[];
  status: "idle" | "loading" | "failed";
}

const initialState: ProductsState = { list: [], status: "idle" };

export const fetchProducts = createAsyncThunk("products/fetch", async (produto: string) => {
  return await fetchPrices(produto);
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "idle";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export default productsSlice.reducer;
