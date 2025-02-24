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
  font-size: 75px;
  a {
    font-weight: 200;
    color: ${Colors.mainBlue};
    width: fit-content;
    margin: auto;
  }
`;
function GenerateProfileIconFromWord({ name, height, fontSize }) {
  return (
    <Wrapper>
      {name && (
        <Container
          style={
            height && {
              height: height,
              width: height,
              fontSize: fontSize || "75px",
            }
          }
        >
          <a>{name}</a>
        </Container>
      )}
    </Wrapper>
  );
}

export default GenerateProfileIconFromWord;
