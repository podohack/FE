import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "./firebase.js";

const messaging = getMessaging(firebaseApp);

const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한이 허용되었습니다.");
      return true;
    } else if (permission === "denied") {
      console.warn("알림 권한이 거부되었습니다.");
    } else {
      console.info("사용자가 알림 권한을 결정하지 않았습니다.");
    }
    return false;
  } catch (error) {
    console.error("알림 권한 요청 중 오류 발생:", error);
    return false;
  }
};

export const requestPermissionAndGetToken = async () => {
  try {
    const hasPermission = await requestNotificationPermission();
    if (hasPermission) {
      console.log("Notification permission granted.");
      const token = await getToken(messaging, {
        vapidKey:
          "BABZCQsGAiRqSsv6OL29g6CTSxMd766HpQcZcvrJe1YqnsOaJ2yP_fHfXq-VlujLOnyDS04fEkkn0NeQ3eyp7eQ",
      });
      if (token) {
        console.log("FCM Token:", token);
        return token;
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

export const onForegroundMessage = (): void => {
  onMessage(messaging, (payload) => {
    console.log("포그라운드 메시지 수신:", payload);

    // 알림 데이터
    const { title, body, icon } = payload.notification || {};

    // 브라우저 알림 표시
    if (Notification.permission === "granted") {
      try {
        console.log("알림 권한이 허용되었습니다.");
        new Notification(title || "Default Title", {
          body: body || "Default Body",
          icon: icon || "/favicon.ico",
        });
        console.log("푸시 알림 표시 성공");
      } catch (error) {
        console.log("푸시 알림 표시 실패");
      }
    } else {
      console.error(
        "알림 권한이 없습니다. 브라우저 설정에서 알림을 허용해주세요."
      );
    }
  });
};
