import React from "react";

import { Modal } from "antd";

import TaskForm from "./Kanban Board/TaskForm";

const CreateIssue = ({ open, onClose }) => {
  const issue = {
    summary: "",
    description: "",
    issue_type: "task",
    priority: "low",
  };

  return (
    <Modal
      closable
      footer={null}
      open={open}
      title="Create issue"
      bodyStyle={{
        height: "28rem",
      }}
      onCancel={onClose}
    >
      <TaskForm issue={issue} type="create" onClose={onClose} />
    </Modal>
  );
};

export default CreateIssue;
