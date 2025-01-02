import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import ChatPerson from '../components/button/ChatPerson.tsx';

import profileImg from '../assets/images/smile_dog.png'

function ChatList() {

  const lefter = {
    icon: null,
    text: "채팅 목록",
    clickFunc: null
  };

  const personInfo = {
    userId: 1,
    name: "김포도",
    profilePicture: profileImg
  };

  const recentChatInfo = {
    unreadCnt: 2,
    recentMsg: "음하하",
    recentMsgTime: "2025.01.01"
  }

  return (
    <div>
      <TopNav
        lefter={lefter}
        center={null}
        righter={null}
      />

      <ChatPersonList>
        <Link to={`/chatroom?userId=1`} style={{ textDecoration: 'none' }}>
          <ChatPerson
            personInfo={personInfo}
            recentChatInfo={recentChatInfo}
          />
        </Link>
      </ChatPersonList>

    </div>
  );
}

export default ChatList;

const ChatPersonList = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

gap: 10px;
padding: 20px;

`;