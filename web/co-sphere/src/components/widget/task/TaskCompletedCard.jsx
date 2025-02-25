import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import { calculateTimeBetween } from "../../../utils/date/CalculateTimeBetween";
import { convertToTime } from "../../../utils/date/ConvertToTime";
import ProfileIcon from "../../icon/ProfileIcon";

const Wrapper = styled.div`
  background-color: ${Colors.justWhite};
  border-radius: 16px;
  margin: 20px auto;
  padding: 10px 20px;
  cursor: pointer;
  border: 0.5px solid ${Colors.greyOutlineShadow};
  box-shadow: 1px 5px 40px -30px rgba(0, 0, 0, 0.12);
  &:hover {
    box-shadow: 1px 5px 40px -20px rgba(49, 49, 49, 0.354);
  }
`;
const Container = styled.div`
  /* height: 120px; */
`;
const Top = styled.div`
  z-index: 20;
  div {
    align-items: center;
    justify-content: left;
  }
  a {
    font-size: ${FontSize.tiny};
    color: ${Colors.subtitleBlack};
  }
  img {
    border-radius: 50%;
    margin-right: 5px;
  }
`;
const Line = styled.div`
  width: 1px;
`;
const Stats = styled.div`
  border-top: 1px solid ${Colors.greyOutlineShadow};
  margin-top: 10px;
  ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    font-size: ${FontSize.extraSmall};
    padding: 15px 0px;
    padding-bottom: 0px;
  }
  li {
    margin-right: 5px;
    font-weight: 400;
    padding-left: 12px;
    color: ${Colors.subtitleBlack};
    border-left: 1px solid ${Colors.greyOutlineShadow};
  }
  li:first-child {
    padding-left: 0px;
    border-left: none;
  }
`;
const Stat = styled.div`
  b {
    font-size: ${FontSize.medium};
    color: ${Colors.justBlack};
    font-weight: 400;
  }
`;
const Dot = styled.div`
  align-self: flex-end;
  height: 10px;
  z-index: 99;

  svg {
    fill: ${Colors.subtitleBlack};
    &:hover {
      fill: ${Colors.justBlack};
    }
  }
`;

const Flex = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${FontSize.medium};
`;
const Column = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function TaskCompletedCard({ onClick, project }) {
  return (
    <Wrapper onClick={() => onClick && onClick(project._id)}>
      <Container>
        <Column>
          <Top>
            <Flex>
              <div>
                <ProfileIcon
                  url={project.postedBy.profileImage}
                  height={"50px"}
                />
              </div>
              <div>
                <div>{project.projectName}</div>
                <a>Posted on {convertToTime(project.createdAt)}</a>
              </div>
            </Flex>
          </Top>

          <Stats>
            <ul>
              <li>
                <Stat>
                  <b>{project.members.length}</b>
                  <br />
                  <a>Members</a>
                </Stat>
              </li>
              <li>
                <Stat>
                  <b>{(project.tasks && project.tasks.length) || 0}</b>
                  <br />
                  <a>Tasks</a>
                </Stat>
              </li>
              <li>
                <Stat>
                  <b>{(project.tasks && project.tasks.length) || 0}</b>
                  <br />
                  <a>Completed</a>
                </Stat>
              </li>
              <li>
                <Stat>
                  <b>
                    {calculateTimeBetween(
                      project.completionDate,
                      project.createdAt
                    )}
                  </b>
                  <br />
                  <a>Duration</a>
                </Stat>
              </li>
            </ul>
          </Stats>
        </Column>
      </Container>
    </Wrapper>
  );
}

export default TaskCompletedCard;
