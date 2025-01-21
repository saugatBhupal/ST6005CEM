import React from "react";
import styled from "styled-components";
import TextAreaWithActions from "../../components/input/textarea/TextAreaWithActions";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div``;
const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${Colors.subtitleBlack};
  margin-bottom: 10px;
`;
const Description = styled.div`
  font-size: 16px;
  color: ${Colors.subtitleBlack};
  margin: 10px auto;
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 20px auto;
`;
function AboutSection() {
  const isUser = true;
  return (
    <Wrapper>
      <Title>John Cena</Title>
      {isUser ? (
        <TextAreaWithActions
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          viverra pharetra ligula, nec mattis quam porta vitae. Nullam a congue
          neque, nec volutpat justo. Nullam et est condimentum, bibendum neque
          id, congue quam. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Vestibulum magna lacus, aliquam ut sapien quis, dignissim mattis
          lectus. Fusce facilisis diam magna, sit amet feugiat metus hendrerit."
          placeholder="Tell us about yourself..."
        />
      ) : (
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          viverra pharetra ligula, nec mattis quam porta vitae. Nullam a congue
          neque, nec volutpat justo. Nullam et est condimentum, bibendum neque
          id, congue quam. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Vestibulum magna lacus, aliquam ut sapien quis, dignissim mattis
          lectus. Fusce facilisis diam magna, sit amet feugiat metus hendrerit.
        </Description>
      )}

      <Flex>
        <div>
          <Title>Address</Title>
          <Description>Kathmandu, Nepal</Description>
        </div>
        <div>
          <Title>Joined</Title>
          <Description>May 23, 2024</Description>
        </div>
      </Flex>
      <Title>Contact</Title>
      {isUser ? (
        <Description>You have decided not to disclose this data.</Description>
      ) : (
        <Description>User has decided not to disclose this data.</Description>
      )}
    </Wrapper>
  );
}
export default AboutSection;
