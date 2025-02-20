import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BasicWidgetTitleBlock from "../../components/textBlocks/BasicWidgetTitleBlock";
import { Colors } from "../../constants/Colors";
import { getUserIdFromLocalStorage } from "../../service/LocalStorageService";
import LoggedInUserLayout from "../common/LoggedInUserLayout";
import SearchResultsSection from "./SearchResultsSection";
import SearchTypes from "./SearchTypes";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  height: 100%;
  display: flex;
`;
const Left = styled.div`
  width: 250px;
  border-right: 0.5px solid ${Colors.greyOutlineShadow};
`;
const Right = styled.div`
  flex: 1;
  width: auto;
`;
const Padding = styled.div`
  padding: 20px;
  padding-left: -10px;
  div {
    margin-left: 0px;
  }
`;
function SearchResultsPage() {
  const [type, setType] = useState("user");
  const [userId, setUserId] = useState();
  const { query } = useParams();

  useEffect(() => {
    async function getUserId() {
      const userId = await getUserIdFromLocalStorage();
      setUserId(userId);
    }
    getUserId();
  }, []);
  return (
    <>
      <LoggedInUserLayout
        body={
          <Wrapper>
            <Container>
              <Left>
                <Padding>
                  <BasicWidgetTitleBlock title={`Search results: ${query}`} />
                </Padding>
                <SearchTypes
                  type={type}
                  onClick={(type) => {
                    setType(type);
                  }}
                />
              </Left>
              <Right>
                {userId && (
                  <SearchResultsSection
                    userId={userId && userId}
                    type={type}
                    query={query}
                  />
                )}
              </Right>
            </Container>
          </Wrapper>
        }
      />
    </>
  );
}

export default SearchResultsPage;
