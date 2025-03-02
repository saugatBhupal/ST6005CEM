import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useToast } from "../../common/manager/contextManager/ToastContextManager";
import { manageCreateProject } from "../../common/manager/projectManager/ProjectManager";
import FilledButton from "../../components/buttons/FilledButton";
import SquareCustomDropDown from "../../components/input/dropdown/SquareCustomDropDown";
import SquareBorderInputBar from "../../components/input/SquareBorderInputBar";
import TextAreaWithWordCount from "../../components/input/textarea/TextAreaWithWordCount";
import SkillChip from "../../components/widget/chip/SkillChip";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import { getUserIdFromLocalStorage } from "../../service/LocalStorageService";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.backgroundWhite};
`;

const Container = styled.div`
  width: 90%;
  max-width: 800px;
  height: 90%;
  padding: 20px;
  border-radius: 12px;
  background-color: ${Colors.justWhite};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Title = styled.div`
  text-align: center;
  font-size: ${FontSize.large};
  font-weight: 600;
  color: ${Colors.justBlack};
  margin-bottom: 20px;
`;

const Form = styled.form`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Flex = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputGroup = styled.div`
  flex: 1;
`;

const Section = styled.div`
  background-color: ${Colors.justWhite};
  padding: 20px;
  border-radius: 8px;
  border: 0.5px solid ${Colors.greyOutlineShadow};
`;

const SectionTitle = styled.div`
  font-size: ${FontSize.small};
  font-weight: 500;
  color: ${Colors.justBlack};
  margin-bottom: 10px;
`;

const CompactInputGroup = styled(InputGroup)`
  max-width: 200px;
`;

const SkillSection = styled(Section)`
  margin-top: 20px;
`;
const DescriptionSection = styled(Section)`
  margin-top: 20px;
`;
const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const AddSkills = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  max-width: 500px;
`;

const ErrorMessage = styled.div`
  font-size: ${FontSize.small};
  color: ${Colors.errorRed};
  margin-top: 5px;
`;

