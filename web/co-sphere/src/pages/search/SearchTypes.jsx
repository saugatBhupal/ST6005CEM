import React from "react";
import styled from "styled-components";
import SearchTypeWidget from "../../components/widget/search/SearchTypeWidget";

const Wrapper = styled.div`
  width: 100%;
`;
const Container = styled.div``;
function SearchTypes({ type, onClick }) {
  return (
    <Wrapper>
      <Container>
        <SearchTypeWidget
          type={"User"}
          onClick={() => {
            onClick("user");
          }}
          selected={type === "user"}
        />
        <SearchTypeWidget
          type={"Projects"}
          onClick={() => {
            onClick("project");
          }}
          selected={type === "project"}
        />
        <SearchTypeWidget
          type={"Jobs"}
          onClick={() => {
            onClick("job");
          }}
          selected={type === "job"}
        />
      </Container>
    </Wrapper>
  );
}

export default SearchTypes;
