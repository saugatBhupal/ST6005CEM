import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import { handleValidation } from "../../utils/validators/HandleValidation";

const Wrapper = styled.div`
  position: relative;
  width: 388px;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${Colors.greyOutline};
  border-radius: 32px;
  background: transparent;
  transition: all 0.3s ease;
  border-color: ${({ validationMessage }) =>
    validationMessage == null || validationMessage === ""
      ? `${Colors.greyOutline}`
      : `#d3675a`};
`;
const CountryCode = styled.select`
  width: fit-content;
  height: 35px;
  padding-left: 20px;
  padding-right: 8px;
  border: none;
  border-right: 1px solid ${Colors.greyOutline};
  border-radius: 0px;
  background: transparent;
  font-size: 14px;
  color: ${Colors.subtitleBlack};
  outline: none;
  appearance: none;
  text-align: center;
  cursor: pointer;
`;

const Input = styled.input`
  flex: 1;
  height: 35px;
  padding: 10px 10px 10px 15px;
  font-size: 16px;
  border: none;
  outline: none;
  background: transparent;
  color: ${Colors.justBlack};

  &:focus + label,
  &:not(:placeholder-shown) + label {
    right: 325px;
    top: -8px;
    font-size: 12px;
    color: ${Colors.subtitleBlack};
    padding: 0 5px;
  }
`;
const Hidden = styled.div`
  color: #d3675a;
  text-align: left;
  padding: 2px 20px;
  font-size: 12px;
`;

const Label = styled.label`
  position: absolute;
  top: 18px;
  right: 265px;
  font-size: 16px;
  color: #4c4c4ca8;
  background-color: ${Colors.justWhite};
  pointer-events: none;
  transition: all 0.3s ease;
`;

function PhoneNumberInput({ placeholder, validationType }) {
  const [validationMessage, setValidationMessage] = useState();
  const getValidationMessage = (value) => {
    let message = handleValidation(value, validationType);
    setValidationMessage(message);
  };
  return (
    <Wrapper>
      <Flex validationMessage={validationMessage}>
        <CountryCode>
          <option value="+977">+977</option>
          <option value="+44">+44</option>
          <option value="+91">+91</option>
          <option value="+61">+61</option>
        </CountryCode>
        <Input
          type="number"
          placeholder=" "
          id="phone-input"
          onChange={(e) => {
            getValidationMessage(e.target.value);
          }}
        />
        <Label htmlFor="phone-input">{placeholder}</Label>
      </Flex>
      <Hidden>{validationMessage && <>{validationMessage}</>}</Hidden>
    </Wrapper>
  );
}

export default PhoneNumberInput;
