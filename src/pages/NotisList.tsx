import React, { useState } from "react";
import styled from "styled-components";
import backImage from "../assets/images/back.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  margin: auto;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 타이틀을 중앙에 위치 */
  position: relative; /* BackButton을 왼쪽에 고정하기 위해 */
  height: 4.44rem;
  width: 100%;
  align-items: center;
  border-bottom: 0.5px solid #95989a;
`;

const BackButton = styled.button`
  border: none;
  cursor: pointer;
  position: absolute; /* Header의 왼쪽에 고정 */
  left: 2.37rem;
  padding: 0;
  background-color: #fff;
`;
const BackIcon = styled.img`
  width: 0.6875rem;
  height: 1rem;
`;

const Title = styled.h1`
  color: #14191e;
  text-align: center;
  justify-item: center;

  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem;
`;

const NotificationList = styled.div`
  flex: 1;
  overflow-y: auto;
`;
const NotificationItem = styled.div<{ isRead: boolean }>`
  padding: 1.25rem;
  background-color: ${({ isRead }) =>
    isRead ? "#f0f0f0" : "#fff"}; /* 확인 상태에 따라 배경색 변경 */
  &:hover {
    background-color: ${({ isRead }) =>
      isRead ? "#e0e0e0" : "#f9f9f9"}; /* 확인 상태에 따라 hover 스타일 변경 */
  }
`;
const NotificationTitle = styled.div`
  color: #888;
  text-align: left;
  margin-bottom: 8px;

  font-family: Pretendard;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const NotificationMessage = styled.div`
  color: #53575b;
  text-align: left;

  font-family: Pretendard;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Footer = styled.div`
  color: #53575b;

  font-family: Pretendard;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 4.38rem;
`;
export const notificationsMock = [
  {
    id: 1,
    title: "새해맞이 복권 미션 도착",
    message:
      "미션 참여 중인 포도님, 누르기만 하면 2일차 출석이 성공입니다! 지금 당장 눌러보세요오",
    date: "2024-12-31",
    isRead: false,
  },
  {
    id: 2,
    title: "새해맞이 복권 미션 도착",
    message:
      "미션 참여 중인 포도님, 누르기만 하면 2일차 출석이 성공입니다! 지금 당장 눌러보세요오",
    date: "2024-12-30",
    isRead: false,
  },
  {
    id: 3,
    title: "새해맞이 복권 미션 도착",
    message:
      "미션 참여 중인 포도님, 누르기만 하면 2일차 출석이 성공입니다! 지금 당장 눌러보세요오",
    date: "2024-12-29",
    isRead: false,
  },
  {
    id: 4,
    title: "새해맞이 복권 미션 도착",
    message:
      "미션 참여 중인 포도님, 누르기만 하면 2일차 출석이 성공입니다! 지금 당장 눌러보세요오",
    date: "2024-12-29",
    isRead: false,
  },
  {
    id: 5,
    title: "새해맞이 복권 미션 도착",
    message:
      "미션 참여 중인 포도님, 누르기만 하면 2일차 출석이 성공입니다! 지금 당장 눌러보세요오",
    date: "2024-12-29",
    isRead: false,
  },
  {
    id: 6,
    title:
      "새해맞이 복권 미션 도착ddddddddddddddddddddddddddddddddddddddddddddd",
    message:
      "미션 참여 중인 포도님, 누르기만 하면 2일차 출석이 성공입니다! 지금 당장 눌러보세요오",
    date: "2024-12-29",
    isRead: false,
  },
  {
    id: 7,
    title: "새해맞이 복권 미션 도착",
    message:
      "미션 참여 중인 포도님, 누르기만 하면 2일차 출석이 성공입니다! 지금 당장 눌러보세요오",
    date: "2024-12-29",
    isRead: false,
  },
  {
    id: 8,
    title: "새해맞이 복권 미션 도착",
    message:
      "미션 참여 중인 포도님, 누르기만 하면 2일차 출석이 성공입니다! 지금 당장 눌러보세요오",
    date: "2024-12-29",
    isRead: false,
  },
  {
    id: 9,
    title: "새해맞이 복권 미션 도착",
    message:
      "미션 참여 중인 포도님, 누르기만 하면 2일차 출석이 성공입니다! 지금 당장 눌러보세요오",
    date: "2024-12-29",
    isRead: false,
  },
];

const NotisList: React.FC = () => {
  const [notifications, setNotifications] = useState(notificationsMock);

  // 알림 클릭 시 확인 상태로 변경
  const handleNotificationClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => alert("뒤로가기")}>
          <BackIcon src={backImage} alt="뒤로가기" />
        </BackButton>
        <Title>알림</Title>
      </Header>
      <NotificationList>
        {notificationsMock.map((notification) => (
          <NotificationItem
            key={notification.id}
            isRead={notification.isRead}
            onClick={() => handleNotificationClick(notification.id)}
          >
            <NotificationTitle>{notification.title}</NotificationTitle>
            <NotificationMessage>{notification.message}</NotificationMessage>
          </NotificationItem>
        ))}
      </NotificationList>
      <Footer>알림은 30일 이후 순차적으로 지워집니다</Footer>
    </Container>
  );
};

export default NotisList;
