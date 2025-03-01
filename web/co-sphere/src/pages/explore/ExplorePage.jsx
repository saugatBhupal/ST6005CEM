import React from "react";
import LoggedInUserLayout from "../common/LoggedInUserLayout";
import ExploreSection from "./ExploreSection";

function ExplorePage() {
  return <LoggedInUserLayout body={<ExploreSection />} page={"explore"} />;
}

export default ExplorePage;
