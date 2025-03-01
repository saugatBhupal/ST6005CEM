import React from "react";
import LoggedInUserLayout from "../common/LoggedInUserLayout";
import CreateSection from "./CreateSection";

function CreateProjectPage() {
  return <LoggedInUserLayout body={<CreateSection />} page={"create"} />;
}

export default CreateProjectPage;
