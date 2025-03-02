import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { manageGetNotifications } from "../../../common/manager/userManager/UserManager";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import SpinnerWidget from "../../loading/SpinnerWidget";
import MessageNotification from "./MessageNotification";
import NotificationBottomSection from "./NotificationBottomSection";

const Wrapper = styled.div`
  width: calc(100% - 10px);
  height: calc(100vh - 195px);
  background-color: white;
  border: 1px solid ${Colors.greyOutlineShadow};
  border-radius: 18px;
`;
const TopBar = styled.div`
  height: 50px;
  width: 100%;
  border-bottom: 1px solid ${Colors.greyOutlineShadow};
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  height: inherit;
  margin: auto 20px;
`;
const Title = styled.div`
  font-size: ${FontSize.medium};
  color: ${Colors.subtitleBlack};
`;
const Content = styled.div`
  height: 100%;
  overflow-y: scroll;
`;
const Bottom = styled.div`
  height: 50px;
  width: 100%;
`;
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const NotFound = styled.div`
  text-align: center;
  height: 200px;
  padding-top: 100px;
  font-size: ${FontSize.small};
  color: ${Colors.subtitleBlack};
`;
function NotificationWidget() {
  const [notifications, setNotifications] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState();

  useEffect(() => {
    async function getNotfications() {
      await manageGetNotifications(
        (notifications) => {
          setNotifications(notifications.notifications);
        },
        () => {
          setNotifications(null);
        }
      );
      setLoading(false);
    }
    getNotfications();
  }, [reload]);
  return (
    <Wrapper>
      <Container>
        <TopBar>
          <Flex>
            <Title>Notifications</Title>
          </Flex>
        </TopBar>
        <Content>
          {loading && <SpinnerWidget />}
          {notifications &&
            notifications.map((notification) => {
              if (notification.notificationType === "Chat") {
                return <MessageNotification notification={notification} />;
              } else if (notification.notificationType === "Project") {
              }
            })}

          {notifications && notifications.length < 1 ? (
            <NotFound>All clear here</NotFound>
          ) : (
            <></>
          )}
          {/* <ContentNotification />
          <MessageNotification />
          <JobNotification />
          <ContentNotification />
          <MessageNotification /> */}
        </Content>
        <Bottom>
          <NotificationBottomSection setReload={setReload} />
        </Bottom>
      </Container>
    </Wrapper>
  );
}

export default NotificationWidget;
