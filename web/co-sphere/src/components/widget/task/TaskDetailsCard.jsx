import React from "react";
import styled from "styled-components";
import ProfileImage from "../../../assets/images/icon/profile_icon/profile_icon.png";
import { useToast } from "../../../common/manager/contextManager/ToastContextManager";
import { manageCompleteTask } from "../../../common/manager/projectManager/ProjectManager";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import { convertToTime } from "../../../utils/date/ConvertToTime";
import DeleteButton from "../../buttons/DeleteButton";
import TickButtonRound from "../../buttons/TickButtonRound";
import TypeChip from "../chip/TypeChip";
import DeadlineWidget from "../duration/DeadlineWidget";

const Wrapper = styled.div`
  width: 100%;
`;
const Container = styled.div`
  padding: 20px;
  border: 1px solid ${Colors.greyOutlineShadow};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div``;
const Description = styled.div`
  color: ${Colors.subtitleBlack};
  font-size: ${FontSize.small};
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  span {
    display: flex;
    gap: 2px;
    align-items: center;
    font-size: ${FontSize.small};
    color: ${Colors.subtitleBlack};
    div {
      margin: auto 2px;
    }
  }
`;
const Icon = styled.div`
  img {
    height: 30px;
    border-radius: 50%;
  }
`;
function TaskDetailsCard({ projectId, task, completed, reload }) {
  const { showToast } = useToast();
  async function handleCompleteTask() {
    await manageCompleteTask(
      { projectId: projectId, taskId: task._id },
      (data) => {
        showToast("Task moved to completed section.");
        reload(Math.random());
      },
      (err) => {
        console.log(err);
        showToast(err);
      }
    );
  }
  return (
    <Wrapper>
      <Container>
        <Flex>
          <Title>{task.taskName}</Title>
          <DeadlineWidget date={convertToTime(task.deadline)} />
        </Flex>
        <Description>{task.taskDescription}</Description>
        <Flex>
          <Row>
            <span>
              {task.members.map((member) => (
                <Icon>
                  <img src={member.profileImage || ProfileImage} alt="" />
                </Icon>
              ))}
              {task.members.length} members
            </span>
            {completed ? (
              <>
                <TypeChip type={completed} />
              </>
            ) : (
              <span>
                <DeleteButton />
                <TickButtonRound
                  onClick={() => {
                    handleCompleteTask();
                  }}
                />
              </span>
            )}
          </Row>
        </Flex>
      </Container>
    </Wrapper>
  );
}

export default TaskDetailsCard;
