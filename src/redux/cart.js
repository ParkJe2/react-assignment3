import { createSlice } from "@reduxjs/toolkit";

// 장바구니 리듀서 생성
const cartReducer = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      // 장바구니에 상품 추가 액션 처리
      const { id, selectedOption } = action.payload;
      const existingCartItem = state.find(
        (item) => item.id === id && item.selectedOption === selectedOption
      );
      if (existingCartItem) {
        // 이미 장바구니에 있는 상품인 경우 수량 증가
        existingCartItem.quantity += action.payload.quantity;
      } else {
        // 장바구니에 새로운 상품 추가
        state.push(action.payload);
      }
    },

    updateCartItemQuantity: (state, action) => {
      // 장바구니 항목의 수량 업데이트 액션 처리
      const { itemId, selectedOption, quantity } = action.payload;
      const cartItem = state.find(
        (item) => item.id === itemId && item.selectedOption === selectedOption
      );
      if (cartItem) {
        // 해당 상품의 수량을 업데이트
        cartItem.quantity = quantity;
      }
    },

    deleteCartItem: (state, action) => {
      // 장바구니 항목 삭제 액션 처리
      const { itemId, selectedOption } = action.payload;
      return state.filter(
        (item) => !(item.id === itemId && item.selectedOption === selectedOption)
      );
      // 삭제할 항목을 제외한 나머지 장바구니 항목들을 반환하여 새로운 상태로 업데이트
    },
  },
});

export const { addToCart, deleteCartItem, updateCartItemQuantity } = cartReducer.actions;
export default cartReducer.reducer;
