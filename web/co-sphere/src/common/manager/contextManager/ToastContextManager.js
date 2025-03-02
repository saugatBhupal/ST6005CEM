import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 250px;
  background-color: ${Colors.justWhite};
  color: ${Colors.mainBlue};
  border: 0.5px solid ${Colors.greyOutlineShadow};
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: Arial, sans-serif;

  border-left: 5px solid ${Colors.mainBlue};

  &::before {
    content: "";
    height: 6px;
    background-color: ${Colors.mainBlue};
    border-radius: 5px 5px 0 0;
    width: 100%;
    margin-bottom: 10px;
  }

  .message {
    font-size: 14px;
    line-height: 1.5;
  }

  .close-button {
    align-self: flex-end;
    font-size: 12px;
    color: ${Colors.mainBlue};
    cursor: pointer;
  }
`;

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const showToast = (msg) => {
    setMessage(msg);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isVisible && (
        <Wrapper>
          <div className="message">{message}</div>
          <div className="close-button">X</div>
        </Wrapper>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
