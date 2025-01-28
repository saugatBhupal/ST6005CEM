import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import MessageIcon from "../icon/MessageIcon";
import NotificationIcon from "../icon/NotificationIcon";
import SearchInputMenubar from "../input/search/SearchInputMenubar";
import ProfileWidgetMenubar from "../widget/profile/ProfileWidgetMenubar";
import MessageMenubarDashboard from "./MessageMenubarDashboard";

const Wrapper = styled.div`
  z-index: 99 !important;
  height: 60px;
  width: inherit;
  background-color: ${Colors.justWhite};
  border-bottom: 1px solid ${Colors.greyOutlineShadow};
  border-left: 1px solid ${Colors.greyOutlineShadow};
  position: fixed;
`;
const Container = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Right = styled.div`
  background-color: transparent;
  display: flex;
  width: 200px;
  justify-content: space-between;
  margin-right: 60px;
`;

const BrowseIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    height: 24px;
    width: 24px;
  }
  &:hover {
    svg {
    }
  }
  svg {
    fill: ${Colors.mainBlue};
  }
`;
export default function MenubarDashboard() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Container>
        <SearchInputMenubar />
        <Right>
          <MessageIcon
            onClick={() => {
              navigate("/chat");
            }}
          />
          <NotificationIcon></NotificationIcon>
          <ProfileWidgetMenubar />
        </Right>
      </Container>
      <MessageMenubarDashboard />
    </Wrapper>
  );
}
