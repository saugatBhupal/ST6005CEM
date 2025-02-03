import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";

const Wrapper = styled.div`
  width: inherit;
`;
const Container = styled.div`
  position: relative;
`;

const Field = styled.div`
  width: 100%;
  height: 55px;
  font-size: 16px;
  border: 1px solid ${Colors.greyOutline};
  border-radius: 32px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  background: transparent;
  font-size: 18px;
  color: #4c4c4ca8;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
`;
const DropDown = styled.div`
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  text-align: left;
  top: 60px;
  z-index: 1;
  height: fit-content;
  background-color: ${Colors.justWhite};
  /* border: 1px solid ${Colors.greyOutline}; */
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  ul {
    list-style: None;
    display: flex;
    flex-direction: column;
    height: fit-content;
    justify-content: space-evenly;
    background-color: transparent;
    li {
      font-size: 16px;
      color: ${Colors.subtitleBlack};
      padding: 25px;
      margin-left: -40px;
      background-color: transparent;
      transition-duration: 0.2s;
      cursor: pointer;
      &:hover {
        background-color: ${Colors.menuSelected};
      }
    }
  }
`;

const Label = styled.div`
  font-size: 12px;
  color: ${Colors.subtitleBlack};
  background-color: ${Colors.justWhite};
  position: absolute;
  top: -8px;
  left: 20px;
  padding: 0px 5px;
`;
const Flex = styled.div`
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
`;
const CurrentItem = styled.div`
  padding-top: 2px;
  font-size: 16px;
`;
const DropDownArrow = styled.div`
  svg {
    height: 20px;
    width: 20px;
    transform: ${({ isToggled }) => (isToggled ? `rotateX(0.5turn)` : `none`)};
    transition-duration: 0.4s;
  }
`;
const Hidden = styled.div`
  color: #d3675a;
  text-align: left;
  padding: 2px 20px;
  font-size: 12px;
`;
function CustomDropDown(props) {
  const [isToggled, setIsToggled] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const handleSelectItem = (value) => {
    value && setSelectedItem(value);
  };
  useEffect(() => {
    props.value &&
      props.value !== selectedItem &&
      handleSelectItem(props.value);
    props.isValid && props.isValid(selectedItem !== null);
  }, [setSelectedItem]);
  return (
    <Wrapper>
      <Container>
        <Field
          onClick={() => {
            setIsToggled(!isToggled);
          }}
        >
          <Label>{props.label}</Label>
          <Flex>
            <CurrentItem>
              {selectedItem && selectedItem ? selectedItem : props.placeholder}
            </CurrentItem>
            <DropDownArrow isToggled={isToggled}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 9L12 17L20 9"
                  stroke={Colors.greyOutline}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </DropDownArrow>
          </Flex>
        </Field>
        {isToggled ? (
          <DropDown>
            <ul>
              {props.items.map((element, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedItem(element);
                    setIsToggled(!isToggled);
                    props.onChange && props.onChange(element);
                  }}
                >
                  {element}
                </li>
              ))}
            </ul>
          </DropDown>
        ) : (
          <></>
        )}
      </Container>
      <Hidden>{selectedItem == null ? "No Item Selected" : ""}</Hidden>
    </Wrapper>
  );
}

export default CustomDropDown;
