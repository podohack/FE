import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';

import profileImg from '../assets/images/smile_dog.png'; // 프로필 사진 경로
import backIcon from '../assets/images/left_arrow.png';
import moreOptionIcon from '../assets/images/vertical_3dots.png';

function ChatRoom() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const userId = query.get('userId');

    const [isUser, setIsUser] = useState(false);
    const [showDate, setShowDate] = useState([]); // showDate를 상태로 관리
    const [inputValue, setInputValue] = useState('');

    const messages = [
        {
            id: 1,
            userId: 1,
            sender: '김포도',
            text: '안녕하세요 반갑습니다 채팅입니다. 테스트입니다 테스트 테스트',
            timestamp: '오전 8:32',
            date: '2024년 12월 21일',
        },
        {
            id: 2,
            userId: 1,
            sender: '김포도',
            text: '안녕하세요 반갑습니다 채팅입니다. 테스트입니다 테스트 테스트',
            timestamp: '오전 8:32',
            date: '2024년 12월 22일',
        },
        {
            id: 3,
            userId: 2,
            sender: '나',
            text: '안녕하세요 반갑습니다 채팅임다.',
            timestamp: '오전 8:33',
            date: '2024년 12월 22일',
        },
    ];

    const handleBackIconClick = () => {
        navigate('/chatlist');
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const lefter = {
        icon: backIcon,
        text: null,
        clickFunc: handleBackIconClick
    };

    const center = {
        icon: null,
        text: "Podo-Hack",
        clickFunc: null
    };

    const righter = {
        icon: moreOptionIcon,
        text: null,
        clickFunc: null
    };

    useEffect(() => {
        // '나'라는 발신자가 있는지 확인하고 상태 업데이트
        const userMessageExists = messages.some(msg => msg.sender === '나');
        setIsUser(userMessageExists);

        // showDate 계산
        const datesToShow = messages.map((msg, index) => {
            // 첫 번째 메시지이거나 이전 메시지와 날짜가 다를 경우에만 true
            return index === 0 || (messages[index - 1].date !== msg.date);
        });

        // showDate가 변경될 때만 상태 업데이트
        if (JSON.stringify(datesToShow) !== JSON.stringify(showDate)) {
            setShowDate(datesToShow);
        }

        console.log("showDate: ", showDate);
    }, [messages, showDate]); // messages가 변경될 때마다 실행

    return (
        <ChatContainer>
            <TopNav
                lefter={lefter}
                center={center}
                righter={righter}
            />

            <MessageList>
                {messages.map((msg, index) => {
                    const isCurrentUser = msg.userId === 2; // 발신자 확인

                    return (
                        <React.Fragment key={index}>
                            {showDate[index] && (
                                <DateDivider>{msg.date}</DateDivider>
                            )}

                            <Message isUser={isCurrentUser}>
                                {!isCurrentUser ? <ProfileImage src={profileImg} alt={msg.sender} /> : <div style={{ width: '15px' }}></div>}

                                <MsgContainer>
                                    {!isCurrentUser && <SenderName>{msg.sender}</SenderName>}
                                    <MessageContainer isUser={isCurrentUser}>
                                        <MessageContent isUser={isCurrentUser}> {msg.text} </MessageContent>
                                        <MessageTimestamp >{msg.timestamp}</MessageTimestamp>
                                    </MessageContainer>
                                </MsgContainer>

                            </Message>

                        </React.Fragment>
                    );
                })}
            </MessageList>

            <InputContainer>
                <Input
                    placeholder="메시지를 입력해 주세요."
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <SendButton isActive={inputValue.length > 0}>전송</SendButton>
            </InputContainer>

        </ChatContainer>
    );
}

export default ChatRoom;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;

    background: #FFF;
`;

const MessageList = styled.div`
    flex: 1;
    overflow-y: auto;
    margin: 10px 0;
`;

const DateDivider = styled.div`
display: flex;
justify-content:center;
align-items: center;

width: 106px;
height: 20px;
border-radius: 18px;
background: #CFCFCF;

margin: 10px auto;

color: #53575B;
text-align: center;
font-family: Pretendard;
font-size: 10px;
font-style: normal;
font-weight: 600;
line-height: normal;
`;

const Message = styled.div`
display: flex;
flex-direction: ${({ isUser }) => (isUser ? 'row-reverse' : 'row')};
align-items: flex-start;

margin-bottom: 34px;
`;

const ProfileImage = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;

margin: 0 10px;
`;

const MsgContainer = styled.div`
display: flex;
flex-direction: column;
`;

const SenderName = styled.div`
margin-bottom: 10px;

color: #14191E;
font-family: Pretendard;
font-size: 13px;
font-style: normal;
font-weight: 600;
line-height: normal;
letter-spacing: 0.26px;
`;


const MessageContainer = styled.div`
display: flex;
flex-direction: ${({ isUser }) => (isUser ? 'row-reverse' : 'row')};
align-items: flex-end;

width: 100%;

gap: 10px;
`;

const MessageContent = styled.div`
width: 65%;
background: ${({ isUser }) => (isUser ? '#d1f0d1' : 'blue')};
background: #53575B;
border-radius: ${({ isUser }) => (isUser ? '18px 0px 18px 18px;' : '0px 18px 18px 18px;')};
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

padding: 10px;

color: #FFF;
font-family: Pretendard;
font-size: 13px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const MessageTimestamp = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
text-align: right;

height: 100%;
flex: 0 1 auto;

color: #53575B;
font-family: Pretendard;
font-size: 10px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const InputContainer = styled.div`
display: flex;
align-items: center;
position: fixed; 
bottom: 0px; 
left: 0;
right: 0;
    
width: calc(100% - 40px);
background: #FFF;
border-top: 0.5px solid #95989A;

padding: 15px 20px;
`;

const Input = styled.input`
flex: 1; 
padding: 15px;
border: none;
margin-right: 10px;
border-radius: 10px;
background: #E5E5E5;

outline: none;
&:focus {
    border: none; /* 포커스 시 테두리 제거 */
    outline: none; /* 포커스 시 외곽선 제거 */
}
`;

const SendButton = styled.button`
width: 63px;
height: 45px;
border-radius: 10px;
background: ${({ isActive }) => (isActive ? '#53575B' : 'rgba(83, 87, 91, 0.50)')}; /* 조건부 배경색 */

color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 13px;
font-style: normal;
font-weight: 600;
line-height: normal;
letter-spacing: 0.26px;
`;