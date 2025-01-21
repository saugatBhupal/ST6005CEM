import React from "react";
import styled from "styled-components";
import ApplicationsCreatedByMeWidget from "./ApplicationsCreatedByMeWidget";

const Wrapper = styled.div`
  display: flex;
`;

export default function ApplicationsAndTasksCreatedByMeWidget() {
  return (
    <Wrapper>
      <ApplicationsCreatedByMeWidget />
    </Wrapper>
  );
}
