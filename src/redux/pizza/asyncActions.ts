import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, seacrh, currentPage } = params;
    const { data } = await axios.get(
      `https://62e5a19fde23e26379223bf1.mockapi.io/items?page=${currentPage}&limit=4&${`sortBy=${sortBy}&order=${order}`}${category}${seacrh}`
    );
    return data;
  }
);
