import React from "react";

import { Form, Modal } from "antd";

import { useCreateIssue } from "hooks/useIssues";

import Footer from "./Common/Footer";
import TaskForm from "./Kanban Board/TaskForm";

const CreateIssue = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const { mutateAsync: createIssue } = useCreateIssue();

  const issue = {
    summary: "",
    description: "",
    issue_type: "task",
    priority: "low",
  };

  const onSubmit = async form => {
    const values = await form.validateFields();
    createIssue(values, { onSuccess: onClose() });
  };

  return (
    <Modal
      closable
      footer={<Footer form={form} onClose={onClose} onSubmit={onSubmit} />}
      open={open}
      title="Create issue"
      bodyStyle={{
        height: "28rem",
      }}
      onCancel={onClose}
    >
      <TaskForm form={form} issue={issue} type="create" />
    </Modal>
  );
};

export default CreateIssue;
