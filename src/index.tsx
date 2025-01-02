import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration.ts';
import reportWebVitals from './reportWebVitals.ts';

import ChatList from './pages/ChatList.tsx';
import ChatRoom from './pages/ChatRoom.tsx';

import './index.css';
import './styles/text.css'
import './styles/color.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
