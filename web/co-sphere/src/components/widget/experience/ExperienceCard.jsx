import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import { calculateTimeBetween } from "../../../utils/date/CalculateTimeBetween";
import { convertToDate } from "../../../utils/date/ConvertToDate";
import { getFirstLetter } from "../../../utils/GetFirstWord";
import GenerateProfileIconFromWord from "../../icon/GenerateProfileIconFromWord";
import TypeChip from "../chip/TypeChip";

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
function ExperienceCard({ experience }) {
  return (
    <Wrapper>
      <Flex>
        <Left>
          <GenerateProfileIconFromWord
            name={getFirstLetter(experience.organization)}
            height={"60px"}
            fontSize={"35px"}
          />
        </Left>
        <Center>
          <Column>
            <div>
              <Title>{experience.position}</Title>
              <SubTitle>{experience.organization}</SubTitle>
            </div>

            <Tiny>
              {convertToDate(experience.from)} - {convertToDate(experience.to)}{" "}
              <span>
                ({calculateTimeBetween(experience.from, experience.to)})
              </span>
            </Tiny>
          </Column>
        </Center>
      </Flex>

      <Right>
        <TypeChip type={experience.status} />
      </Right>
    </Wrapper>
  );
}

export default ExperienceCard;
