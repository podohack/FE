import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { login } from "../app/api/loginApi.tsx";
import { registerFcmToken } from "../app/api/registerFcmTokenAPI.tsx";
import {
  requestPermissionAndGetToken,
  onForegroundMessage,
} from "../firebase/messaging.ts";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e5e5e5;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  color: #14191e;
  margin-bottom: 5.63rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 22.0625rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const InputGroup = styled.div<{ isFocused: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 0.9375rem;
  background-color: #fff;
  padding: 1.0625rem 1.25rem;
  border-radius: 0.625rem;
  align-items: center;
  border: 2px solid ${({ isFocused }) => (isFocused ? "#A7A7A7" : "#ddd")};
`;

const Input = styled.input`
  font-family: Pretendard;
  border: none;
  font-size: 0.9375rem;
  width: 80%;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.01875rem;
  color: #95989a;
`;

const Option = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  justify-content: right;
  align-items: center;
  text-align: center;
  color: #53575b;
  margin-right: 0.63rem;
  margin-top: 1.25rem;
  font-family: Pretendard;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  a {
    color: #53575b;
    font-family: Pretendard;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration: none;
  }
`;

const Button = styled.button<{ isActive: boolean }>`
  height: 3.25rem;
  margin-top: 1.25rem;
  border-radius: 0.625rem;
  background: #53575b;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.01875rem;

  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background-color: rgb(6, 31, 59);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
  color: #53575b;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #53575b;
  }

  &::before {
    margin-right: 1.19rem;
  }

  &::after {
    margin-left: 1.19rem;
  }
`;

const KakaoButton = styled(Button)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 1.25rem;
  background-color: #fee500;
  justify-content: center;
  align-items: center;

  color: #3c1e1e;
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.01875rem;

  &:hover {
    background-color: #fdd835;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  color: #53575b;

  color: #53575b;

  font-family: Pretendard;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  margin-top: 7.5rem;

  a {
    color: #53575b;

    font-family: Pretendard;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.01625rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const isButtonActive = username.length > 0 && password.length > 0;
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ username }, true); // true로 Mock 활성화

      if (response.code === 200) {
        alert("로그인 성공!");
        console.log("토큰:", response.data.Authorization);

        // FCM 토큰 발급
        const fcmToken = await requestPermissionAndGetToken();
        if (fcmToken) {
          try {
            // FCM 토큰 등록 요청
            const registerResponse = await registerFcmToken(
              Number(response.data.username), // 여기에 userId 또는 username을 변환
              fcmToken
            );
            if (registerResponse.success) {
              console.log("FCM 토큰 등록 성공:", registerResponse.message);
            } else {
              console.error("FCM 토큰 등록 실패:", registerResponse.error);
            }
          } catch (error) {
            console.error("FCM 토큰 등록 요청 실패:", error.message);
          }
        } else {
          console.warn("FCM 토큰을 가져올 수 없습니다.");
        }

        // 포그라운드 메시지 처리
        onForegroundMessage();
        navigate("/chatlist"); // 로그인 성공 후 이동할 경로
      } else {
        alert(response.data); // 실패 메시지 출력
      }
    } catch (error) {
      console.error("로그인 오류:", error.message);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup isFocused={isUsernameFocused}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="12"
              viewBox="0 0 17 12"
              fill="none"
            >
              <path
                d="M1 11V1H16V11H1Z"
                stroke="#95989A"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 1L8.5 7.66667L16 1"
                stroke="#95989A"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 11L6 6"
                stroke="#95989A"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 11L11 6"
                stroke="#95989A"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <Input
              type="email"
              id="email"
              maxLength={30}
              value={username}
              onFocus={() => setIsUsernameFocused(true)}
              onBlur={() => setIsUsernameFocused(false)}
              onChange={handleEmailChange}
              placeholder="이메일을 입력해주세요."
              required
            />
          </InputGroup>
          <InputGroup isFocused={isPasswordFocused}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
            >
              <path
                d="M4.66541 6.81818H1V7.1352V17H16V6.81818H12.3346M4.66541 6.81818V4.11422C4.66541 3.25641 5.43233 1 8.5 1C10.4173 1 12.3346 2.05548 12.3346 4.11422V6.81818M4.66541 6.81818H12.3346"
                stroke="#95989A"
                stroke-width="1.2"
                stroke-linejoin="round"
              />
            </svg>
            <Input
              type="password"
              id="password"
              value={password}
              maxLength={3}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력해주세요."
              required
            />
          </InputGroup>
        </FormGroup>

        <Option>
          <a href="/find-id">아이디 찾기</a> |
          <a href="/find-password">비밀번호 찾기</a>
        </Option>

        <Button type="submit" isActive={isButtonActive} onClick={handleSubmit}>
          로그인
        </Button>
        <Divider>또는</Divider>
        <KakaoButton isActive={true}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="16"
            viewBox="0 0 19 16"
            fill="none"
          >
            <path
              d="M9.49831 0C4.73538 0 0 3.02228 0 6.73676C0 9.18557 2.49989 11.3809 5.17936 12.5758V16L9.792 13.4693C14.4193 13.3489 19 10.3746 19 6.73676C19 3.02228 14.2612 0 9.49831 0Z"
              fill="#14191E"
            />
          </svg>
          카카오톡으로 로그인
        </KakaoButton>
      </Form>
      <Footer>
        아직 회원이 아니신가요? <a href="/signup">회원가입</a>
      </Footer>
    </Container>
  );
};

export default Login;
