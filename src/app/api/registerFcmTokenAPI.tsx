import axios from "axios";
import { SERVER_URL } from "../../constants/ServerURL.js";

interface RegisterFcmTokenResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const registerFcmToken = async (
  userId: number,
  token: string
): Promise<RegisterFcmTokenResponse> => {
  try {
    const response = await axios.post<RegisterFcmTokenResponse>(
      `${SERVER_URL}/notification/register`,
      null, // Body가 필요 없으므로 null
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          id: userId,
          token: token,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "FCM 토큰 등록 중 오류 발생:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data || "FCM 토큰 등록 실패");
  }
};
