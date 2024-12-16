import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../constants/Colors';

const Wrapper = styled.div`
  position: relative;
  width: 388px;
  display: flex;
  align-items: center;
  border: 1px solid ${Colors.greyOutline};
  border-radius: 32px;
  background: transparent;
  transition: all 0.3s ease;
`;

const CountryCode = styled.select`
  width: fit-content;
  height: 35px;
  padding-left: 20px;
  padding-right: 8px;
  border: none;
  border-right: 1px solid ${Colors.greyOutline};
  border-radius : 0px;
  background: transparent;
  font-size: 14px;
  color: ${Colors.subtitleBlack};
  outline: none;
  appearance: none;
  text-align: center;
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

const Label = styled.label`
  position: absolute;
  top: 18px;
  right: 265px;
  font-size: 16px;
  color: #4c4c4ca8;
  pointer-events: none;
  transition: all 0.3s ease;
`;

function PhoneNumberInput({ placeholder }) {
  return (
    <Wrapper>
      <CountryCode>
        <option value="+977">+977</option>
        <option value="+44">+44</option>
        <option value="+91">+91</option>
        <option value="+61">+61</option>
      </CountryCode>
      <Input type="number" placeholder=" " id="phone-input" />
      <Label htmlFor="phone-input">{placeholder}</Label>
    </Wrapper>
  );
}

export default PhoneNumberInput;
