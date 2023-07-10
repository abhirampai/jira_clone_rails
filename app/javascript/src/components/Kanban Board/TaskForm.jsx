import React from "react";

import {
  BookTwoTone,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LineOutlined,
  BugTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Input, Typography, Form } from "antd";

const priorityIcons = {
  high: ArrowUpOutlined,
  low: ArrowDownOutlined,
  medium: LineOutlined,
};

const issueTypeIcons = {
  story: BookTwoTone,
  bug: BugTwoTone,
  task: CheckCircleTwoTone,
};

const { Paragraph } = Typography;

const TaskForm = ({ issue }) => {
  const [form] = Form.useForm();
  const { summary, description, priority, issue_type } = issue;

  const PriorityIcon = priorityIcons[priority];
  const IssueTypeIcon = issueTypeIcons[issue_type];

  return (
    <Form
      className="flex flex-col space-y-4"
      form={form}
      initialValues={issue}
      layout="vertical"
    >
      <Form.Item label="Summary">
        <Input className="border hover:border-gray-500" value={summary} />
      </Form.Item>
      <Form.Item label="Description">
        <Input type="textarea" value={description} />
      </Form.Item>
      <div className="flex space-y-2 items-center">
        <PriorityIcon className="text-lg" />
        <Paragraph>{priority}</Paragraph>
      </div>
      <div className="flex space-y-2 items-center">
        <IssueTypeIcon className="text-lg" />
        <Paragraph>{issue_type}</Paragraph>
      </div>
    </Form>
  );
};

export default TaskForm;
