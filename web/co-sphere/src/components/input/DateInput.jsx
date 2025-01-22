import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div`
  position: relative;
  max-width: 388px;
`;

const Input = styled.input`
  width: 100%;
  height: 55px;
  padding: 10px 10px 10px 25px;
  font-size: 16px;
  border: 1px solid ${Colors.greyOutline};
  border-radius: 32px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.3s ease;
  background: transparent;
  color: ${Colors.justBlack};
  &::placeholder {
    color: transparent;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -8px;
    left: 20px;
    font-size: 12px;
    color: ${Colors.subtitleBlack};
    padding: 0 5px;
  }
  &:focus {
    &::placeholder {
      color: ${Colors.subtitleBlack};
    }
  }
`;

const Label = styled.label`
  position: absolute;
  top: 18px;
  left: 20px;
  font-size: 16px;
  color: #4c4c4ca8;
  background-color: ${Colors.justWhite};
  pointer-events: none;
  transition: all 0.3s ease;
`;

function DateInput({ placeholder }) {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 8) input = input.slice(0, 8);

    let formattedValue = "";
    if (input.length <= 2) {
      formattedValue = input;
    } else if (input.length <= 4) {
      formattedValue = `${input.slice(0, 2)}-${input.slice(2)}`;
    } else {
      formattedValue = `${input.slice(0, 2)}-${input.slice(2, 4)}-${input.slice(
        4
      )}`;
    }

    setValue(formattedValue);
  };

  return (
    <Wrapper>
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="DD-MM-YYYY"
        maxLength={10}
      />
      <Label>{placeholder}</Label>
    </Wrapper>
  );
}

export default DateInput;
