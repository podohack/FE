import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "./firebase";

const messaging = getMessaging(firebaseApp);

export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const token = await getToken(messaging, {
        vapidKey:
          "BABZCQsGAiRqSsv6OL29g6CTSxMd766HpQcZcvrJe1YqnsOaJ2yP_fHfXq-VlujLOnyDS04fEkkn0NeQ3eyp7eQ",
      });
      if (token) {
        console.log("FCM Token:", token);
        // 서버로 토큰 전송 가능
      } else {
        console.log("No registration token available.");
      }
    } else {
      console.error("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

export const onForegroundMessage = () => {
  onMessage(messaging, (payload) => {
    console.log("포그라운드 메시지 수신:", payload);

    // 알림 데이터
    const { title, body, icon } = payload.notification || {};

    // 브라우저 알림 표시
    if (Notification.permission === "granted") {
      new Notification(title || "Default Title", {
        body: body || "Default Body",
        icon: icon || "/default-icon.png",
      });
    } else {
      console.error("알림 권한이 없습니다.");
    }
  });
};
