import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import FilledButton from "../buttons/FilledButton";

const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  background-color: ${Colors.justWhite};
  border-bottom: 1px solid ${Colors.greyOutlineShadow};
  border-left: 1px solid ${Colors.greyOutlineShadow};
`;
const Container = styled.div`
  display: flex;
  height: inherit;
  align-items: center;
  background-color: ${Colors.justWhite};
  justify-content: space-between;
  font-size: 16px;
  font-weight: 200;
  margin: 0px 50px;
`;
const Button = styled.div`
  width: 100px;
  button {
    height: 40px !important;
  }
  background-color: transparent;
`;
function MessageMenubarDashboard() {
  return (
    <Wrapper>
      <Container>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor
        mauris, luctus in nisl at.
        <Button>
          <FilledButton
            placeholder="Browse"
            onClick={() => {
              alert("hello");
            }}
          />
        </Button>
      </Container>
    </Wrapper>
  );
}

export default MessageMenubarDashboard;
