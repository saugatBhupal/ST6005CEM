import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import ProfileIcon from "../../icon/ProfileIcon";

const Wrapper = styled.div`
  border-bottom: 1px solid ${Colors.greyOutlineShadow};
  width: 100%;
`;
const Container = styled.div`
  padding: 20px 10px;
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
  font-size: ${FontSize.small};
  color: ${Colors.subtitleBlack};
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
`;
function MessageNotification() {
  return (
    <Wrapper>
      <Container>
        <Flex>
          <Left>
            <ProfileIcon height={"40px"} />
          </Left>
          <Right>
            <Row>
              <b>Leslie Alexander </b> messaged you
            </Row>
            <Time>
              Friday 3:12 PM
              <div>1h</div>
            </Time>
          </Right>
        </Flex>
      </Container>
    </Wrapper>
  );
}

export default MessageNotification;