const CreateSection = () => {
  const [projectName, setProjectName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [site, setSite] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [fromDays, setFromDays] = useState("");
  const [toDays, setToDays] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [userId, setUserId] = useState();
  const { showToast } = useToast();

  const [errors, setErrors] = useState({
    projectName: "",
    address: "",
    minSalary: "",
    maxSalary: "",
    fromDays: "",
    toDays: "",
    skills: "",
  });

  const validateForm = () => {
    const newErrors = {
      projectName: "",
      address: "",
      minSalary: "",
      maxSalary: "",
      fromDays: "",
      toDays: "",
      skills: "",
    };

    let isValid = true;

    if (!projectName.trim()) {
      newErrors.projectName = "Project name is required.";
      isValid = false;
    }

    if (!address.trim()) {
      newErrors.address = "Address is required.";
      isValid = false;
    }

    if (isNaN(minSalary) || minSalary < 0) {
      newErrors.minSalary = "Invalid minimum salary.";
      isValid = false;
    }

    if (isNaN(maxSalary) || maxSalary < 0) {
      newErrors.maxSalary = "Invalid maximum salary.";
      isValid = false;
    }

    if (isNaN(fromDays) || fromDays < 0) {
      newErrors.fromDays = "Invalid 'From' days.";
      isValid = false;
    }

    if (isNaN(toDays) || toDays < 0) {
      newErrors.toDays = "Invalid 'To' days.";
      isValid = false;
    }

    if (skills.length === 0) {
      newErrors.skills = "At least one skill is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addSkills = () => {
    if (skillInput.trim() && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
      setErrors({ ...errors, skills: "" });
    }
  };
  useEffect(() => {
    async function getuser() {
      const userId = await getUserIdFromLocalStorage();
      setUserId(userId);
    }
    getuser();
  }, []);
  async function handleCreateProject() {
    if (!validateForm()) {
      showToast("Fill the form properly.");
      return;
    }

    const details = {
      projectName,
      companyName,
      position,
      address,
      skills,
      description,
      postedBy: userId,
      site,
      salary: {
        min: parseInt(minSalary) || 0,
        max: parseInt(maxSalary) || 0,
      },
      from: parseInt(fromDays) || 0,
      to: parseInt(toDays) || 0,
    };
    await manageCreateProject(
      details,
      () => {
        showToast("Created Project");
      },
      (err) => {
        showToast(err);
      }
    );
  }
  return (
    userId && (
      <Wrapper>
        <Container>
          <Title>Create A New Project</Title>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateProject();
            }}
          >
            <InputGroup>
              <SquareBorderInputBar
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e)}
              />
              {errors.projectName && (
                <ErrorMessage>{errors.projectName}</ErrorMessage>
              )}
            </InputGroup>

            <Flex>
              <InputGroup>
                <SquareBorderInputBar
                  placeholder="Company Name (Optional)"
                  value={companyName}
                  onChange={(e) => setCompanyName(e)}
                />
              </InputGroup>
              <InputGroup>
                <SquareCustomDropDown
                  items={["Junior", "Mid", "Senior"]}
                  placeholder="Pick job level"
                  onChange={setPosition}
                />
              </InputGroup>
              <InputGroup>
                <SquareCustomDropDown
                  items={["On-Site", "Hybrid", "Remote"]}
                  placeholder="Pick job type"
                  onChange={setSite}
                />
              </InputGroup>
            </Flex>

            <InputGroup>
              <SquareBorderInputBar
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e)}
              />
              {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
            </InputGroup>

            <Section>
              <SectionTitle>Salary/Budget</SectionTitle>
              <Flex>
                <CompactInputGroup>
                  <SquareBorderInputBar
                    placeholder="Min"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e)}
                  />
                  {errors.minSalary && (
                    <ErrorMessage>{errors.minSalary}</ErrorMessage>
                  )}
                </CompactInputGroup>
                <CompactInputGroup>
                  <SquareBorderInputBar
                    placeholder="Max"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e)}
                  />
                  {errors.maxSalary && (
                    <ErrorMessage>{errors.maxSalary}</ErrorMessage>
                  )}
                </CompactInputGroup>
              </Flex>
            </Section>

            <Section>
              <SectionTitle>Duration</SectionTitle>
              <Flex>
                <CompactInputGroup>
                  <SquareBorderInputBar
                    placeholder="From (Days)"
                    value={fromDays}
                    onChange={(e) => setFromDays(e)}
                  />
                  {errors.fromDays && (
                    <ErrorMessage>{errors.fromDays}</ErrorMessage>
                  )}
                </CompactInputGroup>
                <CompactInputGroup>
                  <SquareBorderInputBar
                    placeholder="To (Days)"
                    value={toDays}
                    onChange={(e) => setToDays(e)}
                  />
                  {errors.toDays && (
                    <ErrorMessage>{errors.toDays}</ErrorMessage>
                  )}
                </CompactInputGroup>
              </Flex>
            </Section>

            <SkillSection>
              <SectionTitle>Skills</SectionTitle>
              <Skills>
                {skills.map((skill, index) => (
                  <SkillChip key={index} title={skill} />
                ))}
              </Skills>
              <AddSkills>
                <SquareBorderInputBar
                  placeholder="Add Skills"
                  value={skillInput}
                  onChange={(val) => setSkillInput(val)}
                />
                <FilledButton
                  onClick={addSkills}
                  placeholder="Add Skill"
                  type="button"
                />
              </AddSkills>
              {errors.skills && <ErrorMessage>{errors.skills}</ErrorMessage>}
            </SkillSection>
            <DescriptionSection>
              <SectionTitle>Project Description</SectionTitle>
              <TextAreaWithWordCount
                placeholder={"Enter Description"}
                onChange={(val) => {
                  setDescription(val);
                }}
              />
            </DescriptionSection>

            <FilledButton
              type="submit"
              placeholder="Create Project"
              style={{ marginTop: "20px", width: "100%" }}
              onClick={handleCreateProject}
            />
          </Form>
        </Container>
      </Wrapper>
    )
  );
};

export default CreateSection;
