import React from "react";

import {
  BookTwoTone,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LineOutlined,
  BugTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Input, Typography, Form, Select, Avatar } from "antd";
import { createOptions } from "utils";

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

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const priorityOptions = createOptions(["medium", "low", "high"], priorityIcons);

const issueTypeOptions = createOptions(
  ["task", "bug", "story"],
  issueTypeIcons
);

const TaskForm = ({ issue, type = "edit", form }) => {
  const { summary, description, priority, issue_type } = issue;

  const findDefaultValue = (value, list) =>
    list.find(({ label }) => label.toLowerCase() === value)?.value;

  const intialValues = {
    summary,
    description,
    priority: findDefaultValue(priority, priorityOptions),
    issue_type: findDefaultValue(issue_type, issueTypeOptions),
  };

  return (
    <Form
      autoComplete="off"
      form={form}
      initialValues={intialValues}
      layout="vertical"
    >
      <Form.Item label="Summary" name="summary">
        <Input value={summary} />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea rows={3} value={description} />
      </Form.Item>
      <Form.Item label="Priority" name="priority">
        <Select placeholder="select priority" style={{ width: "100%" }}>
          {priorityOptions.map(({ value, label, icon: Icon }) => (
            <Option key={value} label={label} value={value}>
              <div className="flex items-center space-x-2 pt-1">
                <Icon />
                <Text>{label}</Text>
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Type" name="issue_type">
        <Select placeholder="select type" style={{ width: "100%" }}>
          {issueTypeOptions.map(({ value, label, icon: Icon }) => (
            <Option key={value} label={label} value={value}>
              <div className="flex items-center space-x-2 pt-1">
                <Icon />
                <Text>{label}</Text>
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>
      {type === "edit" && (
        <div className="flex space-x-2 items-center">
          <label>Created by:</label>
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
          <label>{issue.owner_name}</label>
        </div>
      )}
    </Form>
  );
};

export default TaskForm;
