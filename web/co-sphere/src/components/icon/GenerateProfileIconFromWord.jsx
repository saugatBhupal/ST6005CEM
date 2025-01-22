import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div``;
const Container = styled.div`
  height: 100px;
  width: 100px;
  background-color: ${Colors.lightMainBlue};
  font-size: 65px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    font-size: 75px;
    font-weight: 200;
    color: ${Colors.mainBlue};
    width: fit-content;
    margin: auto;
  }
`;
function GenerateProfileIconFromWord({ name }) {
  return (
    <Wrapper>
      {name && (
        <Container>
          <a>{name}</a>
        </Container>
      )}
    </Wrapper>
  );
}

export default GenerateProfileIconFromWord;
