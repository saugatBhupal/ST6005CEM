import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import { calculateTimeBetween } from "../../../utils/date/CalculateTimeBetween";
import { convertToDate } from "../../../utils/date/ConvertToDate";
import { getFirstLetter } from "../../../utils/GetFirstWord";
import GenerateProfileIconFromWord from "../../icon/GenerateProfileIconFromWord";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  margin: 10px 0px;
  align-items: center;
`;
const Left = styled.div``;
const Center = styled.div`
  margin: 10px 0px;
  margin-left: 10px;
`;
const Right = styled.div``;
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
const Title = styled.div`
  font-size: ${FontSize.small};
  font-weight: 500;
  color: ${Colors.mainBlue};
`;
const SubTitle = styled.div`
  font-size: ${FontSize.small};
  font-weight: 300;
  color: ${Colors.subtitleBlack};
`;
const Tiny = styled.div`
  font-size: 11px;
  font-weight: 300;
  color: ${Colors.subtitleBlack};
  span {
    color: ${Colors.mainBlue};
  }
`;
function EducationCard({ education }) {
  return (
    <Wrapper>
      <Flex>
        <Left>
          <GenerateProfileIconFromWord
            name={getFirstLetter(education.organization)}
            height={"60px"}
            fontSize={"35px"}
          />
        </Left>
        <Center>
          <Column>
            <div>
              <Title>{education.degree}</Title>
              <SubTitle>{education.organization}</SubTitle>
            </div>

            <Tiny>
              {convertToDate(education.from)} - {convertToDate(education.to)}{" "}
              <span>
                ({calculateTimeBetween(education.from, education.to)})
              </span>
            </Tiny>
          </Column>
        </Center>
      </Flex>
    </Wrapper>
  );
}

export default EducationCard;
