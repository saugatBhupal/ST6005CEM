import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useToast } from "../../common/manager/contextManager/ToastContextManager";
import { manageGetHistoryByUserId } from "../../common/manager/userManager/UserManager";
import TaskCard from "../../components/widget/task/TaskCard";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

const Wrapper = styled.div``;
const Title = styled.div`
  font-size: ${FontSize.small};
  font-weight: 500;
  color: ${Colors.subtitleBlack};
  margin-bottom: 10px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
function HistorySection({ userId }) {
  const [history, setHistory] = useState();
  const { showToast } = useToast();

  useEffect(() => {
    async function getHistory() {
      await manageGetHistoryByUserId(
        userId,
        (history) => {
          setHistory(history);
        },
        (err) => {
          showToast(err);
          setHistory(null);
        }
      );
    }
    getHistory();
  }, []);
  return (
    <Wrapper>
      <Title>Co-Sphere History</Title>
      <Column>
        {history &&
          history.map((history, key) => (
            <TaskCard project={history} key={key} />
          ))}
      </Column>
    </Wrapper>
  );
}

export default HistorySection;
