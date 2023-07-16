import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

// 초기 상품 목록
const initialState = [
  {
    id: nanoid(),
    name: "멋진 바지",
    price: 20000,
    options: ["28", "30", "32"],
    likes: 100,
  },
  {
    id: nanoid(),
    name: "멋진 셔츠",
    price: 10000,
    options: ["small", "medium", "large"],
    likes: 200,
  },
  {
    id: nanoid(),
    name: "멋진 신발",
    price: 30000,
    options: ["230", "240", "250", "260", "270"],
    likes: 300,
  },
];

// products 리듀서 생성
const productsReducer = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    sortByPrice: (state) => {
      // 가격에 따라 상품 목록 정렬
      state.sort((a, b) => a.price - b.price);
    },
    reset: () => {
      // 초기 상태로 리셋
      return initialState;
    },
  },
});

export const { sortByPrice, reset } = productsReducer.actions;
export default productsReducer.reducer;
