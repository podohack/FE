import axios from 'axios';

// 기본 Axios 설정
const apiClient = axios.create({
    baseURL: 'http://localhost:{PORT}',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Authorization 토큰 추가
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// WebSocket 연결
export const connectChatSocket = (PORT: number) => {
    const socket = new WebSocket(`ws://localhost:${PORT}/chats`);

    // WebSocket 이벤트 핸들러
    socket.onopen = () => {
        console.log("WebSocket connection established.");
    };

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
        console.log("WebSocket connection closed.");
    };

    return socket;
};

// ENTER 메시지 전송
export const sendEnterMessage = (socket: WebSocket, chatRoomId: string, username: string) => {
    socket.send(
        JSON.stringify({
            type: 'ENTER',
            payload: { chatRoomId, username },
        })
    );
};

// TALK 메시지 전송
export const sendTalkMessage = (socket: WebSocket, chatRoomId: string, username: string, message: string) => {
    socket.send(
        JSON.stringify({
            type: 'TALK',
            payload: { chatRoomId, username, message },
        })
    );
};

// EXIT 메시지 전송
export const sendExitMessage = (socket: WebSocket, chatRoomId: string, username: string) => {
    socket.send(
        JSON.stringify({
            type: 'EXIT',
            payload: { chatRoomId, username },
        })
    );
};

export default apiClient;