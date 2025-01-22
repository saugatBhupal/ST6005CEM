import React from "react";
import styled from "styled-components";
import SearchInputChat from "../../components/input/search/SearchInputChat";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${Colors.justWhite};
  border-right: 0.5px solid ${Colors.greyOutlineShadow};
`;
const Container = styled.div``;
function AllChatsSection() {
  return (
    <Wrapper>
      <Container>
        <SearchInputChat />
      </Container>
    </Wrapper>
  );
}

export default AllChatsSection;
