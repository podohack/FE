//백그라운드에서 수신된 메시지를 처리
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Firebase configuration
firebase.initializeApp({
  apiKey: "AIzaSyBao5B-WxhuWZTrDjMmDzi-eXzAZrO3pv8",
  authDomain: "pwa-push-notification-29c13.firebaseapp.com",
  projectId: "pwa-push-notification-29c13",
  storageBucket: "pwa-push-notification-29c13.appspot.com",
  messagingSenderId: "558407768885",
  appId: "1:558407768885:web:bf6b9f43e490366e7e8a7c",
  measurementId: "G-DYV52N72CN",
});

const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] 백그라운드 메시지 수신:", payload);

  const notificationTitle = payload.notification?.title || "Default Title";
  const notificationOptions = {
    body: payload.notification?.body || "Default Body",
    icon: payload.notification?.icon || "/default-icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener("push", function (e) {
//   if (!e.data.json()) return;
//   const resultData = e.data.json().notification;
//   const notificationTitle = resultData.title;
//   const notificationOptions = {
//     body: resultData.body,
//   };
//   console.log(resultData.title, {
//     body: resultData.body,
//   });
//   e.waitUntil(
//     self.registration.showNotification(notificationTitle, notificationOptions)
//   );
// });
