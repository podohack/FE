import axios from "axios";

const BASE_URL = "http://localhost:8080";

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
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/auth/signin`,
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
