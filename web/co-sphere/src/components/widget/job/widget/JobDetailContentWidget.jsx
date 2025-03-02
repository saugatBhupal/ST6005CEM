import React from "react";
import styled from "styled-components";
import DescriptionWidget from "./DescriptionWidget";

const Wrapper = styled.div`
  margin-top: 40px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
function JobDetailContentWidget({ description }) {
  return (
    <Wrapper>
      <Container>
        <DescriptionWidget
          title={"About the project"}
          description={description}
        />
        {/* <ListWidget title={"Platform"} list={["IOS", "Android"]} />
        <ListWidget
          title={"Features"}
          list={[
            "Insect Identification: Upload or capture an image to identify pests (e.g., fruit flies) using image classification APIs.",
            "Detailed Pest Information: Provide causes, harmful effects, and recommended fertilizers in English and Nepali.",
            "Detailed Pest Information: Provide causes, harmful effects, and recommended fertilizers in English and Nepali.",
          ]}
        />
        <ListWidget
          title={"Deliverables"}
          list={[
            "Insect Identification: Upload or capture an image to identify pests (e.g., fruit flies) using image classification APIs.",
            "Detailed Pest Information: Provide causes, harmful effects, and recommended fertilizers in English and Nepali.",
            "Detailed Pest Information: Provide causes, harmful effects, and recommended fertilizers in English and Nepali.",
          ]}
        />
        <ListWidget
          title={"Required Skills"}
          list={[
            "Insect Identification: Upload or capture an image to identify pests (e.g., fruit flies) using image classification APIs.",
            "Detailed Pest Information: Provide causes, harmful effects, and recommended fertilizers in English and Nepali.",
            "Detailed Pest Information: Provide causes, harmful effects, and recommended fertilizers in English and Nepali.",
          ]}
        /> */}
      </Container>
    </Wrapper>
  );
}

export default JobDetailContentWidget;
