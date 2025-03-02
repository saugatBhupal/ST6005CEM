import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Container>
        At Cosphere, you can discover the latest projects and jobs tailored
        specifically for you, matching your unique skills and expertise.
        <Button>
          <FilledButton
            placeholder="Explore"
            onClick={() => {
              navigate("/explore");
            }}
          />
        </Button>
      </Container>
    </Wrapper>
  );
}

export default MessageMenubarDashboard;
