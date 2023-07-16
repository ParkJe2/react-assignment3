import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { addToCart, deleteCartItem, updateCartItemQuantity } from "../redux/cart";

export default function Product() {
  // 스토어에서 products와 cart 상태 가져오기
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  // url 파라미터에서 상품 id 가져오기
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // 옵션 선택
  const optionChangeHandler = (option) => {
    setSelectedOption(option);
  };

  // 수량 변경
  const quantityChangeHandler = (e) => {
    setQuantity(Number(e.target.value));
  };

  // 수량 증가
  const plusQuantity = () => {
    setQuantity(quantity + 1);
  };

  // 수량 감소
  const minusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // 장바구니 상품 추가
  const addToCartHandler = () => {
    if (!selectedOption) {
      alert("옵션을 선택해주세요");
      return;
    }

    const existingCartItem = cart.find(
      (item) => item.id === id && item.selectedOption === selectedOption
    );
    if (existingCartItem) {
      dispatch(updateCartItemQuantity({ itemId: id, selectedOption, quantity }));
    } else {
      const itemToAdd = {
        ...item,
        selectedOption,
        quantity,
      };
      dispatch(addToCart(itemToAdd));
    }
    // 장바구니 추가 후 옵션 및 수량값 초기화
    setSelectedOption("");
    setQuantity(1);
  };

  // 장바구니 항목 삭제
  const deleteCartItemHandler = (itemId, selectedOption) => {
    dispatch(deleteCartItem({ itemId, selectedOption }));
  };

  // id에 해당하는 상품 찾기
  const item = products.find((item) => item.id === id);
  if (!item) {
    // 상품이 존재하지 않을 경우 에러 처리
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  // 장바구니에 동일한 상품 옵션들을 필터링하여 가져오기
  const existingCartItems = cart.filter((cartItem) => cartItem.id === id);

  // 장바구니 내에서의 수량 변경
  const updateQuantityInCart = (itemId, selectedOption, quantity) => {
    dispatch(updateCartItemQuantity({ itemId, selectedOption, quantity }));
  };

  return (
    <>
      <div>
        <h1>상세 페이지</h1>
        <St.ItemBox>
          <St.Item>{item && item.name}</St.Item>
          <div>
            <h3>가격: {item && item.price}원</h3>
            <h3>좋아요: {item && item.likes}개</h3>
            <h3>구매옵션</h3>
            <St.Select
              value={selectedOption}
              onChange={(e) => {
                optionChangeHandler(e.target.value);
              }}
            >
              <option value="">구매옵션 선택</option>
              {item && item.options.map((option) => <option key={option}>{option}</option>)}
            </St.Select>
            {selectedOption && <p>구매 옵션 : {selectedOption}</p>}
            <input type="number" min="1" value={quantity} onChange={quantityChangeHandler} />
            <button onClick={minusQuantity}>-</button>
            <button onClick={plusQuantity}>+</button>
            <p>선택된 수량: {quantity}개</p>
            <p>총 금액 : {item.price * quantity}원</p>
            <button onClick={addToCartHandler}>장바구니 추가하기</button>
          </div>
        </St.ItemBox>
        <h1>장바구니</h1>

        {cart.map((cartItem) => (
          <St.CartBox
            key={cartItem.id + cartItem.selectedOption}
            style={{
              border: "1px solid black",
            }}
          >
            <St.CartIems>
              <h3>상품명 : {cartItem.name}</h3>
              <h3>옵션 : {cartItem.selectedOption}</h3>
              <h3>
                선택된 수량:{" "}
                <button
                  onClick={() =>
                    updateQuantityInCart(
                      cartItem.id,
                      cartItem.selectedOption,
                      cartItem.quantity - 1
                    )
                  }
                >
                  -
                </button>{" "}
                {cartItem.quantity}{" "}
                <button
                  onClick={() =>
                    updateQuantityInCart(
                      cartItem.id,
                      cartItem.selectedOption,
                      cartItem.quantity + 1
                    )
                  }
                >
                  +
                </button>
              </h3>
              <h3>총 금액 : {cartItem.price * cartItem.quantity}원</h3>
              <St.DelBtn
                onClick={() => deleteCartItemHandler(cartItem.id, cartItem.selectedOption)}
              >
                삭제
              </St.DelBtn>
            </St.CartIems>
          </St.CartBox>
        ))}
      </div>
    </>
  );
}

const St = {
  ItemBox: styled.div`
    display: flex;
    gap: 44px;
    justify-content: center;
    align-items: center;
  `,
  Item: styled.div`
    width: 200px;
    height: 240px;
    padding: 10px;
    color: white;
    background-color: #068fff;
  `,
  Select: styled.select`
    width: 100px;
  `,

  CartBox: styled.div`
    margin-bottom: 10px;
    margin-left: 5px;
  `,

  CartIems: styled.div`
    padding-left: 10px;
  `,
  DelBtn: styled.button`
    margin-bottom: 10px;
  `,
};
