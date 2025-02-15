import React from "react";
import styled from "styled-components";
import ProfileImage from "../../../assets/images/icon/profile_icon/profile_icon.png";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import DeleteButton from "../../buttons/DeleteButton";
import TickButtonRound from "../../buttons/TickButtonRound";
import TypeChip from "../chip/TypeChip";
import DurationWidget from "../duration/DurationWidget";

const Wrapper = styled.div`
  width: 100%;
`;
const Container = styled.div`
  padding: 20px;
  border: 1px solid ${Colors.greyOutlineShadow};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div``;
const Description = styled.div`
  color: ${Colors.subtitleBlack};
  font-size: ${FontSize.small};
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  span {
    display: flex;
    gap: 2px;
    align-items: center;
    font-size: ${FontSize.small};
    color: ${Colors.subtitleBlack};
    div {
      margin: auto 2px;
    }
  }
`;
const Icon = styled.div`
  img {
    height: 30px;
    border-radius: 50%;
  }
`;
function TaskDetailsCard({ completed }) {
  return (
    <Wrapper>
      <Container>
        <Flex>
          <Title>Initialize flutter application and connect to database</Title>
          <DurationWidget from={"6"} to={"9"} />
        </Flex>
        <Description>
          First initialize flutter app and then goto addd dependency and then
          when you can finish adding dependency then you need to connect to the
          database. If you do not have the database please message me.
        </Description>
        <Flex>
          <Row>
            <span>
              <Icon>
                <img src={ProfileImage} alt="" />
              </Icon>
              <Icon>
                <img src={ProfileImage} alt="" />
              </Icon>
              <Icon>
                <img src={ProfileImage} alt="" />
              </Icon>
              <Icon>
                <img src={ProfileImage} alt="" />
              </Icon>
              29 members
            </span>
            {completed ? (
              <>
                <TypeChip type={completed} />
              </>
            ) : (
              <span>
                <DeleteButton />
                <TickButtonRound />
              </span>
            )}
          </Row>
        </Flex>
      </Container>
    </Wrapper>
  );
}

export default TaskDetailsCard;
