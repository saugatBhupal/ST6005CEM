import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApplicationFullCard from "../../components/widget/application/ApplicationFullCard";
import JobFullCard from "../../components/widget/job/JobFullCard";
import ProfileDetailsWidget from "../../components/widget/profile/ProfileDetailsWidget";
import NoResultsFound from "../../components/widget/search/NoResultsFound";
import { Colors } from "../../constants/Colors";
import { manageSearch } from "./manager/SearchManager";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  background-color: ${Colors.justWhite};
`;
const Container = styled.div`
  padding: 20px;
`;

function SearchResultsSection({ type, query, userId }) {
  const [results, setResults] = useState();
  useEffect(() => {
    async function search() {
      manageSearch(
        type,
        query,
        (results) => {
          setResults(results);
        },
        () => {
          setResults(null);
        }
      );
    }
    search();
  }, [type, query]);
  const renderResults = () => {
    if (results.length === 0) {
      return <NoResultsFound query={query} type={type} />;
    }
    console.log(type, results);
    switch (type) {
      case "user":
        return results.map((result, key) => (
          <ProfileDetailsWidget userId={userId} key={key} user={result} />
        ));
      case "project":
        return results.map(
          (result, key) =>
            result.projectName && (
              <ApplicationFullCard key={key} project={result} />
            )
        );
      default:
        return results.map(
          (result, key) =>
            result.jobName && <JobFullCard key={key} job={result} />
        );
    }
  };

  return (
    <Wrapper>
      <Container>{results && renderResults()}</Container>
    </Wrapper>
  );
}

export default SearchResultsSection;
