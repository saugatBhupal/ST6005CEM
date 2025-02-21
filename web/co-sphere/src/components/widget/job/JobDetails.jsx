import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import FilledButton from "../../buttons/FilledButton";
import LikeButton from "../../buttons/LikeButton";
import ShareButton from "../../buttons/ShareButton";
import ClockIcon from "../../icon/ClockIcon";
import PriceChip from "../chip/PriceChip";
import SkillChip from "../chip/SkillChip";
import DurationWidget from "../duration/DurationWidget";
import ProfileWidget from "../profile/ProfileWidget";
import JobDetailContentWidget from "./widget/JobDetailContentWidget";

const Wrapper = styled.div`
  height: 100%;
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
  height: calc(100% - 80px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  padding-bottom: 0px;
`;
const Title = styled.div`
  font-size: ${FontSize.mediumLarge};
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: nowrap;
`;
const SkillsRow = styled.div`
  width: inherit;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  div {
    margin: 2px;
  }
`;
const PostedDate = styled.div`
  display: flex;
  align-items: center;
  font-size: ${FontSize.small};
  color: ${Colors.subtitleBlack};
  gap: 4px;
  svg {
    strokewidth: 1px !important;
    margin-bottom: -3px;
    height: 16px !important;
  }
`;
const Scroll = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
`;
const Bottom = styled.div`
  height: 80px;
  width: 100%;
  background-color: ${Colors.justWhite};
  border: 0.5px solid ${Colors.greyOutlineShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    width: 300px;
  }
`;

function JobDetails() {
  return (
    <Wrapper>
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
                <PriceChip min={"2000"} max={"7000"} />
              </Row>
              <Row>
                <ShareButton />
                <LikeButton />
              </Row>
            </Flex>
            <Flex>
              <ProfileWidget
                name={"Harry Potter"}
                address={"Kathmandu, Nepal"}
              />
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
          </Fixed>
          <Scroll>
            <JobDetailContentWidget />
          </Scroll>
        </Content>
        <Bottom>
          <FilledButton placeholder={"Apply Now"} />
        </Bottom>
      </Container>
    </Wrapper>
  );
}

export default JobDetails;
