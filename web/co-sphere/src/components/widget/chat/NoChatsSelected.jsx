import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import MessageIcon from "../../icon/MessageIcon";

const Wrapper = styled.div`
  height: 100%;
  font-size: ${FontSize.mediumLarge};
  text-align: center;
  color: ${Colors.subtitleBlack};
`;
const Content = styled.div`
  height: calc(100% - 80px);
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  svg {
    height: 80px !important;
    width: 80px !important;
    stroke: ${Colors.subtitleBlack};
  }
`;

function NoChatsSelected() {
  return (
    <Wrapper>
      <Content>
        <MessageIcon />
        You have not selected a chat to view.
        <br />
        Please select or create a new chat.
      </Content>
    </Wrapper>
  );
}

export default NoChatsSelected;
