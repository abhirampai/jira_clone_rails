import React, { useState } from "react";

import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Drawer,
  Dropdown,
  Form,
  Popconfirm,
  Spin,
  Table,
  Typography,
} from "antd";
import { ISSUE_TYPE_ICONS, PRIORITY_ICONS } from "common";
import { capitalize } from "utils";

import TaskForm from "components/Kanban Board/TaskForm";
import {
  useFetchIssue,
  useDestroyIssue,
  useUpdateIssue,
} from "hooks/useIssues";
import useIssueStore from "hooks/useIssueStore";

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
      <Popconfirm
        cancelText="No"
        description="Are you sure to delete this issue?"
        okText="Yes"
        title="Delete the issue"
        onConfirm={deleteIssue}
      >
        <DeleteOutlined className="text-lg" />
      </Popconfirm>
      {!issue?.parent_id && (
        <Dropdown menu={{ items: extraItems }} trigger={["click"]}>
          <EllipsisOutlined rotate="90" />
        </Dropdown>
      )}
    </div>
  );

  const TABLE_COLUMNS = [
    { title: "Issue", dataIndex: "display_name", key: "display_name" },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (_, { priority }) => {
        const PriorityIcon = PRIORITY_ICONS[priority];

        return (
          <div className="flex items-center space-x-2 pt-1">
            <PriorityIcon />
            <Typography.Text>{capitalize(priority)}</Typography.Text>
          </div>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "issue_type",
      key: "issue_type",
      render: (_, { issue_type }) => {
        const IssueTypeIcon = ISSUE_TYPE_ICONS[issue_type];

        return (
          <div className="flex items-center space-x-2 pt-1">
            <IssueTypeIcon />
            <Typography.Text>{capitalize(issue_type)}</Typography.Text>
          </div>
        );
      },
    },
  ];

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
          <>
            <TaskForm form={form} issue={issue} />
            {issue?.sub_issues && (
              <div className="flex flex-col space-y-5 mt-5 w-full">
                <label className="font-bold">Sub Issues:</label>
                <Table
                  columns={TABLE_COLUMNS}
                  dataSource={issue.sub_issues}
                  pagination={false}
                  size="small"
                  onRow={record => ({
                    onClick: () => setIssueId(record.id),
                  })}
                />
              </div>
            )}
          </>
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
