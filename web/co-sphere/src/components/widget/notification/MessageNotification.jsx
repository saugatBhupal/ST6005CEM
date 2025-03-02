import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import { calculateTimeDifference } from "../../../utils/date/CalculateTimeDifference";
import { convertToTime } from "../../../utils/date/ConvertToTime";
import SendMessageIcon from "../../icon/SendMessageIcon";

const Wrapper = styled.div`
  border-bottom: 1px solid ${Colors.greyOutlineShadow};
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: ${Colors.menuSelected};
  }
`;
const Container = styled.div`
  padding: 20px 20px;
  font-size: ${FontSize.medium};
  color: ${Colors.subtitleBlack};
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  font-weight: 200;
  width: 100%;
  b {
    font-weight: 400;
    color: ${Colors.justBlack};
    margin-right: 4px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const Left = styled.div`
  margin-right: 5px;
`;
const Right = styled.div`
  width: 100%;
`;
const Time = styled.div`
  font-size: ${FontSize.extraSmall};
  color: ${Colors.subtitleBlack};
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
`;
const MessageContainer = styled.div`
  font-size: ${FontSize.small};
  color: ${Colors.justBlack};
  padding: 20px;
  border-radius: 8px;
  background-color: ${Colors.menuSelected};
  margin-top: 10px;
  margin-left: calc(40px);
`;
function MessageNotification({ notification }) {
  const navigate = useNavigate();
  return (
    <Wrapper
      onClick={() => {
        navigate("/chat");
      }}
    >
      <Container>
        <Flex>
          <Left>
            <SendMessageIcon />
          </Left>
          <Right>
            <Row>
              <b>{notification.data} </b>
            </Row>
            <Time>
              {convertToTime(notification.date)}
              <div>{calculateTimeDifference(notification.date)}</div>
            </Time>
          </Right>
        </Flex>
        <MessageContainer>{notification.chatData}</MessageContainer>
      </Container>
    </Wrapper>
  );
}

export default MessageNotification;
