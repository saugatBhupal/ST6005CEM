import React, { useState } from "react";
import styled from "styled-components";
import { useToast } from "../../common/manager/contextManager/ToastContextManager";
import { manageAddTask } from "../../common/manager/projectManager/ProjectManager";
import FilledButton from "../../components/buttons/FilledButton";
import DateInput from "../../components/input/DateInput";
import CustomDropDown from "../../components/input/dropdown/CustomDropDown";
import TextAreaWithWordCount from "../../components/input/textarea/TextAreaWithWordCount";
import SelectedApplicantProfileWidget from "../../components/widget/profile/SelectedApplicantWidget";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  font-size: ${FontSize.medium};
  font-weight: 500;
  color: ${Colors.justBlack};
`;

const Box = styled.div`
  width: 160px;
  input {
    border: 0.5px solid ${Colors.greyOutlineShadow};
  }
`;

const AssignedMembers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Center = styled.div``;

function EditTaskDetails({ project_id, members, setReload }) {
  const memberNames = members.map((member) => member.fullname);

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [date, setDate] = useState("");
  const [isDateValid, setIsDateValid] = useState(false);

  const [assignedMembersState, setAssignedMembersState] = useState([]);
  const [memberIds, setMemberIds] = useState([]);

  const { showToast } = useToast();

  const handleAddMember = (selectedMemberName) => {
    const memberToAdd = members.find((m) => m.fullname === selectedMemberName);

    if (memberToAdd && !memberIds.includes(memberToAdd._id)) {
      setAssignedMembersState((prev) => [...prev, memberToAdd]);
      setMemberIds((prev) => [...prev, memberToAdd._id]);
    }
  };

  const handleRemoveMember = (memberId) => {
    setAssignedMembersState((prev) => prev.filter((m) => m._id !== memberId));
    setMemberIds((prev) => prev.filter((id) => id !== memberId));
  };

  const handleSubmit = async () => {
    const details = {
      projectId: project_id,
      taskName,
      taskDescription,
      deadline: date,
      members: memberIds,
    };

    if (!taskName || !taskDescription || !date || memberIds.length === 0) {
      showToast("Please fill all the details.");
      return;
    }

    await manageAddTask(
      details,
      () => {
        showToast("New task has been added");
        setReload(Math.random());
      },
      (err) => showToast(`${err}. Please try again.`)
    );
  };

  return (
    <Wrapper>
      <Container>
        <Title>Create a new task</Title>
        <div>
          <TextAreaWithWordCount
            placeholder="Please enter the task name"
            onChange={setTaskName}
          />
        </div>
        <div>
          <TextAreaWithWordCount
            placeholder="Provide a detailed task description"
            onChange={setTaskDescription}
          />
        </div>
        <Box>
          <DateInput
            placeholder="Task Deadline"
            validationType="taskDeadline"
            isValid={setIsDateValid}
            onChange={setDate}
          />
        </Box>
        <CustomDropDown
          label="Select members to assign the task"
          items={memberNames}
          onChange={handleAddMember}
        />
        <AssignedMembers>
          {assignedMembersState.map((member) => (
            <SelectedApplicantProfileWidget
              key={member._id}
              name={member.fullname}
              profileImage={member.profileImage}
              onReject={() => handleRemoveMember(member._id)}
            />
          ))}
        </AssignedMembers>
        <Center>
          <FilledButton placeholder="Create Task" onClick={handleSubmit} />
        </Center>
      </Container>
    </Wrapper>
  );
}

export default EditTaskDetails;
