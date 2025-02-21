import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import CalendarIcon from "../../icon/CalendarIcon";

const Wrapper = styled.div``;
const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${FontSize.small};
  color: ${Colors.justBlack};
  a {
    font-size: ${FontSize.extraSmall};
    color: ${Colors.subtitleBlack};
  }
`;
const Icon = styled.div`
  height: 22px;
  width: 22px;
  border-radius: 4px;
  border: 0.5px solid ${Colors.greyOutlineShadow};
  background-color: ${Colors.chatBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    height: 14px !important;
    strokewidth: 0.7px !important;
    stroke: ${Colors.fontBlack};
  }
`;
function DurationWidget({ from, to, date, type }) {
  return (
    <Wrapper>
      <Flex>
        <Icon>
          <CalendarIcon />
        </Icon>
        <Column>
          {type ? (
            <>
              <span>{date}</span>
              <span>
                <a>{type}</a>
              </span>
            </>
          ) : (
            <>
              {" "}
              <span>
                {from} - {to} Days
              </span>
              <span>
                <a>Duration</a>
              </span>
            </>
          )}
        </Column>
      </Flex>
    </Wrapper>
  );
}

export default DurationWidget;
