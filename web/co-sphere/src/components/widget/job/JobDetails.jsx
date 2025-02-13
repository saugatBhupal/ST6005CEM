import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import LikeButton from "../../buttons/LikeButton";
import ShareButton from "../../buttons/ShareButton";
import ClockIcon from "../../icon/ClockIcon";
import PriceChip from "../chip/PriceChip";
import SkillChip from "../chip/SkillChip";
import DurationWidget from "../duration/DurationWidget";
import ProfileWidget from "../profile/ProfileWidget";
import JobDetailContentWidget from "./widget/JobDetailContentWidget";

const Wrapper = styled.div``;
const Container = styled.div`
  padding: 30px 40px;
`;
const Content = styled.div``;
const Title = styled.div`
  font-size: ${FontSize.mediumLarge};
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
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
    stroke-width: 1px !important;
    margin-bottom: -3px;
    height: 16px !important;
  }
`;

function JobDetails() {
  return (
    <Wrapper>
      <Container>
        <Content>
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
            <ProfileWidget name={"Harry Potter"} address={"Kathmandu, Nepal"} />
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
          <JobDetailContentWidget />
        </Content>
      </Container>
    </Wrapper>
  );
}

export default JobDetails;
