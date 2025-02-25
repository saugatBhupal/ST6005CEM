import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import TextAreaFilledButton from "../../buttons/TextAreaFilledButton";
import TextAreaOutlinedButton from "../../buttons/TextAreaOutlinedButton";

const InputWrapper = styled.div`
  max-height: 300px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

const StyledInput = styled.textarea`
  box-sizing: border-box;
  border: none;
  border-radius: 12px;
  resize: none;
  outline: none;
  min-height: 150px;
  font-size: ${FontSize.small};
  font-weight: 300;
  color: ${Colors.subtitleBlack};
  text-align: justify;
  padding: 10px;
  width: 100%;

  &::placeholder {
    font-size: ${FontSize.small};
    font-weight: 200;
  }
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: ${FontSize.small};
  padding: 5px 10px;
  color: ${Colors.subtitleBlack};
`;

const ButtonGroup = styled.div`
  width: 130px;
  display: flex;
  justify-content: space-between;
`;

const Bottom = styled.div`
  align-self: flex-end;
`;

function TextAreaWithActions({ value, placeholder, onChange, onClick }) {
  const [text, setText] = useState(value || ""); // Initialize state with value

  useEffect(() => {
    if (value !== undefined && value !== text) {
      setText(value);
    }
  }, [value]); // Update text only if value prop changes

  const handleTextChange = (e) => {
    setText(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <InputWrapper>
      <StyledInput
        value={text}
        onChange={handleTextChange}
        maxLength={500}
        placeholder={placeholder}
      />
      <Bottom>
        <CharacterCount>{text.length}/500</CharacterCount>
        <ButtonGroup>
          <TextAreaOutlinedButton placeholder="Cancel" />
          <TextAreaFilledButton placeholder="Save" onClick={onClick} />
        </ButtonGroup>
      </Bottom>
    </InputWrapper>
  );
}

export default TextAreaWithActions;
