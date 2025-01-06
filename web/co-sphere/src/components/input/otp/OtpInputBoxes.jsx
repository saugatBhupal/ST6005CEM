import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const InputBox = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 20px;
  border: 1px solid ${Colors.greyOutline};
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: ${Colors.strokeBlue};
    box-shadow: 0 0 5px ${Colors.strokeBlue};
    color: ${Colors.strokeBlue};
  }
`;

const OTPInput = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (!isNaN(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      if (index < 5 && element.value) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (element, index) => {
    if (element.value === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = otp.map((_, i) => data[i] || "");
    setOtp(newOtp);

    newOtp.forEach((value, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = value;
      }
    });
    if (data.length < 6) {
      inputRefs.current[data.length]?.focus();
    }
  };

  return (
    <Container>
      {otp.map((_, index) => (
        <InputBox
          key={index}
          type="text"
          maxLength="1"
          ref={(el) => (inputRefs.current[index] = el)}
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              handleBackspace(e.target, index);
            }
          }}
          onPaste={handlePaste}
        />
      ))}
    </Container>
  );
};

export default OTPInput;
