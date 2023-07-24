/* eslint-disable import/order */
import React from "react";

import { Breadcrumb, Button, Drawer, Form, Spin } from "antd";

import TaskForm from "components/Kanban Board/TaskForm";
import {
  useFetchIssue,
  useDestroyIssue,
  useUpdateIssue,
} from "hooks/useIssues";
import useIssueStore from "hooks/useIssueStore";
import { DeleteOutlined } from "@ant-design/icons";
import Footer from "../Common/Footer";

const TaskDrawer = ({ onClose, issueId }) => {
  const [form] = Form.useForm();

  const { mutateAsync: destroyIssue } = useDestroyIssue();
  const { data, isLoading, isFetching } = useFetchIssue(issueId);
  const { mutateAsync: updateIssue } = useUpdateIssue();

  const setIssueId = useIssueStore(state => state.setIssueId);

  const issue = data?.data;

  const deleteIssue = () => {
    destroyIssue(issueId, { onSuccess: onClose() });
  };

  const breadcrumbItems = () => {
    const breadcrumb = [];

    if (issue?.parent_id) {
      breadcrumb.push({
        title: (
          <Button className="p-0 h-auto" type="link">
            {issue.parent_display_name}
          </Button>
        ),
        onClick: () => setIssueId(issue.parent_id),
      });
    }

    breadcrumb.push({
      title: issue.display_name,
    });

    return breadcrumb;
  };

  const renderHeader = () =>
    isLoading || isFetching ? (
      "Issue"
    ) : (
      <Breadcrumb items={breadcrumbItems()} />
    );

  const onSubmit = async form => {
    const values = await form.validateFields();
    updateIssue({ id: issue.id, payload: values }, { onSuccess: onClose() });
  };

  return (
    <Drawer
      extra={<DeleteOutlined onClick={deleteIssue} />}
      footer={<Footer form={form} onClose={onClose} onSubmit={onSubmit} />}
      open={issueId}
      placement="right"
      title={renderHeader()}
      onClose={onClose}
    >
      {isLoading || isFetching ? (
        <div className="modal-loader">
          <Spin tip="Loading">
            <div className="content" />
          </Spin>
        </div>
      ) : (
        <TaskForm form={form} issue={issue} />
      )}
    </Drawer>
  );
};

export default TaskDrawer;
