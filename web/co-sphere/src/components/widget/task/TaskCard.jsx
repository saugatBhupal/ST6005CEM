import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import { calculateTimeBetween } from "../../../utils/date/CalculateTimeBetween";
import { convertToDate } from "../../../utils/date/ConvertToDate";
import ProfileIcon from "../../icon/ProfileIcon";
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
const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Column = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Flex = styled.div`
  display: flex;
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
function TaskCard({ project }) {
  return (
    project && (
      <Wrapper>
        <Flex>
          <Left>
            <ProfileIcon url={project.postedBy.profileImage} height={"70px"} />
          </Left>
          <Center>
            <Column>
              <div>
                <Title>{project.projectName}</Title>
                <SubTitle>
                  {project.companyName || project.postedBy.fullname}
                </SubTitle>
              </div>

              <Tiny>
                {convertToDate(project.createdAt)} -{" "}
                {convertToDate(project.completionDate)}{" "}
                <span>
                  (
                  {calculateTimeBetween(
                    project.createdAt,
                    project.completionDate
                  )}
                  )
                </span>
              </Tiny>
            </Column>
          </Center>
        </Flex>

        <Right>
          <TypeChip type={project.position} />
          <TypeChip type={project.completionType} />
        </Right>
      </Wrapper>
    )
  );
}

export default TaskCard;
