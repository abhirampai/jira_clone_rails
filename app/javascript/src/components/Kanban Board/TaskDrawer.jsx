/* eslint-disable import/order */
import React, { useState } from "react";

import { Breadcrumb, Button, Drawer, Dropdown, Form, Spin } from "antd";

import TaskForm from "components/Kanban Board/TaskForm";
import {
  useFetchIssue,
  useDestroyIssue,
  useUpdateIssue,
} from "hooks/useIssues";
import useIssueStore from "hooks/useIssueStore";
import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import Footer from "../Common/Footer";
import CreateIssue from "../CreateIssue";

const TaskDrawer = ({ onClose, issueId }) => {
  const [form] = Form.useForm();

  const { mutateAsync: destroyIssue } = useDestroyIssue();
  const { data, isLoading, isFetching } = useFetchIssue(issueId);
  const { mutateAsync: updateIssue } = useUpdateIssue();

  const [createSubIssueModal, setCreateSubIssueModal] = useState(false);

  const setIssueId = useIssueStore(state => state.setIssueId);

  const issue = data?.data;

  const deleteIssue = () => {
    destroyIssue(issueId, { onSuccess: onClose() });
  };

  const extraItems = [
    {
      key: "1",
      label: "Create sub issue",
      onClick: () => {
        setCreateSubIssueModal(true);
      },
    },
  ];

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

  const extraButton = (
    <div className="flex items-center space-x-2">
      <DeleteOutlined className="text-lg" onClick={deleteIssue} />
      {!issue?.parent_id && (
        <Dropdown menu={{ items: extraItems }} trigger={["click"]}>
          <EllipsisOutlined rotate="90" />
        </Dropdown>
      )}
    </div>
  );

  return (
    <>
      <Drawer
        extra={extraButton}
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
      {createSubIssueModal && (
        <CreateIssue
          open={createSubIssueModal}
          parentId={issueId}
          onClose={() => setCreateSubIssueModal(false)}
        />
      )}
    </>
  );
};

export default TaskDrawer;
