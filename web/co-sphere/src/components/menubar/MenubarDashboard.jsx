import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { manageGetRecentSearches } from "../../common/manager/searchManager/SearchManager";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import { getUserFromLocalStorage } from "../../service/LocalStorageService";
import ClockIcon from "../icon/ClockIcon";
import MessageIcon from "../icon/MessageIcon";
import NotificationIcon from "../icon/NotificationIcon";
import SearchIcon from "../icon/SearchIcon";
import SearchInputMenubar from "../input/search/SearchInputMenubar";
import ProfileWidgetMenubar from "../widget/profile/ProfileWidgetMenubar";
import MessageMenubarDashboard from "./MessageMenubarDashboard";

const Wrapper = styled.div`
  z-index: 99 !important;
  height: 50px;
  width: inherit;
  background-color: ${Colors.justWhite};
  border-bottom: 1px solid ${Colors.greyOutlineShadow};
  border-left: 1px solid ${Colors.greyOutlineShadow};
  position: fixed;
`;
const dropDownAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px); 
    max-height: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0); 
    max-height: 300px; 
  }
`;
const appearAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const Overlay = styled.div`
  position: absolute;
  height: calc(100vh - 48px);
  z-index: 1;
  width: 100vw;
  background-color: #6a6a6a79;
  animation: ${appearAnimation} 0.2s;
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
const RecentSearchesContainer = styled.div`
  height: fit-content;
  padding: 20px;
  background-color: white;
  max-width: 700px;
  margin: 8px;
  border-radius: 12px;
  animation: ${dropDownAnimation} 0.6s;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 7px 29px 0px;
`;
const RecentSearchesTitle = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  span {
    font-size: ${FontSize.small};
    color: ${Colors.subtitleBlack};
    font-weight: 400;
  }
  border-bottom: solid 0.5px ${Colors.greyOutlineShadow};
`;
const RecentSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 45px;
  cursor: pointer;
  border-radius: 12px;
  padding: 0px 5px;
  span {
    font-size: ${FontSize.small};
    color: ${Colors.subtitleBlack};
    font-weight: 400;
  }
  &:hover {
    background-color: ${Colors.menuSelected};
    span {
      color: ${Colors.mainBlue};
    }
    svg {
      stroke: ${Colors.mainBlue} !important;
    }
  }
`;
const RecentSearches = styled.div`
  margin: 5px auto;
  gap: 5px;
  display: flex;
  flex-direction: column;
  animation: ${appearAnimation} 0.8s;
`;
const IconSearch = styled.div`
  svg {
    height: 12px !important;
    width: 12px !important;
    strokewidth: 1.5px;
    stroke: ${Colors.subtitleBlack} !important;
  }
`;
const Icon = styled.div`
  svg {
    height: 20px;
    width: 20px;
    strokewidth: 1px;
    stroke: ${Colors.subtitleBlack} !important;
  }
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
  const [showOverlay, setShowOverlay] = useState(false);
  const [searches, setSearches] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    async function getCurrentUser() {
      const user = await getUserFromLocalStorage();
      setUser(user);
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    async function getRecentSearches() {
      await manageGetRecentSearches(
        user._id,
        (searchData) => setSearches(searchData),
        () => setSearches(null)
      );
    }
    user && getRecentSearches();
  }, [user]);
  return (
    user && (
      <Wrapper>
        <Container>
          <SearchInputMenubar
            state={showOverlay}
            mouseEvent={(state) => {
              setShowOverlay(state);
            }}
          />
          <Right>
            <MessageIcon
              onClick={() => {
                navigate("/chat");
              }}
            />
            <NotificationIcon />
            <ProfileWidgetMenubar
              name={user.fullname}
              url={user.profileImage}
            />
          </Right>
        </Container>
        {showOverlay && (
          <Overlay
            onClick={() => {
              setShowOverlay(!showOverlay);
            }}
          >
            <RecentSearchesContainer
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <RecentSearchesTitle>
                <Icon>
                  <ClockIcon />
                </Icon>
                <span> Recent Searches</span>
              </RecentSearchesTitle>
              <RecentSearches>
                {searches &&
                  searches.map((search, key) => (
                    <RecentSearch
                      key={key}
                      onClick={() => {
                        navigate(`/search/${search.query}`);
                        setShowOverlay(false);
                      }}
                    >
                      <IconSearch>
                        <SearchIcon />
                      </IconSearch>
                      <span>{search.query}</span>
                    </RecentSearch>
                  ))}
              </RecentSearches>
            </RecentSearchesContainer>
          </Overlay>
        )}
        <MessageMenubarDashboard />
      </Wrapper>
    )
  );
}
