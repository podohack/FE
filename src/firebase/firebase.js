import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBao5B-WxhuWZTrDjMmDzi-eXzAZrO3pv8",
  authDomain: "pwa-push-notification-29c13.firebaseapp.com",
  projectId: "pwa-push-notification-29c13",
  storageBucket: "pwa-push-notification-29c13.appspot.com",
  messagingSenderId: "558407768885",
  appId: "1:558407768885:web:bf6b9f43e490366e7e8a7c",
  measurementId: "G-DYV52N72CN",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
