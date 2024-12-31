import React from "react";

const PushNotification: React.FC = () => {
  // 알림 권한 요청
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("이 브라우저는 알림을 지원하지 않습니다.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      alert("알림 권한이 허용되었습니다!");
      showNotification();
    } else {
      alert("알림 권한이 거부되었습니다.");
    }
  };

  // 알림 표시
  const showNotification = () => {
    if ("Notification" in window) {
      new Notification("테스트 알림", {
        body: "푸시 알림이 성공적으로 작동합니다!",
        icon: "/logo192.png",
      });
    }
  };

  return (
    <div>
      <h2>푸시 알림 설정</h2>
      <button onClick={requestNotificationPermission}>알림 권한 요청</button>
    </div>
  );
};

export default PushNotification;
