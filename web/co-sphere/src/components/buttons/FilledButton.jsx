import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div``;

const Button = styled.button`
  min-width: 100px;
  width: 100%;
  background-color: ${Colors.strokeBlue};
  color: ${Colors.backgroundWhite};
  height: 50px;
  font-size: 16px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #09267bed;
  }
`;

const Spinner = styled.div`
  border: 4px solid ${Colors.lightMainBlue};
  border-top: 4px solid ${Colors.backgroundWhite};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin: auto;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function FilledButton(props) {
  const [loading, setLoading] = useState(false);

  return (
    <Wrapper>
      <Button
        onClick={async () => {
          setLoading(true);
          try {
            await props.onClick();
          } catch (error) {
            console.error("Error during OTP resend:", error);
          } finally {
            setLoading(false);
          }
        }}
      >
        {loading ? <Spinner /> : props.placeholder}
      </Button>
    </Wrapper>
  );
}

export default FilledButton;
