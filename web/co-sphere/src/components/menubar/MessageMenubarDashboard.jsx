import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import FilledButton from "../buttons/FilledButton";

const Wrapper = styled.div`
  height: 50px;
  width: 100%;
  background-color: ${Colors.justWhite};
  border-bottom: 1px solid ${Colors.greyOutlineShadow};
  margin-top: 0px !important;
`;
const Container = styled.div`
  display: flex;
  height: inherit;
  align-items: center;
  background-color: ${Colors.justWhite};
  justify-content: space-between;
  font-size: ${FontSize.small};
  font-weight: 200;
  margin: 0px 50px;
`;
const Button = styled.div`
  width: 100px;
  button {
    height: 35px !important;
    width: 80px;
    font-size: ${FontSize.small};
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
