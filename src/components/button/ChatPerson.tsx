import React from "react";
import styled from "styled-components";

const ChatPerson = ({ personInfo, recentChatInfo }) => {


    return (
        <PersonContainer>
            <ProfileImage src={personInfo?.profilePicture} alt="Profile" />

            <InfoContainer>
                <InfoTopContainer>
                    <Name>{personInfo.name}</Name>
                    {recentChatInfo?.unreadCnt > 0 && (
                        <UnreadCount>{recentChatInfo.unreadCnt}</UnreadCount>
                    )}
                </InfoTopContainer>

                <InfoBotContainer>
                    <RecentMessage>{recentChatInfo?.recentMsg}</RecentMessage>
                    <RecentMessageTime>{recentChatInfo?.recentMsgTime}</RecentMessageTime>
                </InfoBotContainer>
            </InfoContainer>
        </PersonContainer>
    );
};

export default ChatPerson;

const PersonContainer = styled.div`
display: flex;
justify-content: space-around;
align-items: center;

width: 318px;
height: 35px;
border-radius: 10px;
background: #E5E5E5;

gap: 10px;
padding: 15px;

user-select: none; /* 텍스트 선택 방지 */
-webkit-user-select: none; /* Safari에서 드래그 방지 */
-moz-user-select: none; /* Firefox에서 드래그 방지 */
`;

const ProfileImage = styled.img`
width: 46px;
height: 46px;
`;

const InfoContainer = styled.div`
flex: 1; /* 남은 공간을 차지하도록 */
display: flex;
flex-direction: column;

gap: 6px;
`;

const InfoTopContainer = styled.div`
display: flex;
justify-content: left;
align-items: center;

gap: 6px;
`;

const InfoBotContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

`;

const Name = styled.span`
color: #14191E;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: normal;
letter-spacing: 0.28px;
`;

const RecentMessage = styled.span`
color: #53575B;
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const RecentMessageTime = styled.span`
color: #53575B;
text-align: right;
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const UnreadCount = styled.div`
display: flex;
align-items: center;
justify-content: center;

width: 15px;
height: 15px;
border-radius: 50%;
background-color: #53575B; /* 빨간색 배경 */

color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 10px;
font-style: normal;
font-weight: 600;
line-height: normal;
`;