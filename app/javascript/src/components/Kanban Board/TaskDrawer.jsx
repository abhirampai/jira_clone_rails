/* eslint-disable import/order */
import React from "react";

import { Drawer, Spin } from "antd";

import TaskForm from "components/Kanban Board/TaskForm";
import { useFetchIssue, useDestroyIssue } from "hooks/useIssues";
import { DeleteOutlined } from "@ant-design/icons";

const TaskDrawer = ({ onClose, issueId }) => {
  const { mutateAsync: destroyIssue } = useDestroyIssue();

  const { data, isLoading, isFetching } = useFetchIssue(issueId);

  const issue = data?.data;

  const deleteIssue = () => {
    destroyIssue(issueId, { onSuccess: onClose() });
  };

  return (
    <Drawer
      extra={<DeleteOutlined onClick={deleteIssue} />}
      open={issueId}
      placement="right"
      title={issue?.display_name || "Issue"}
      onClose={onClose}
    >
      {isLoading || isFetching ? (
        <div className="modal-loader">
          <Spin tip="Loading">
            <div className="content" />
          </Spin>
        </div>
      ) : (
        <TaskForm issue={issue} onClose={onClose} />
      )}
    </Drawer>
  );
};

export default TaskDrawer;
