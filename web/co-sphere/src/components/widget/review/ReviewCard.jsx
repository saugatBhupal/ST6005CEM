import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  margin: 10px 0px;
  align-items: center;
`;
const Left = styled.div``;

const Right = styled.div`
  margin-left: 20px;
`;
const Column = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
`;
const Dot = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin: 1px;
  background-color: ${Colors.mainBlue};
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: ${Colors.subtitleBlack};
`;
function ReviewCard() {
  return (
    <Wrapper>
      <Flex>
        <Left>
          <SubTitle>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            viverra pharetra ligula, nec mattis quam porta vitae. Nullam a
            congue neque, nec volutpat justo. Nullam et est condimentum
          </SubTitle>
        </Left>
        <Right>
          <Column>
            <Flex>
              <Dot />
              <Dot />
              <Dot />
              <Dot />
              <Dot />
            </Flex>
            <SubTitle>eSewa</SubTitle>
          </Column>
        </Right>
      </Flex>
    </Wrapper>
  );
}

export default ReviewCard;
