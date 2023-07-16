import React from "react";
import { Link } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

function Layout() {
  const navigate = useNavigate();
  return (
    <St.Body>
      <St.Header>
        {/* 페이지 이동 방법 골고루 사용해보기 위해 useNavigate 사용 */}
        <St.Logo
          onClick={() => {
            navigate("/");
          }}
        >
          로고
        </St.Logo>
        <St.HeaderContent>
          {/* 페이지 이동 방법 골고루 사용해보기 위해 Link 사용 */}
          <St.Link to="/Login">로그인</St.Link>
          {/* 페이지 이동 방법 골고루 사용해보기 위해 useNavigate 사용 */}
          <St.SignUp
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입
          </St.SignUp>
        </St.HeaderContent>
      </St.Header>
      <Outlet />
      <St.Footer>
        <div>문의하기</div>
        <div>SNS 채널들</div>
      </St.Footer>
    </St.Body>
  );
}

export default Layout;

const St = {
  Body: styled.div`
    min-height: 100vh;
    position: relative;
    padding-bottom: 90px;
    box-sizing: border-box;
  `,

  Header: styled.header`
    display: flex;
    justify-content: space-between;
    padding: 24px;
    background-color: #000000;
    color: white;
  `,
  Logo: styled.div`
    cursor: pointer;
  `,

  HeaderContent: styled.div`
    display: flex;
    gap: 12px;
  `,
  Link: styled(Link)`
    text-decoration: none;
    color: #fff;
  `,
  SignUp: styled.div`
    cursor: pointer;
  `,
  Footer: styled.footer`
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    padding: 24px;
    background-color: #eeeeee;
    color: black;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
  `,
};
