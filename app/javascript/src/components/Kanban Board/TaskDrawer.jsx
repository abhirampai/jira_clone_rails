import React from "react";

import { Drawer } from "antd";

import TaskForm from "components/Kanban Board/TaskForm";
import { useFetchIssue } from "hooks/useIssues";

const TaskDrawer = ({ open, onClose, issueId }) => {
  const { data, isLoading } = useFetchIssue(issueId);

  const issue = data?.data;

  return (
    <Drawer open={open} placement="right" title="Issue" onClose={onClose}>
      {isLoading ? <div>Loadding...</div> : <TaskForm issue={issue} />}
    </Drawer>
  );
};

export default TaskDrawer;
