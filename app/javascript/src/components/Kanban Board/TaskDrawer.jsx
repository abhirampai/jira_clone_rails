/* eslint-disable import/order */
import React from "react";

import { Drawer } from "antd";

import TaskForm from "components/Kanban Board/TaskForm";
import { useFetchIssue } from "hooks/useIssues";

const TaskDrawer = ({ onClose, issueId }) => {
  const { data, isLoading, isFetching } = useFetchIssue(issueId);

  const issue = data?.data;

  return (
    <Drawer open={issueId} placement="right" title="Issue" onClose={onClose}>
      {isLoading || isFetching ? (
        <div>Loadding...</div>
      ) : (
        <TaskForm issue={issue} onClose={onClose} />
      )}
    </Drawer>
  );
};

export default TaskDrawer;
