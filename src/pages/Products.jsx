import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import { sortByPrice, reset } from "../redux/products";

export default function Products() {
  // 스토어에서 products 상태 가져오기
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  // useSearchParams 훅을 사용하여 현재 URL의 쿼리 매개변수 관리
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <St.List>
        <h2>🔥 여름 추천템 🔥</h2>
        <button
          onClick={() => {
            dispatch(sortByPrice());
          }}
        >
          가격순으로 정렬
        </button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => {
            dispatch(reset());
          }}
        >
          리셋
        </button>
        <St.ListBox>
          {products.map((item) => (
            <Link to={`/products/${item.id}`} key={item.name}>
              <St.ListItem>
                <St.ItemContents>이름: {item.name}</St.ItemContents>
                <St.ItemContents>가격: {item.price}원</St.ItemContents>
              </St.ListItem>
            </Link>
          ))}
        </St.ListBox>
      </St.List>
    </>
  );
}

const St = {
  List: styled.section`
    margin-top: 56px;
    text-align: center;
  `,
  ListBox: styled.div`
    gap: 24px;
    display: flex;
    margin-top: 10px;
    justify-content: center;
  `,
  ListItem: styled.div`
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
};
