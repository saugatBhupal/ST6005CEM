import React from "react";
import styled from "styled-components";
import BadgeIcon from "../../../assets/images/badges/badge-1.png";
import BadgeIcon2 from "../../../assets/images/badges/badge-2.png";
import BadgeIcon3 from "../../../assets/images/badges/badge-3.png";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import VerticalProgressBar from "../progressbar/VerticalProgresssbar";

const Wrapper = styled.div``;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 190px);
  grid-template-rows: repeat(2, 120px);
  gap: 10px;
  margin: 20px;
  margin-top: 0;
`;
const Box = styled.div`
  height: inherit;
  width: 150px;
  background-color: ${Colors.justWhite};
  border-radius: 16px;
  border: 0.5px solid ${Colors.greyOutlineShadow};
  box-shadow: 1px 5px 40px -30px rgba(0, 0, 0, 0.12);
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  font-size: ${FontSize.medium};
`;
const Content = styled.div`
  img {
    height: 45px;
  }
  span {
    font-size: 30px;
    font-weight: 400;
    text-align: center;
    color: ${Colors.greyOutline};
    b {
      color: ${Colors.mainBlue};
      font-weight: 400;
    }
  }
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 20px;
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  /* align-items: center; */
`;
const BoxContainer = styled.div`
  height: inherit;
  width: inherit;
`;
function StatsWidget() {
  return (
    <Wrapper>
      <Container>
        <Box>
          <BoxContainer>
            <Title>Achievements</Title>
            <Content>
              <img src={BadgeIcon} alt="" />
              <img src={BadgeIcon2} alt="" />
              <img src={BadgeIcon3} alt="" />
            </Content>
          </BoxContainer>
        </Box>
        <Box>
          <BoxContainer>
            <Flex>
              <div>
                <Title>Success</Title>
                <Content>
                  <span>
                    <b>4</b>/5
                  </span>
                </Content>
              </div>
              <VerticalProgressBar
                fillColor={`${Colors.strokeBlue}`}
                max={5}
                current={4}
              />
            </Flex>
          </BoxContainer>
        </Box>
        <Box>
          <BoxContainer>
            <Flex>
              <div>
                <Title>Rating</Title>
                <Content>
                  <span>
                    <b>3.2</b>
                  </span>
                </Content>
              </div>
              <VerticalProgressBar
                fillColor={`${Colors.strokeBlue}`}
                max={5}
                current={3.2}
              />
            </Flex>
          </BoxContainer>
        </Box>
        <Box>
          <BoxContainer>
            <Title>Tasks</Title>
            <Content>
              <span>
                <b>6</b>/8
              </span>
            </Content>
          </BoxContainer>
        </Box>
      </Container>
    </Wrapper>
  );
}

export default StatsWidget;
