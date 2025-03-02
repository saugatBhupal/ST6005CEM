import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  height: 80px;
  width: 150px;
  background-color: ${Colors.justWhite};
  color: ${Colors.mainBlue};
  border: 0.5px solid ${Colors.greyOutlineShadow};
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
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
      {isVisible && <Wrapper>{message}</Wrapper>}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
