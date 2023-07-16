import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function Main() {
  const products = useSelector((state) => state.products);
  return (
    <main>
      {/* 케러셀 */}
      <St.Carousel>케러셀</St.Carousel>
      {/* 여름 추천템 */}
      <St.List>
        <h2>🔥 여름 추천템 🔥</h2>
        <Link to="/products">
          <St.ViewMoreButton>더보기</St.ViewMoreButton>
        </Link>
        <St.ListBox>
          {products.map((item) => (
            <St.FirstListItem key={item.id}>
              <St.ItemContents>{item.name}</St.ItemContents>
              <St.ItemContents>{item.price}원</St.ItemContents>
            </St.FirstListItem>
          ))}
        </St.ListBox>
      </St.List>
      {/* 추가적인 데이터 */}
      <St.List>
        <h2>🔥 세일 상품 🔥</h2>
        <St.ListBox>
          <St.SecondListItem>상품1</St.SecondListItem>
          <St.SecondListItem>상품2</St.SecondListItem>
          <St.SecondListItem>상품3</St.SecondListItem>
        </St.ListBox>
      </St.List>
    </main>
  );
}

const St = {
  Carousel: styled.section`
    background-color: #4e4feb;
    color: white;
    height: 300px;
    line-height: 300px;
    text-align: center;
    font-size: 24px;
  `,
  List: styled.section`
    margin-top: 56px;
    text-align: center;
  `,
  ViewMoreButton: styled.button`
    margin-bottom: 16px;
  `,
  ListBox: styled.div`
    display: flex;
    justify-content: center;
    gap: 24px;
  `,
  FirstListItem: styled.div`
    width: 200px;
    height: 240px;
    background-color: #068fff;
    padding: 16px;
    color: white;
    display: flex;
    flex-direction: column;
  `,

  ItemContents: styled.p`
    margin: 0px;
  `,

  SecondListItem: styled.div`
    width: 200px;
    height: 240px;
    background-color: #eeeeee;
  `,
};
