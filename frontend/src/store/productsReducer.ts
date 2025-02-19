import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPrices } from "../api/FetchPrices";

export const fetchProducts = createAsyncThunk("products/fetch", async (produto: string) => {
  return await fetchPrices(produto);
});

const productsSlice = createSlice({
  name: "products",
  initialState: { list: [], status: "idle" },
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
