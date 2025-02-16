import React, { useState } from "react";
import styled from "styled-components";
import DeleteButton from "../../components/buttons/DeleteButton";
import FilledButton from "../../components/buttons/FilledButton";
import ClockIcon from "../../components/icon/ClockIcon";
import PriceChip from "../../components/widget/chip/PriceChip";
import SkillChip from "../../components/widget/chip/SkillChip";
import TypeChip from "../../components/widget/chip/TypeChip";
import DurationWidget from "../../components/widget/duration/DurationWidget";
import ProfileWidget from "../../components/widget/profile/ProfileWidget";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import EditTaskDetails from "./EditTaskDetails";
import TaskDetailsTabbedPanel from "./TaskDetailsTabbedPanel";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;
const Overlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  width: inherit;
  background-color: #0000006c;
  z-index: 98;
`;
const Container = styled.div`
  height: calc(100%);
  display: flex;
  flex-direction: column;
`;
const Fixed = styled.div`
  height: fit-content;
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Content = styled.div`
  height: calc(100%);
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  padding-bottom: 0px;
`;
const PostedDate = styled.div`
  display: flex;
  align-items: center;
  font-size: ${FontSize.small};
  color: ${Colors.subtitleBlack};
  gap: 4px;
  svg {
    stroke-width: 1px !important;
    margin-bottom: -3px;
    height: 16px !important;
  }
`;
const Title = styled.div`
  font-size: ${FontSize.mediumLarge};
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  span {
    font-size: ${FontSize.small};
    color: ${Colors.greyOutline};
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: nowrap;
  button {
    font-size: ${FontSize.small};
    height: 38px;
    width: 40px;
  }
`;
const SkillsRow = styled.div`
  width: inherit;
  display: flex;
  flex-wrap: wrap;
  div {
    margin: 2px;
  }
`;
const Box = styled.div`
  border: 1px solid ${Colors.greyOutlineShadow};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Gap = styled.div`
  height: 1px;
  margin: 10px auto;
`;

const OverlayContent = styled.div`
  height: 600px;
  width: 500px;
  padding: 20px;
  background-color: white;
`;

function ActiveTaskDetails() {
  const [overlay, setOverlay] = useState(false);
  return (
    <Wrapper>
      {overlay && (
        <Overlay
          onClick={() => {
            setOverlay(!overlay);
          }}
        >
          <OverlayContent>
            <EditTaskDetails
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </OverlayContent>
        </Overlay>
      )}

      <Container>
        <Content>
          <Fixed>
            <Title>Develop a Mobile App for Food Delivery</Title>
            <Flex>
              <Row>
                <PostedDate>
                  <ClockIcon />
                  <div>Posted 6 hours ago</div>
                </PostedDate>
                <TypeChip type={"Active"} />
              </Row>
              <Row>
                <FilledButton placeholder={"Finish Project"} />
              </Row>
            </Flex>
            <Box>
              <Flex>
                <Row>
                  <ProfileWidget
                    name={"Harry Potter"}
                    address={"Kathmandu, Nepal"}
                  />
                  <PriceChip min={"2000"} max={"7000"} />
                </Row>

                <DurationWidget from={"3"} to={"6"} />
              </Flex>
              <SkillsRow>
                <SkillChip title={"Mobile Development"} />
                <SkillChip title={"ReactJS"} />
                <SkillChip title={"NodeJS"} />
                <SkillChip title={"MySQL"} />
                <SkillChip title={"MongoDB"} />
                <SkillChip title={"Agile"} />
                <SkillChip title={"Dancing"} />
              </SkillsRow>
              <Flex>
                <span>*This project is only visible to project members</span>
                <Row>
                  <DeleteButton />
                </Row>
              </Flex>
            </Box>
          </Fixed>
          <Gap />
          <TaskDetailsTabbedPanel />
        </Content>
      </Container>
    </Wrapper>
  );
}

export default ActiveTaskDetails;
