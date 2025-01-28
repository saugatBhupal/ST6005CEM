import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";

const Wrapper = styled.div`
  background-color: ${Colors.justWhite};
  border-radius: 16px;
  margin: 20px;
  border: 0.5px solid ${Colors.greyOutlineShadow};
  box-shadow: 1px 5px 40px -30px rgba(0, 0, 0, 0.12);
`;
const Container = styled.div``;
const Top = styled.div`
  border-bottom: 1px solid ${Colors.greyOutlineShadow};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${Colors.menuSelected};
  }
`;
const Bottom = styled.div`
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${Colors.menuSelected};
  }
`;
const Flex = styled.div`
  font-size: ${FontSize.small};
  display: flex;
  padding: 15px;
  justify-content: space-between;
  span {
    color: ${Colors.greyOutline};
  }
`;
function StatsListWidget() {
  return (
    <Wrapper>
      <Container>
        <Top>
          <Flex>
            <div>Unique Clients</div>
            <div>
              6<span>/12</span>
            </div>
          </Flex>
        </Top>
        <Bottom>
          <Flex>
            <div>Applicants</div>
            <div>
              6<span>/12</span>
            </div>
          </Flex>
        </Bottom>
      </Container>
    </Wrapper>
  );
}

export default StatsListWidget;
