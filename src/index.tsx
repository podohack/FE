import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { subscribeToPush } from "./components/subscribeToPush.ts";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.ts";
import reportWebVitals from "./reportWebVitals.ts";
import {
  requestPermissionAndGetToken,
  onForegroundMessage,
} from "./firebase/messaging.ts";

import ChatList from "./pages/ChatList.tsx";
import ChatRoom from "./pages/ChatRoom.tsx";
import Login from "./pages/Login.tsx";
import NotisList from "./pages/NotisList.tsx";

import "./index.css";
import "./styles/text.css";
import "./styles/color.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/noticelist" element={<NotisList />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

if ("Notification" in window) {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      subscribeToPush(); // 알림 권한 허용 시 푸시 구독 실행
    } else {
      console.log("푸시 알림 권한이 거부되었습니다.");
    }
  });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js") // 서비스 워커 등록
    .then((registration) => {
      console.log("[Service Worker] 서비스 워커 등록 완료:", registration);
    })
    .catch((error) => {
      console.error("[Service Worker] 서비스 워커 등록 실패:", error);
    });
}

// FCM 토큰 요청 및 권한 확인
requestPermissionAndGetToken();

// 포그라운드 메시지 처리
onForegroundMessage();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
