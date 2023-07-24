/* eslint-disable import/order */
import React from "react";

import { Breadcrumb, Button, Drawer, Spin } from "antd";

import TaskForm from "components/Kanban Board/TaskForm";
import { useFetchIssue, useDestroyIssue } from "hooks/useIssues";
import useIssueStore from "hooks/useIssueStore";
import { DeleteOutlined } from "@ant-design/icons";

const TaskDrawer = ({ onClose, issueId }) => {
  const { mutateAsync: destroyIssue } = useDestroyIssue();

  const { data, isLoading, isFetching } = useFetchIssue(issueId);
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

  return (
    <Drawer
      extra={<DeleteOutlined onClick={deleteIssue} />}
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
        <TaskForm issue={issue} onClose={onClose} />
      )}
    </Drawer>
  );
};

export default TaskDrawer;
