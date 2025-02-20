import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import LoggedInUserLayout from "../common/LoggedInUserLayout";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  height: 100%;
  display: flex;
`;
const Left = styled.div`
  width: 453px;
  height: calc(100vh - 100px);
  overflow-y: scroll;
`;
const Right = styled.div`
  flex: 1;
  width: auto;
  border-left: 0.5px solid ${Colors.greyOutlineShadow};
`;
function SplitLayout({ left, right, page,  }) {
  return (
    <LoggedInUserLayout
      body={
        <Wrapper>
          <Container>
            <Left>{left}</Left>
            <Right>{right}</Right>
          </Container>
        </Wrapper>
      }
      page={page}
    />
  );
}

export default SplitLayout;
