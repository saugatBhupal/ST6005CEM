import React from "react";
import styled from "styled-components";

const Icon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    stroke: #43b643;
    height: 22px;
    width: 22px;
  }
`;
function MessageIcon({ onClick }) {
  return (
    <Icon
      onClick={() => {
        onClick();
      }}
    >
      <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.99943 13.1128V13M12.9989 13.1128V13M18.9983 13.1128V13M24.9977 13C24.9977 14.725 24.6338 16.3651 23.9785 17.8474L25 24.9989L18.8719 23.4667C17.1359 24.4431 15.1324 25 12.9989 25C6.37207 25 1 19.6274 1 13C1 6.37258 6.37207 1 12.9989 1C19.6257 1 24.9977 6.37258 24.9977 13Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
}

export default MessageIcon;
