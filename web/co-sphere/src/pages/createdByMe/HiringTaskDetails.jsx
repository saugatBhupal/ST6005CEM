import React from "react";
import styled from "styled-components";
import DeleteButton from "../../components/buttons/DeleteButton";
import EditJobDetailsButton from "../../components/buttons/EditJobDetailsButton";
import FilledButton from "../../components/buttons/FilledButton";
import ShareButton from "../../components/buttons/ShareButton";
import ClockIcon from "../../components/icon/ClockIcon";
import BasicWidgetTitleBlock from "../../components/textBlocks/BasicWidgetTitleBlock";
import PriceChip from "../../components/widget/chip/PriceChip";
import SkillChip from "../../components/widget/chip/SkillChip";
import TypeChip from "../../components/widget/chip/TypeChip";
import DurationWidget from "../../components/widget/duration/DurationWidget";
import ProfileWidget from "../../components/widget/profile/ProfileWidget";
import SelectedApplicantProfileWidget from "../../components/widget/profile/SelectedApplicantWidget";
import UnselectedApplicantProfileWidget from "../../components/widget/profile/UnselectedApplicantProfileWidget";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

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
const Scroll = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
`;
const Applicants = styled.div`
  max-width: inherit;
  margin-right: 1px;
`;
const Gap = styled.div`
  height: 1px;
  margin: 10px auto;
`;
function HiringTaskDetails() {
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
                <TypeChip type={"Hiring"} />
              </Row>
              <Row>
                <FilledButton placeholder={"Finish Hiring"} />
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
                <EditJobDetailsButton />
                <Row>
                  <ShareButton />
                  <DeleteButton />
                </Row>
              </Flex>
            </Box>
          </Fixed>
          <Gap />
          <Scroll>
            <Applicants>
              <BasicWidgetTitleBlock title={"All Applicants (22)"} />
              <Gap />
              <UnselectedApplicantProfileWidget
                name={"Saugat Singh"}
                postedTime={"2hrs ago"}
              />
              <UnselectedApplicantProfileWidget
                name={"Saugat Singh"}
                postedTime={"2hrs ago"}
              />
              <UnselectedApplicantProfileWidget
                name={"Saugat Singh"}
                postedTime={"2hrs ago"}
              />
              <UnselectedApplicantProfileWidget
                name={"Saugat Singh"}
                postedTime={"2hrs ago"}
              />
            </Applicants>
            <Gap />
            <Gap />
            <Applicants>
              <BasicWidgetTitleBlock title={"Accepted (22)"} />
              <Gap />
              <SelectedApplicantProfileWidget
                name={"Saugat Singh"}
                postedTime={"2hrs ago"}
              />
              <SelectedApplicantProfileWidget
                name={"Saugat Singh"}
                postedTime={"2hrs ago"}
              />
              <SelectedApplicantProfileWidget
                name={"Saugat Singh"}
                postedTime={"2hrs ago"}
              />
              <SelectedApplicantProfileWidget
                name={"Saugat Singh"}
                postedTime={"2hrs ago"}
              />

              <Gap />
            </Applicants>
          </Scroll>
        </Content>
      </Container>
    </Wrapper>
  );
}

export default HiringTaskDetails;
