import axios from "axios";
import { mockLoginResponse, mockUsers } from "./mockData.ts"; // mockData 파일 import
import { SERVER_URL } from "../../constants/ServerURL.js";

interface LoginRequest {
  username: string;
}

interface LoginSuccessResponse {
  code: 200;
  data: {
    Authorization: string;
    username: string;
  };
}

interface LoginFailureResponse {
  code: 400;
  data: string;
}

type LoginResponse = LoginSuccessResponse | LoginFailureResponse;

export const login = async (
  credentials: LoginRequest,
  useMock: boolean = false // Mock 사용 여부 플래그
): Promise<LoginResponse> => {
  if (useMock) {
    console.log("Mock data 사용");
    // Mock 유저 검색
    const user = mockUsers.find((u) => u.username === credentials.username);

    if (user) {
      return Promise.resolve(mockLoginResponse as LoginResponse);
    } else {
      return Promise.resolve({
        code: 400,
        data: "존재하지 않는 아이디 입니다.",
      });
    }
  }

  try {
    const response = await axios.post<LoginResponse>(
      `${SERVER_URL}/auth/signin`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "로그인 요청 중 오류 발생:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data || "로그인 요청 실패");
  }
};
